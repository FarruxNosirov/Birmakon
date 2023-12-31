import { COLORS } from "@novomarkt/constants/colors";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},

	header: {
		paddingVertical: 20,
		paddingHorizontal: 15,
		backgroundColor: COLORS.white,
	},

	image: {
		height: 250,
		alignSelf: "center",
		width: WINDOW_WIDTH - 40,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},

	name: {
		marginVertical: 10,

		color: COLORS.defaultBlack,
		fontSize: 18,
	},

	description: {
		marginVertical: 10,
		marginHorizontal: 15,
		color: COLORS.defaultBlack,
		fontSize: 15,
	},
	contantBox: {
		width: "100%",
		marginBottom: 50,
		backgroundColor: COLORS.white,
		marginTop: 20,
		paddingHorizontal: 15,
	},
});
