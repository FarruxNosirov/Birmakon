import requests from "@novomarkt/api/requests";
import React from "react";
import { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import StatusBar from "./components/StatusBar";
import OrderLest from "./components/OrderLest";
import Spinner from "react-native-loading-spinner-overlay";
import { COLORS } from "@novomarkt/constants/colors";
import { styles } from "./style";
import { STRINGS } from "@novomarkt/locales/strings";
import BackHeader from "@novomarkt/components/navigation/BackHeader";

const OrderScren = () => {
	const [orders, setOrders] = useState<any>([]);
	const [filter, setFilter] = useState({ status: 6 });
	const [loading, setLoading] = useState(false);

	const getOrders = useCallback(async () => {
		setLoading(true);
		try {
			let res = await requests.order.getOrders(filter);
			setOrders(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [filter]);

	useEffect(() => {
		getOrders();
	}, [getOrders]);

	return (
		<View style={styles.container}>
			<BackHeader name={STRINGS.myOrders} />
			<StatusBar orders={orders} filter={filter} setFilter={setFilter} />
			<FlatList
				data={orders}
				renderItem={(item) => <OrderLest {...item} />}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item: any) => item.id}
				ListEmptyComponent={
					<Text
						// eslint-disable-next-line react-native/no-inline-styles
						style={{
							textAlign: "center",
							color: COLORS.red,
							marginTop: 100,
						}}
					>
						Нет результатов
					</Text>
				}
			/>
			<Spinner visible={loading} />
		</View>
	);
};
export default OrderScren;
