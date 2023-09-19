import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "@novomarkt/constants/colors";
import DefaultHeader from "@novomarkt/screens/tabs/favorites/components/DefaultHeader";
import DefaultButton from "./general/DefaultButton";

type PropsSort = {
	item?: string;
	setModalVisible?: any;
	setModalSort?: any;
	modalSort: string;
	clearHandler?: () => void;
	setActiveSortType?: any;
	activeSortType?: string;
};

const title = "Сортировать";
const data = [
	{
		id: 0,
		name: "Популярные",
		type: "popular",
	},
	{
		id: 1,
		name: "Новинка",
		type: "new",
	},

	{
		id: 2,
		name: "Самые дешевые",
		type: "price_down",
	},
];
const SortView = (props: PropsSort) => {
	const [active, setActive] = useState<string>(props?.modalSort);
	const [activeType, setActiveType] = useState(props?.activeSortType);
	const sortAddHandler = () => {
		props.setModalVisible(false);
		props.setModalSort(active);
		props.setActiveSortType(activeType);
	};
	// console.log("active", active);
	// console.log("activeType", activeType);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
			<DefaultHeader name={title} />

			<View style={styles.content}>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.box}
							onPress={() => {
								setActive(item.name), setActiveType(item.type);
							}}
						>
							<Text style={styles.title}>{item.name}</Text>
							<View style={styles.except}>
								<View
									style={[
										styles.inside,
										{
											backgroundColor:
												active === item.name ? COLORS.blue : "#FFFFFF",
										},
									]}
								/>
							</View>
						</TouchableOpacity>
					)}
				/>
			</View>
			<View
				style={{
					paddingHorizontal: 15,
					bottom: 58,
					position: "absolute",
					width: "100%",
				}}
			>
				<DefaultButton text={"Применить"} onPress={sortAddHandler} />
			</View>
		</SafeAreaView>
	);
};

export default SortView;

const styles = StyleSheet.create({
	content: {
		marginTop: 16,
		marginLeft: 15,
		marginRight: 15,
		flexDirection: "column",

		flex: 1,
	},
	box: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 7,
	},

	except: {
		width: 29,
		height: 29,
		borderWidth: 1,
		borderColor: COLORS.blue,
		marginBottom: 7,
		borderRadius: 50,
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	inside: {
		width: 22,
		height: 22,
		borderRadius: 50,
	},
	title: {
		fontSize: 17,
		lineHeight: 40,
		fontWeight: "500",
		color: "#757575",
	},
});
