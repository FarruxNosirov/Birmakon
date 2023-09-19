import { COLORS } from "@novomarkt/constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.white,
	},

	button: {
		marginHorizontal: 15,
		marginTop: 10,
	},

	buttonTxtNoActive: {
		fontSize: 16,
		color: COLORS.black,
	},
	buttonTxtActive: {
		fontSize: 16,
		color: COLORS.white,
	},

	empty: {
		flex: 1,
		backgroundColor: COLORS.white,
	},

	emptyBox: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},

	emptyText: {
		fontSize: 22,
	},

	bottom: {
		marginBottom: 20,
	},

	top: {
		marginTop: 20,
	},
	shop: {
		width: "100%",
		marginVertical: 3,
	},
	topbar: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 15,
	},
	shopName: {
		flexDirection: "row",
		marginBottom: 10,
	},
	text: {
		color: COLORS.black,
		fontFamily: "800",
		fontSize: 14,
	},
	clearBtn: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 10,
		borderColor: COLORS.blue,
	},
	ClearText: {
		color: COLORS.black,
		fontFamily: "800",
		fontSize: 16,
	},
	btnstyleNoActive: {
		padding: 10,
		borderWidth: 1,
		borderColor: COLORS.blue,
		borderRadius: 10,
		backgroundColor: COLORS.white,
	},
	btnstyleActive: {
		padding: 10,
		borderWidth: 1,
		borderColor: COLORS.blue,
		borderRadius: 10,
		backgroundColor: COLORS.blue,
	},
	cleanTavar: {
		width: "60%",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		paddingRight: 15,
		paddingTop: 4,
	},
	goBack: { width: "40%" },
	topBox: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	oldContainer: { flex: 1, backgroundColor: COLORS.white, paddingTop: 10 },
});
