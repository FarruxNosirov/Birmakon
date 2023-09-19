import { COLORS } from "@novomarkt/constants/colors";
import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},

	header: {
		paddingHorizontal: 20,
		backgroundColor: COLORS.white,
	},

	headerTxt: {
		marginHorizontal: 15,
		color: COLORS.defaultBlack,
		fontSize: 20,
		fontWeight: "700",
	},
});
