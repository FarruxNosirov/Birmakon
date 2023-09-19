import requests from "@novomarkt/api/requests";
import React, { useCallback, useEffect, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { COLORS } from "../../constants/colors";
import AllProductTitle from "../AllProductTitle";
import DefaultButton from "../general/DefaultButton";
import DefaultInput from "../general/DefaultInput";
import FilterModal from "./FilterModal";
import FilterSwitch from "./FilterSwitch";

type PropsSort = {
	setModalVisible?: any;
	filter?: any;
	setNewQueryProps?: any;
	category_id?: number;
	subMendHandler?: any;
	subCateName?: string;
	setSubCategoriyaId?: any;
};

const FilterScren = (props: PropsSort) => {
	const [loading, setLoading] = useState(false);
	const [filter, setFilter] = useState<any>({});
	const [priceMin, setPriceMin] = useState(0);
	const [priceMax, setPriceMax] = useState(priceMin);
	const [newQuery, setNewQuery] = useState("");
	let query: any = "";
	const [catalogType, setCatalogType] = useState<any>([]);
	const [subCateData, setSubCateCata] = useState<any[]>([]);
	const [active, setActive] = useState(true);
	const [subCateActive, setSubCateActive] = useState<Number>(0);

	const subCategoriya = useCallback(async () => {
		try {
			const res = await requests.filter.padCategory(props.filter);
			setSubCateCata(res.data.data);
		} catch (error) {}
	}, [props.filter]);
	useEffect(() => {
		subCategoriya();
	}, [subCategoriya]);

	const getFilterId = useCallback(async () => {
		setLoading(true);
		try {
			let res = await requests.filter.catalogFilter(subCateActive);
			setCatalogType(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [subCateActive]);

	useEffect(() => {
		getFilterId();
	}, [getFilterId]);

	const handleFilter = (id?: any) => {
		if (filter === undefined) {
			setFilter({
				[`filter[${id}]`]: id,
			});
		} else if (!filter[`filter[${id}]`]) {
			setFilter({
				...filter,
				[`filter[${id}]`]: id,
			});
		} else if (filter[`filter[${id}]`]) {
			const data = { ...filter };
			delete data[`filter[${id}]`];
			setFilter({ ...data });
		}
	};
	useEffect(() => {
		for (const key in filter) {
			query = query + "&" + key + "=" + filter[key];
		}
		setNewQuery(query);
	}, [handleFilter]);

	const OnChangeHandlerMine = (e: any) => {
		let newFilter = {
			...filter,
			price_min: e,
		};
		setPriceMin(e);
		setFilter(newFilter);
	};
	const OnChangeHandlerMax = (e: any) => {
		let newFilter = {
			...filter,
			price_max: e,
		};
		setPriceMax(e);
		setFilter(newFilter);
	};

	const submetAndClosed = async () => {
		setLoading(true);
		try {
			props.setNewQueryProps(newQuery);
			props.setSubCategoriyaId(subCateActive);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
			closeHandler();
		}
	};
	const closeHandler = () => {
		props.setModalVisible((a: any) => {
			return !a;
		});

		setNewQuery("");
	};

	let btnDisebled = true;
	if (subCateActive !== 0) {
		btnDisebled = false;
	}
	const onPress = () => {
		setActive((a) => !a);
	};

	return (
		<SafeAreaView style={styles.containerSafe}>
			<AllProductTitle
				title="Фильтры"
				color={true}
				onPress={() => closeHandler()}
			/>

			<ScrollView style={styles.container}>
				<FilterModal
					onPress={onPress}
					active={active}
					title={props?.subCateName}
				>
					{active && (
						<>
							{subCateData.map((item, index) => (
								<TouchableOpacity
									onPress={() => setSubCateActive(item.id)}
									key={index.toString()}
								>
									<Text
										style={[
											styles.subCateTitle,
											{
												color:
													subCateActive === item.id
														? COLORS.blue
														: COLORS.textColor,
											},
										]}
									>
										{item.name}
									</Text>
								</TouchableOpacity>
							))}
						</>
					)}
				</FilterModal>
				{subCateActive !== 0 && (
					<>
						<View style={styles.inputBox}>
							<View style={styles.inputView}>
								<DefaultInput
									containerStyle={styles.input}
									title={"От"}
									onChange={OnChangeHandlerMine}
									keyboardType="number-pad"
								/>
							</View>
							<View style={styles.inputView}>
								<DefaultInput
									containerStyle={styles.input}
									title={"До"}
									onChange={OnChangeHandlerMax}
									keyboardType="number-pad"
								/>
							</View>
						</View>
						{catalogType.map((item: any, index: any) => (
							<FilterSwitch
								key={index.toString()}
								input={item}
								priceMin={priceMin}
								priceMax={priceMax}
								handleFilter={handleFilter}
								filter={filter}
							/>
						))}
					</>
				)}
				<View style={{ width: "100%", height: 50 }}></View>
			</ScrollView>
			{subCateActive !== 0 && (
				<View style={styles.btnView}>
					<View style={{ width: "100%" }}>
						<DefaultButton
							text="Фильтр"
							onPress={submetAndClosed}
							disabled={btnDisebled}
						/>
					</View>
				</View>
			)}

			{/* <Spinner visible={loading} /> */}
		</SafeAreaView>
	);
};

export default FilterScren;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flex: 1,
	},
	input_box: {},
	input: {
		width: "100%",
		height: 55,
		backgroundColor: "#fff",
		borderRadius: 45,
		paddingHorizontal: 24,
		fontSize: 16,
		marginBottom: 15,
	},
	inputBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
		paddingHorizontal: 15,
	},
	inputView: { width: "48%" },
	containerSafe: { flex: 1, backgroundColor: COLORS.white },
	btnView: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		marginBottom: 20,
	},
	subCateTitle: {
		fontSize: 13,
		marginTop: 10,
		fontWeight: "700",
	},
});
