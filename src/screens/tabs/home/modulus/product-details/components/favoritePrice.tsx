/* eslint-disable quotes */
import { COLORS } from "@novomarkt/constants/colors";
import React from "react";
import { GestureResponderEvent, StyleSheet, Text, View } from "react-native";

export interface BlueButtonProps {
	newprice?: number | undefined | null;
	oldprice?: number | undefined | null;
	fromTo?: number | undefined | null;
	fromToFrom?: number | undefined | null;
	tofrom?: number | undefined | null;
	smallprice?: number | undefined | null;
	bigprice?: number | undefined | null;
	onPress?: (event: GestureResponderEvent) => void;
}

const FavoritePrice = ({
	oldprice,
	newprice,

	fromToFrom,
	tofrom,
	smallprice,
	bigprice,
}: BlueButtonProps) => {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<Text style={styles.text01}>{oldprice} сум</Text>
				<Text style={styles.newprice}>{newprice} сум</Text>
			</View>
			<View style={styles.box1}>
				<View style={styles.row}>
					<Text style={styles.fromTo}>
						от {fromToFrom} до {tofrom}: {""}
					</Text>
					<Text style={styles.smallprice}>{smallprice} сум</Text>
				</View>
				<View style={styles.row}>
					<Text style={styles.tofrom}>
						от {tofrom}: {""}
					</Text>
					<Text style={styles.bigprice}>{bigprice} сум</Text>
				</View>
			</View>
		</View>
	);
};

export default FavoritePrice;
const styles = StyleSheet.create({
	text01: {
		color:
			"background: linear-gradient(270deg, rgba(64, 64, 64, 0.80) 0%, rgba(21, 21, 21, 0.80) 100%))",
		fontWeight: "500",
		fontSize: 12,
		textDecorationColor: COLORS.defaultBlack,
		textDecorationLine: "line-through",
	},
	newprice: {
		fontSize: 24,
		fontWeight: "700",
		color: "#313131",
	},
	buttoncontainer: {},
	container: {
		marginHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	box: {
		width: "45%",
		// marginHorizontal: -5,
	},
	box1: {
		width: "55%",
	},
	fromTo: {
		fontSize: 14,
		color: "#000000",
		fontWeight: "400",
	},
	tofrom: {
		fontSize: 14,
		color: "#000000",
		fontWeight: "400",
	},
	smallprice: {
		fontSize: 12,
		fontWeight: "400",
		color: "#999",
	},
	bigprice: {
		fontSize: 12,
		fontWeight: "400",
		color: "#999999",
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 2,
	},
});
