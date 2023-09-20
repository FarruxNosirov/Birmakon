import { COLORS } from "@novomarkt/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
		flexWrap: "wrap",
	},
	keybord: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	container2: {
		marginHorizontal: 0,
	},
	footer: { width: "100%", height: 50 },
	contentContainerStyle: { flexDirection: "column", paddingHorizontal: 10 },
});
