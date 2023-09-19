/* eslint-disable quotes */
import { COLORS } from "@novomarkt/constants/colors";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	container2: {
		flex: 1,
		backgroundColor: "#fff",
	},
	input: {
		width: "90%",
		padding: 0,
		borderRadius: 5,
		paddingLeft: 10,
	},
	input2: {
		width: "100%",
		padding: 0,
		borderRadius: 5,
	},
	input3: {
		width: "90%",
		borderWidth: 0,
		padding: 0,
		borderRadius: 5,
	},
	inputContainer: { width: "100%", position: "relative" },
	pol: {
		flexDirection: "column",
		width: "50%",
	},
	polTitle2: {
		color: COLORS.defaultBlack,
	},
	noActivePol: {
		width: 7,
		height: 7,
		borderRadius: 50,
	},
	polBox: {
		flexDirection: "row",
		width: "100%",
		marginTop: 10,
		marginBottom: 15,
	},
	polTitle: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 10,
	},
	activePol: {
		width: 12,
		height: 12,
		borderWidth: 1,
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
	},

	header: {
		fontSize: 20,
		color: COLORS.defaultBlack,
		marginTop: 20,
		marginHorizontal: 20,
		fontWeight: "600",
		fontFamily: "Montserrat",
	},

	shadowBox: {
		padding: 15,
		marginVertical: 10,
		borderRadius: 8,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		marginHorizontal: 20,
	},

	row: {
		alignItems: "center",
		flexDirection: "row",
	},

	text: {
		fontSize: 18,
		color: COLORS.defaultBlack,
		marginHorizontal: 15,
	},

	inputBox: {
		marginTop: 20,
	},

	rowButtons: {
		marginTop: 5,
		marginRight: 10,
		flexDirection: "row",
	},

	blueText: {
		color: COLORS.red,
		fontSize: 14,
		marginTop: 10,
	},

	dot: {
		width: 17,
		height: 17,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: COLORS.gray,
		backgroundColor: COLORS.white,
		alignItems: "center",
		justifyContent: "center",
	},

	background: {
		width: 9,
		height: 9,
		borderRadius: 6,
		backgroundColor: COLORS.gray,
	},
	dotGray: {
		width: 17,
		height: 17,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: COLORS.gray,
		backgroundColor: COLORS.white,
		alignItems: "center",
		justifyContent: "center",
	},

	backgroundGray: {
		width: 9,
		height: 9,
		borderRadius: 6,
		backgroundColor: COLORS.white,
	},

	black: {
		marginLeft: 5,
		color: COLORS.defaultBlack,
	},

	head: {
		// marginTop: -10,
		alignSelf: "center",
		color: COLORS.defaultBlack,
		fontFamily: "Montserrat-Medium",
	},

	shadowBoxTwo: {
		padding: 15,
		borderRadius: 8,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		marginHorizontal: 15,
		marginBottom: 40,
	},

	bank: {
		color: COLORS.defaultBlack,
		fontSize: 18,
		marginBottom: 10,
	},

	locate: {
		padding: 15,
		marginVertical: 10,
		borderRadius: 8,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		marginHorizontal: 20,
	},

	moscow: {
		marginLeft: 10,
	},

	txt: {
		color: COLORS.defaultBlack,
		fontSize: 18,
		marginBottom: 10,
	},

	delete: {
		padding: 15,
		marginVertical: 10,
		borderRadius: 8,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		marginHorizontal: 20,
	},

	recover: {
		padding: 15,
		marginVertical: 10,
		borderRadius: 8,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		marginHorizontal: 15,
		marginBottom: 20,
	},

	left: {
		paddingHorizontal: 20,
		backgroundColor: COLORS.white,
		paddingBottom: 15,
	},

	userData: {
		flex: 1,
		padding: 15,
		borderRadius: 8,
		marginHorizontal: 20,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		marginVertical: 20,
	},
	userName: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
	},
	imageBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: 80,
		height: 80,

		borderRadius: 50,
		position: "relative",
		marginRight: 10,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 50,
	},
	addImage: {
		position: "absolute",
		width: "100%",
		height: "100%",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	userNameText: {
		marginVertical: 10,
		width: "75%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingRight: 20,
	},
	birthday: {
		width: "50%",
	},
});
