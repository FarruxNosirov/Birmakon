import { appendUrl } from "@novomarkt/api/requests";
import { ShopsItemResponse } from "@novomarkt/api/types";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import {
	Image,
	ListRenderItemInfo,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";

const ShopsItem = ({
	item: { photo, id, name },
}: ListRenderItemInfo<ShopsItemResponse>): ReactElement => {
	let navigation: any = useNavigation();
	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate(ROUTES.ShopProducts, { id, name, type: "shop" })
			}
		>
			<View style={styles.container}>
				<Image source={{ uri: appendUrl(photo) }} style={styles.image} />
				{/* <Text style={styles.title}>{name}</Text> */}
			</View>
		</TouchableOpacity>
	);
};

export default ShopsItem;

const styles = StyleSheet.create({
	container: {
		width: 85,
		height: 70,
		elevation: 2,
		shadowOpacity: 0.3,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		margin: 10,
		borderRadius: 8,
	},
	image: {
		resizeMode: "contain",
		width: 60,
		height: 60,
	},
	title: {
		color: COLORS.black,
	},
});
