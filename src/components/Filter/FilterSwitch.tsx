import { NewTopArrowIcon2 } from "@novomarkt/assets/icons/icons";
import CheckBox from "@novomarkt/screens/tabs/home/components/shops/shopProducts/components/CheckBox";
import React, { useEffect, useState } from "react";
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import FilterModal from "./FilterModal";
import { COLORS } from "@novomarkt/constants/colors";
type PropsType = {
	input?: any;
	handleFilter?: any;
	priceMax?: any;
	priceMin?: any;
	filter?: any;
};
const FilterSwitch: any = (props: PropsType) => {
	const [active, setActive] = useState({
		value1: false,
		value2: false,
	});

	const [checkout, setCheckout] = useState<any>(false);

	const onPress = () => {
		setActive({ ...active, value1: !active.value1 });
	};
	const onPress2 = () => {
		setActive({ ...active, value2: !active.value2 });
	};
	const checkBoxHandler = (id: any) => {
		props.handleFilter(id);
		setCheckout((a: any) => !a);
	};

	useEffect(() => {
		const isDone = !(props.priceMax && props.priceMin);
		if (isDone) {
			setCheckout(false);
		}
	}, [props.priceMax, props.priceMin]);
	const activeSizeHandler = (item: {
		id: React.SetStateAction<number>;
		valyu: any;
	}) => {
		props.handleFilter(item.id, item.valyu);
	};

	switch (props.input?.type) {
		case "checkbox":
			return (
				<>
					{props.input.is_filter === true && (
						<FilterModal
							title={props.input.name}
							active={active.value1}
							onPress={onPress}
						>
							{active.value1 && (
								<>
									<View
										style={{
											flexDirection: "row",
											flexWrap: "wrap",
										}}
									>
										{props.input?.childs?.map((item?: any, index: any) => {
											const isHas = `filter[${item?.id}]` in props.filter;
											return (
												<TouchableOpacity
													key={index}
													style={[
														styles.chiled_box,
														{
															backgroundColor: isHas ? "#ff9500" : "white",
															borderColor: isHas ? "#ff9500" : "black",
															borderWidth: 1,
														},
													]}
													onPress={() => activeSizeHandler(item)}
												>
													<Text
														style={{
															fontSize: 13,
															color: isHas ? COLORS.white : COLORS.black,
														}}
													>
														{item.value}
													</Text>
												</TouchableOpacity>
											);
										})}
									</View>
								</>
							)}
						</FilterModal>
					)}
				</>
			);
		case "select":
			return (
				<>
					{props.input.is_filter === true && (
						<View style={styles.container}>
							<View style={styles.top_box}>
								<Text style={{ fontSize: 18 }}>{props.input.name}</Text>
								<NewTopArrowIcon2 />
							</View>
							<View
								style={{
									backgroundColor: "#f1f1f1",
									width: "80%",
									flexDirection: "row",
									justifyContent: "center",
									paddingVertical: 10,
								}}
							>
								<Text>Выбрать подкатегорию</Text>
							</View>
							<FlatList
								data={props.input?.childs}
								renderItem={({ item }) => (
									<>
										{item.value && (
											<TouchableOpacity
												onPress={(e) =>
													props.handleFilter(props.input.id, e, "select")
												}
												style={styles.chiled_box}
											>
												<Text>{item.value}</Text>
											</TouchableOpacity>
										)}
									</>
								)}
								showsVerticalScrollIndicator={false}
								style={{ flexDirection: "column", flexWrap: "wrap" }}
								numColumns={2}
								keyExtractor={(item, index) => index.toLocaleString()}
							/>
						</View>
					)}
				</>
			);
		case "input":
			return (
				<>
					{props.input.is_filter === true && (
						<FilterModal
							title={props.input.name}
							active={active.value2}
							onPress={onPress2}
						>
							{active.value2 && (
								<TouchableOpacity
									disabled={checkout}
									onPress={() => {
										if (props.priceMax && props.priceMin) {
											checkBoxHandler(props.input.id);
										}
									}}
									style={{ flexDirection: "row", alignItems: "center" }}
								>
									<CheckBox label={props.input.name} checkout={checkout} />
								</TouchableOpacity>
							)}
						</FilterModal>
					)}
				</>
			);
	}
};

export default FilterSwitch;

const styles = StyleSheet.create({
	container: {},
	top_box: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginVertical: 10,
	},
	chiled_box: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 8,
		paddingVertical: 6,
		marginRight: 10,
		marginVertical: 5,
	},
});
