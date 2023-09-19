/* eslint-disable no-shadow */
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import Text from "@novomarkt/components/general/Text";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { ROUTES } from "@novomarkt/constants/routes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import ChooseItemNum from "./components/ChooseItemNum";
import OrderDetails from "./components/OrderDetails";
import { styles } from "./style";
import { useCartScreenHooks } from "./useCartScreenHooks";

const CartView = () => {
	let navigation = useNavigation();

	let { onClearCart, cart, totalPrices, activeShop, setActiveShop, isEmpty } =
		useCartScreenHooks();

	if (cart?.length <= 0) {
		return (
			<View style={styles.empty}>
				<BackHeader name={STRINGS.cart} />
				<View style={styles.emptyBox}>
					<Text style={styles.emptyText}>{STRINGS.cartIsEmpty}</Text>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.oldContainer}>
			<View style={styles.topBox}>
				<View style={styles.goBack}>
					<BackHeader name={STRINGS.cart} />
				</View>
				<View style={styles.cleanTavar}>
					<TouchableOpacity onPress={onClearCart}>
						<Text style={styles.text}>{STRINGS.emptyCart}</Text>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView style={styles.container}>
				{cart?.map((item: any, index: any) => {
					return (
						<View key={index} style={styles.shop}>
							<View style={styles.topbar}>
								<View style={styles.shopName}>
									<Text style={styles.text}>Продавец: </Text>
									<Text style={styles.text}>{item?.name}</Text>
								</View>
								<View style={styles.shopName}>
									<TouchableOpacity
										style={[
											item.id === activeShop.id
												? styles.btnstyleActive
												: styles.btnstyleNoActive,
										]}
										onPress={() => setActiveShop(item)}
									>
										<Text
											style={[
												item.id === activeShop?.id
													? styles.buttonTxtActive
													: styles.buttonTxtNoActive,
											]}
										>
											Выбрать
										</Text>
									</TouchableOpacity>
								</View>
							</View>
							{item?.cart?.map((item2: any, index: any) => {
								return <ChooseItemNum data={item2} key={index} />;
							})}
						</View>
					);
				})}
			</ScrollView>
			<OrderDetails total={totalPrices} />
			<DefaultButton
				onPress={() =>
					//@ts-ignore
					navigation.navigate(ROUTES.CHECKOUT, { item: activeShop })
				}
				text={STRINGS.continueOrdering}
				containerStyle={[styles.button, styles.bottom]}
				textStyle={styles.buttonTxt}
				disabled={isEmpty}
			/>
			{/* <Spinner visible={loading} /> */}
		</View>
	);
};

export default CartView;
