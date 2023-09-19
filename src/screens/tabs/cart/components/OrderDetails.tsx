/* eslint-disable quotes */
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import { StyleSheet, View } from "react-native";

const OrderDetails = ({ total }: any) => {
	return (
		<View style={styles.container}>
			{/* <Text style={styles.headerTxt}>{STRINGS.orderDetails}</Text> */}
			<View style={styles.box}>
				<View style={styles.rowFooter}>
					<Text style={styles.footerTxt}>{STRINGS.totalPrice}</Text>
					<Text style={styles.total}>
						{Number(total)
							.toLocaleString("USD", {
								style: "currency",
								currency: "USD",
								minimumFractionDigits: 0,
								maximumFractionDigits: 0,
							})
							.replace(/,/gi, " ")}
						{STRINGS.money}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default OrderDetails;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 15,
		marginTop: 20,
	},

	headerTxt: {
		fontSize: 19,
		fontFamily: "Montserrat",
		color: COLORS.defaultBlack,
	},

	box: {
		padding: 10,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		borderRadius: 8,
		marginVertical: 10,
		backgroundColor: COLORS.white,
	},

	row: {
		flexDirection: "row",
		marginVertical: 5,
		justifyContent: "space-between",
	},

	price: {
		fontSize: 14,
		color: COLORS.defaultBlack,
		fontWeight: "700",
	},

	image: {
		width: 30,
		height: 10,
		marginLeft: 5,
		marginTop: 2,
	},

	footerTxt: {
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.5,
		color: COLORS.defaultBlack,
	},

	rowFooter: {
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	total: {
		fontSize: 16,
		fontWeight: "700",
		letterSpacing: 0.5,
		color: COLORS.red,
	},
});
