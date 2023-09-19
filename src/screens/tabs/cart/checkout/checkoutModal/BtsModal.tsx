import { formData } from "@novomarkt/api/requests";
import { BottomArrow } from "@novomarkt/assets/icons/icons";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import { COLORS } from "@novomarkt/constants/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const dataOrderType = [
	{
		id: 1,
		name: "Самовывоз",
		value: "pickup",
	},
	{
		id: 2,
		name: "Доставка курьером",
		value: "delivery",
	},
];
const data = [
	{
		id: 1,
		name: "Узбекистан",
		value: "pickup",
	},
];
const data2 = [{ id: 1, name: "Выберите", value: "" }];

const BtsModal = (props: any) => {
	const [subRegions, setSubRegions] = useState<any>();
	const [subCategories, setSubCategories] = useState<any>();
	const [btcPrice, setBtcPrice] = useState<number>(0);

	const tokenBTC = "8b9841c071a863dc468fadd9d511c4e8f214fb7f";
	const instance1 = axios.create({
		baseURL: "https://api.bts.uz/index.php",
		headers: {
			Authorization: `Bearer ${tokenBTC}`,
			Accept: "application/json",
		},
	});

	const getBTCRegions = async () => {
		try {
			await instance1.get("?r=directory/regions").then((response) => {
				setSubRegions(response.data.data);
			});
		} catch (error) {
			console.log("storeAddresses==== error", error);
		}
	};
	useEffect(() => {
		getBTCRegions();
	}, []);

	const getBTCCities = async (id: number) => {
		console.log({ id });

		try {
			await instance1
				.get(`?r=directory/cities&regionId=${id}`)
				.then((response) => {
					// console.log("sasa", response);

					setSubCategories(response.data.data);
				});
		} catch (error) {
			console.log("storeAddresses==== error33", error);
		}
	};
	const date = new Date();
	const today =
		date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	const [styleBts, setStyleBts] = useState<number>();

	let btcVolume = 0;
	// let btcVolume: number;
	props?.orderData?.cart.forEach((item: any) => {
		let length = item?.amount * item?.product?.length;
		let height = item?.amount * item?.product?.height;
		let width = item?.amount * item?.product?.width;
		let S = length * height * width;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		btcVolume += S;
	});
	let btcWeight = 0;
	props.orderData?.cart.forEach((item: any) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		btcWeight += item?.amount * item?.product?.weight;
	});
	const [filter, setFilter] = useState({
		senderDate: today,
		senderCityId: props?.orderData?.region?.bts_city_id,
		receiverCityId: 0,
		senderDelivery: 2,
		receiverDelivery: 0,
		volume: btcVolume,
		weight: btcWeight,
	});
	const packageData = (data: any) => {
		const form = new FormData();
		for (const key in data) {
			if (Array.isArray(data[key])) {
				for (const childKey in data[key]) {
					form.append(`${key}[${childKey}]`, data[key][childKey]);
				}
			} else {
				form.append(key, data[key]);
			}
		}
		return form;
	};

	const colculateCost = async () => {
		try {
			await instance1
				.post(`?r=v1/order/calculate`, packageData(filter))
				.then((response) => {
					setBtcPrice(response?.data?.summaryPrice);
					// console.log(JSON.stringify(response.data, null, 2));
				});
		} catch (error) {
			console.log("????????");
			console.log("error", error);
			console.log("????????");
		}
	};

	const SubmetHandler = () => {
		props.setModalShow(false);
	};

	const closedHandler = () => {
		props?.setModalShow(false);
	};

	const receiverDeliveryList = [
		{
			id: 0,
			name: "Забрать с офиса БТС",
		},
		{
			id: 1,
			name: "Доставить курьером(город)",
		},
		{
			id: 2,
			name: "Доставить курьером(с дальнего посёлка)",
		},
	];

	return (
		<View style={styles.checkoutBox}>
			<View style={styles.box_item}>
				<SelectDropdown
					data={data as any}
					onSelect={() => {}}
					buttonTextAfterSelection={(selectedItem: any) => {
						return selectedItem.name;
					}}
					rowTextForSelection={(item: any) => {
						return item.name;
					}}
					buttonStyle={styles.dropdown2BtnStyle}
					buttonTextStyle={{
						color: "#3F3535",
						fontSize: 16,
						textAlign: "left",
					}}
					renderDropdownIcon={() => {
						return <BottomArrow fill={"#000000"} />;
					}}
					dropdownIconPosition="right"
					rowTextStyle={{
						color: "#3F3535",
						fontSize: 16,
					}}
					defaultButtonText="Узбекистан"
				/>
			</View>
			<View style={styles.box_item}>
				<Text style={{ padding: 0, margin: 0 }}>Выберите город</Text>
				<SelectDropdown
					data={subRegions ? subRegions : (dataOrderType as any)}
					onSelect={(selectedItem: any) => {
						getBTCCities(selectedItem.id);
					}}
					buttonTextAfterSelection={(selectedItem: any) => {
						return selectedItem.name;
					}}
					rowTextForSelection={(item: any) => {
						return item.name;
					}}
					buttonStyle={styles.dropdown2BtnStyle}
					buttonTextStyle={{
						color: "#3F3535",
						fontSize: 16,
						textAlign: "left",
					}}
					renderDropdownIcon={() => {
						return <BottomArrow fill={"#000000"} />;
					}}
					dropdownIconPosition="right"
					rowTextStyle={{
						color: "#3F3535",
						fontSize: 16,
					}}
					defaultButtonText="Выберите"
				/>
			</View>
			<View style={styles.box_item}>
				<Text style={{ padding: 0, margin: 0 }}>Выберите район</Text>
				<SelectDropdown
					data={subCategories?.length > 0 ? subCategories : (data2 as any)}
					onSelect={(category_id: any) => {
						setFilter({ ...filter, receiverCityId: category_id?.id });
					}}
					buttonTextAfterSelection={(category_id: any) => {
						return category_id.name;
					}}
					rowTextForSelection={(item: any) => {
						return item.name;
					}}
					buttonStyle={styles.dropdown2BtnStyle}
					buttonTextStyle={{
						color: "#3F3535",
						fontSize: 16,
						textAlign: "left",
					}}
					renderDropdownIcon={() => {
						return <BottomArrow fill={"#000000"} />;
					}}
					dropdownIconPosition="right"
					rowTextStyle={{
						color: "#3F3535",
						fontSize: 16,
					}}
					defaultButtonText="Выберите"
				/>
			</View>

			<View style={styles.box_item}>
				<Text style={{ padding: 0, margin: 0 }}>Выберите способ доставки</Text>
				<SelectDropdown
					data={receiverDeliveryList}
					onSelect={(category_id: any) => {
						setStyleBts(category_id.id),
							setFilter({ ...filter, receiverDelivery: category_id?.id });
					}}
					buttonTextAfterSelection={(category_id: any) => {
						return category_id.name;
					}}
					rowTextForSelection={(item: any) => {
						return item.name;
					}}
					buttonStyle={styles.dropdown2BtnStyle}
					buttonTextStyle={{
						color: "#3F3535",
						fontSize: 16,
						textAlign: "left",
					}}
					renderDropdownIcon={() => {
						return <BottomArrow fill={"#000000"} />;
					}}
					dropdownIconPosition="right"
					rowTextStyle={{
						color: "#3F3535",
						fontSize: 16,
					}}
					defaultButtonText="Выберите"
				/>
			</View>
			{btcPrice > 0 ? (
				<View style={styles.box_item}>
					<Text style={styles.text}>Доставка: {btcPrice} сум</Text>
				</View>
			) : null}

			{styleBts !== undefined ? (
				<View style={styles.box_item}>
					<DefaultButton text="Рассчитать стоимость" onPress={colculateCost} />
				</View>
			) : null}

			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<View style={styles.btn_item}>
					<DefaultButton text="Сохранить" onPress={SubmetHandler} />
				</View>
				<View style={styles.btn_item}>
					<DefaultButton text="Отменить" onPress={closedHandler} />
				</View>
			</View>
		</View>
	);
};

export default BtsModal;

export const styles = StyleSheet.create({
	modal_container: {
		position: "relative",
		width: "100%",
		backgroundColor: COLORS.white,
		borderRadius: 10,
	},
	checkoutBox: {
		paddingHorizontal: 15,
		backgroundColor: COLORS.white,
		flex: 1,
	},

	dropdown2BtnStyle: {
		width: "100%",
		height: 50,
		borderRadius: 45,
		paddingHorizontal: 20,
		backgroundColor: "#f4f4f4",
		marginTop: 15,
		marginBottom: 15,
	},
	dropdown2BtnStyleInput: {
		width: "100%",
		height: 50,
		borderRadius: 45,
		paddingHorizontal: 20,
		backgroundColor: "#f4f4f4",
		marginTop: 15,
		marginBottom: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	btn_item: {
		width: "48%",
	},
	box_item: {
		width: "100%",
	},
	input: {
		width: "90%",
		color: COLORS.black,
	},
	text: {
		color: COLORS.black,
	},
});
