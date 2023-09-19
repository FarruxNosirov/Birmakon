import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import requests from "@novomarkt/api/requests";
import { BottomArrow } from "@novomarkt/assets/icons/icons";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import { COLORS } from "@novomarkt/constants/colors";

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

const CheckoutModal = (props: any) => {
	const [subRegions, setSubRegions] = useState<any>();
	const [subCategories, setSubCategories] = useState<any>();
	const [sortLists, setSortLists] = useState<any>();
	const [cartList, setCartList] = useState<any>();
	const [chackBox, setChackBox] = useState<any>();

	const [filter, setFilter] = useState({
		region_id: 0,
		unit_id: 38,
		amount: cartList?.length,
	});
	const [filterName, setFilterName] = useState({
		city_name: "Узбекистан",
		region_name: "",
		unit_name: "",
		adress: "",
	});

	const onRegionsHandler = async (e: any) => {
		getSubCategories(e);
		let newFilter = {
			unit_id: 38,
			amount: cartList?.length,
			region_id: e,
		};
		setFilter(newFilter);
	};
	const onCategoryHandler = (e: any) => {
		let newFilter = {
			amount: cartList?.length,
			unit_id: 38,
			region_id: e,
		};
		setFilter(newFilter);
		getLogistSort(newFilter);
	};

	const getRegions = async () => {
		try {
			let res = await requests.categories.getRegions();
			setSubRegions(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getSubCategories = async (e: number) => {
		try {
			let res = await requests.categories.getSubCategories(e);
			setSubCategories(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getLogistSort = async (e: any) => {
		try {
			let res = await requests.categories.getLogistSort(e);
			setSortLists(res.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const SubmetHandler = () => {
		props.setModalShow(false);
		props.setNewAdress(filterName);
	};

	const cartListHandler = async () => {
		try {
			let res = await requests.products.getCarts();
			setCartList(res.data.data);
		} catch (error) {}
	};

	const closedHandler = () => {
		props?.setModalShow(false);
		setFilter({
			...filter,
			amount: cartList?.length,
			region_id: 0,
			unit_id: 38,
		});
		getLogistSort("");
	};
	useEffect(() => {
		getRegions();
		cartListHandler();
	}, []);

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
						onRegionsHandler(selectedItem.id);
						setFilterName({ ...filterName, region_name: selectedItem.name });
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
						onCategoryHandler(category_id.id);
						setFilterName({ ...filterName, unit_name: category_id.name });
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
				<Text style={{ padding: 0, margin: 0 }}>Напишите адрес</Text>
				<View style={styles.dropdown2BtnStyleInput}>
					<TextInput
						placeholder="Напишите адрес"
						style={styles.input}
						onChangeText={(text) =>
							setFilterName({ ...filterName, adress: text })
						}
					/>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					width: "100%",
					paddingHorizontal: 10,
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

export default CheckoutModal;

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
});
