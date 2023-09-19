import requests from "@novomarkt/api/requests";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import OrderItem from "./OrderItem";
import { ROUTES } from "@novomarkt/constants/routes";
import { COLORS } from "@novomarkt/constants/colors";
import { STRINGS } from "@novomarkt/locales/strings";

type propsType = {
	item?: any;
};
const OrderLest = (props: propsType) => {
	let { item } = props;
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();
	const resetOplatelink = useCallback(async () => {
		setLoading(true);
		try {
			let paymentRes = await requests.order.paymendId(item.id);
			const payLink = paymentRes?.data?.data?.pay_url;
			//@ts-ignore
			navigation.navigate(ROUTES.WebView, { link: payLink });
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [item.id, navigation]);

	const cartTotalSelector = () => {
		let keys = Object.keys(item.orderProducts);
		let count = keys.length;
		let total = keys.reduce((prev, current) => {
			return prev + item.orderProducts[current].price;
		}, 0);
		return { count, total };
	};
	const cartTotal = cartTotalSelector();

	return (
		<>
			<FlatList
				data={item.orderProducts}
				ListHeaderComponent={() => {
					return (
						<View style={styles.row}>
							{item.orderProducts.length > 0 ? (
								<View>
									<Text style={styles.headerText}>Заказ №{item?.id}</Text>
								</View>
							) : null}
							<View>
								<Text style={styles.headerText}>Адрес: {item?.address} </Text>
							</View>
						</View>
					);
				}}
				renderItem={(props) => (
					<OrderItem
						{...props}
						payment={item.payment}
						delivery={item.delivery}
						user={item.user}
					/>
				)}
				ListFooterComponent={() => {
					return (
						<View style={styles.footer}>
							{item.orderProducts.length > 0 ? (
								<>
									<View style={{ flexDirection: "row", alignItems: "center" }}>
										<Text style={styles.headerText}>Общая сумма:</Text>
										<Text style={styles.price}>
											{cartTotal.total
												.toLocaleString(undefined, {
													minimumFractionDigits: 0,
													maximumFractionDigits: 0,
												})
												.replace(/,/gi, " ")}{" "}
											{STRINGS.money}
										</Text>
									</View>
									{/* <DefaultButton
										onPress={() => resetOplatelink()}
										text="Оплатить"
									/> */}
								</>
							) : null}
						</View>
					);
				}}
				keyExtractor={(_item, index) => index.toString()}
			/>
			<Spinner visible={loading} />
		</>
	);
};

export default OrderLest;

const styles = StyleSheet.create({
	row: {
		flexDirection: "column",
		alignItems: "flex-start",

		paddingHorizontal: 20,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		marginTop: 0,
		marginBottom: 20,
	},
	headerText: {
		fontSize: 16,
		color: COLORS.defaultBlack,
	},

	header: {
		marginHorizontal: 20,
	},
	salesman: {
		flexDirection: "row",
		marginHorizontal: 20,
		marginVertical: 5,
	},
	price: {
		fontSize: 20,
		color: COLORS.defaultBlack,
		alignSelf: "center",
		padding: 10,
		marginBottom: 5,
		fontWeight: "700",
	},
});
