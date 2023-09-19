import { COLORS } from "@novomarkt/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},

	header: {
		marginHorizontal: 15,
	},

	headerText: {
		marginHorizontal: 15,
		marginBottom: 20,
		fontSize: 20,
		fontWeight: "700",
		color: "#023047",
	},

	map: {
		paddingVertical: 200,
		marginHorizontal: 15,
	},

	boxes: {
		marginVertical: 20,
	},
});
