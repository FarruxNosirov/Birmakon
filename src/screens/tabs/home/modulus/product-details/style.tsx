import { COLORS } from "@novomarkt/constants/colors";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
	},
	titleBottom: {
		fontWeight: "700",
		fontSize: 17,

		color: COLORS.black,
		marginLeft: 15,
	},
	bottomFilter: {
		marginTop: 10,
		marginBottom: 20,
		paddingTop: 15,
	},
	propertyBox: {},
	propertyBoxText: {
		fontSize: 16,
		color: COLORS.black,
		marginBottom: 7,
		fontWeight: "500",
	},
	iconView: {
		marginTop: 8,
	},
	bigger: {
		width: "100%",
		backgroundColor: COLORS.white,
		borderRadius: 8,
		paddingVertical: Platform.OS === "android" ? 10 : 15,
		paddingBottom: 60,
		fontStyle: "italic",
		marginVertical: 10,
		color: COLORS.black,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: COLORS.blue,
	},
	flatlistContainerView: {
		paddingVertical: 20,
		paddingHorizontal: 15,
	},
	flatlistContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	flatlistContainerText: {
		fontWeight: "700",
		fontSize: 17,
		color: COLORS.textColor1,
	},
	flatlistContainerBox: {
		marginTop: 10,
	},
	flatlistContainerBoxText: {
		fontSize: 12,
		color: COLORS.gray,
	},
	flatlistContainerBoxText1: {
		fontSize: 12,
		marginLeft: 10,
		marginTop: 10,
		color: COLORS.gray,
	},
	flatlistContainer12: {
		paddingVertical: 10,
	},
	flatlistContainerText12: {
		fontSize: 17,
		color: COLORS.textColor1,
		fontWeight: "700",
	},
	oldContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginHorizontal: 15,
		marginTop: 20,
		marginBottom: 20,
	},
	oldView: {
		width: 91,
		maxWidth: 90,
		height: 40,
		backgroundColor: "#131E3D",
		borderRadius: 8,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 5,
		marginTop: 10,
	},
	oldText: {
		color: COLORS.white,
	},
	oldView1: {
		width: 91,
		maxWidth: 90,
		height: 40,
		backgroundColor: COLORS.lightOrange,
		borderRadius: 7,
		alignItems: "center",
		justifyContent: "center",
		marginTop: 10,
	},
	sectionBox: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 30,
		marginHorizontal: 15,
	},
	sectionBoxText: {
		fontSize: 17,
		fontWeight: "700",
		color: COLORS.textColor1,
	},
	sectionContainer: {},
	corusellText: {
		fontSize: 22,
		fontWeight: "700",
		color: COLORS.lightBlack,
		marginLeft: 20,
		marginTop: 20,
	},
	activeSize: {
		fontSize: 20,
		fontWeight: "500",
		borderRadius: 5,
		color: COLORS.lightBlack,
	},
	counter: {
		flexDirection: "row",
		marginHorizontal: 15,
		borderRadius: 8,
		marginTop: 30,
	},
	minus: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		backgroundColor: COLORS.orange,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
	},

	plus: {
		padding: 10,
		paddingHorizontal: 10,
		backgroundColor: COLORS.lightBlack,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	topBottom: {
		width: 40,
		borderColor: COLORS.whiteGray,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	function: {
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 15,
	},
	functionText: {
		fontSize: 16,
		color: "#666666",
	},
	deliveryView: {
		marginVertical: 30,
		marginHorizontal: 10,
		paddingHorizontal: 10,
	},
	deliveryText: {
		fontWeight: "600",
		fontSize: 20,
		color: COLORS.black,
		marginVertical: 6,
	},
	deliveryText1: {
		fontSize: 16,
		color: COLORS.black,
		marginVertical: 6,
	},
	scrollView1: {
		position: "absolute",
		width: 34,
		height: 34,
		borderRadius: 50,
		backgroundColor: "#E5E5E5",
		justifyContent: "center",
		alignItems: "center",
		right: 10,
		top: 28,
		zIndex: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	sectionText: {},
	sectionSize: {
		marginTop: 20,
		marginHorizontal: 12,
		borderWidth: 1,
		paddingHorizontal: 18,
		paddingVertical: 14,
		borderRadius: 5,
		marginLeft: 1,
	},
	corusellContiner: {
		marginTop: 20,
		marginLeft: 18,
		paddingHorizontal: 1,
		width: 92,
		height: 86,
	},
	scrollView: {
		position: "absolute",
		width: 34,
		height: 34,
		borderRadius: 50,
		backgroundColor: "#E5E5E5",
		justifyContent: "center",
		alignItems: "center",
		right: 10,
		top: 40,
		zIndex: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	header: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.white,
		elevation: 4,
	},
	activeColor: {
		width: 92,
		height: 86,
	},
	corusell: {
		width: 75,
		height: 68,
		borderRadius: 5,
	},
	carousel: {
		paddingTop: 12,
		minHeight: 300,
	},
	headerText: {
		fontSize: 15,
		fontWeight: "700",
		letterSpacing: 0.5,
		color: COLORS.red,
	},

	button: {
		width: 130,
		height: 40,
		flexDirection: "row",
	},

	buttonText: {
		color: COLORS.white,
		marginRight: 10,
	},
	otsenka: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 15,
	},

	buttonCon: {
		paddingHorizontal: 10,
		paddingVertical: 0,
		marginHorizontal: 0,
		marginTop: 0,
		borderRadius: 14,
	},

	itemName: {
		color: COLORS.defaultBlack,
		marginHorizontal: 15,
		fontSize: 17,
		fontWeight: "700",
		letterSpacing: 0.5,
		marginBottom: 15,
	},

	credit: {
		padding: 18,
		backgroundColor: COLORS.lightGray,
		marginHorizontal: 20,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
	},

	creditPrice: {
		marginLeft: 10,
	},

	creditName: {
		color: COLORS.defaultBlack,
		fontSize: 14,
	},

	creditPriceText: {
		color: COLORS.defaultBlack,
		fontSize: 15,
		fontWeight: "700",
	},

	map: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderColor: COLORS.lightGray,
		flexDirection: "row",
		justifyContent: "space-between",
	},

	key: {
		color: COLORS.defaultBlack,
		fontSize: 14,
	},

	compos: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingVertical: 15,
		marginTop: 20,
		borderBottomWidth: 1,
		borderColor: COLORS.lightGray,
	},

	composition: {
		color: COLORS.defaultBlack,
		fontSize: 15,
		fontWeight: "700",
		letterSpacing: 0.5,
	},

	buttonTxt: {
		color: COLORS.white,
		fontSize: 16,
		marginHorizontal: 20,
	},

	composTwo: {
		marginHorizontal: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingRight: 5,
		marginTop: 30,
	},

	rowHeader: {
		marginTop: 20,
		marginVertical: 10,
		marginHorizontal: 20,
		flexDirection: "row",
	},

	arrow: {
		alignSelf: "center",
		marginLeft: 0.5,
	},

	txt: {
		fontSize: 14,
	},

	blueText: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.red,
		marginLeft: 10,
		fontSize: 14,
	},

	redText2: {
		fontSize: 14,
		marginLeft: 10,
	},

	flexEnd: {
		color: COLORS.red,
		marginHorizontal: 20,
		marginTop: 10,
		alignSelf: "flex-end",
		textDecorationLine: "underline",
		textDecorationColor: COLORS.red,
	},

	buttonReview: {
		fontSize: 16,
		color: COLORS.white,
	},

	contentContainerStyle: { paddingHorizontal: 12 },

	containerFlat: {
		marginBottom: 20,
		alignSelf: "center",
	},

	title: {
		color: COLORS.defaultBlack,
		fontSize: 20,
		marginHorizontal: 20,
		marginVertical: 20,
		fontWeight: "700",
		letterSpacing: 0.5,
	},

	marginBottom: {
		marginBottom: 40,
		marginHorizontal: 15,
		marginTop: 20,
	},

	marginBottomEnd: {
		marginBottom: 20,
		marginHorizontal: 15,
	},

	productImage: {
		width: WINDOW_WIDTH - 20,
		height: 400,
		alignSelf: "center",
	},

	buttonContainer: {
		flexDirection: "row",
		margin: 0,
	},

	cartText: {
		color: COLORS.white,
		marginRight: 4,
		fontWeight: "700",
	},
	inactiveCartText: {
		color: COLORS.cartColor3,
		marginRight: 8,
		fontFamily: "Montserrat-Medium",
	},

	modalView: {
		padding: 10,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		marginBottom: 70,
	},

	inputStyle: {
		padding: 10,
	},

	rating: {
		marginHorizontal: 10,
		marginVertical: 10,
		alignSelf: "flex-start",
	},

	buttonSubmit: {
		padding: 0,
		marginHorizontal: 10,
		marginVertical: 10,
	},

	containerComment: {
		backgroundColor: COLORS.white,
	},

	boxes: {
		marginHorizontal: 20,
		marginVertical: 10,
		elevation: 5,
		shadowOpacity: 0.3,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		backgroundColor: COLORS.white,
		borderRadius: 8,
		padding: 15,
	},

	nameRow: {
		flexDirection: "row",
	},

	name: {
		color: COLORS.defaultBlack,
		fontSize: 16,
	},

	stars: {
		marginLeft: 30,
		alignSelf: "center",
		flexDirection: "row",
	},

	comment: {
		maxWidth: 200,
		marginVertical: 10,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	icon: {
		marginRight: 5,
	},

	ceckedColor: {
		borderWidth: 1,
		borderColor: "blue",
	},
	ceckedColorNo: {
		borderWidth: 0,
	},
	topBarr: {
		flexDirection: "row",
		paddingHorizontal: 20,
		marginBottom: 22,
	},
	topBarrTitle: {
		fontSize: 14,
		color: "#999999",
		marginRight: 5,
	},
	dotStyle: {
		width: 18,
		height: 6,
		backgroundColor: "black",
	},
	dotNoActive: {
		width: 10,
		height: 10,
		backgroundColor: "#729EDB",
	},
	dotContainer: { paddingHorizontal: 20 },
	box4: {
		paddingHorizontal: 15,
	},
	box4_content: {
		position: "relative",
		marginBottom: 13,
	},
	box4_title: {
		fontWeight: "700",
		fontSize: 17,
		lineHeight: 40,
		color: COLORS.black,
	},
	buttonSize: {
		minWidth: 52,
		height: 33,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderColor: COLORS.textColor,
		paddingHorizontal: 5,
		borderRadius: 5,
		borderWidth: 1,
		marginRight: 6,
	},
	active_title: {
		fontSize: 15,
		fontWeight: "400",
		lineHeight: 20,
		color: "#000",
	},
	buttonColor: {
		minWidth: 92,
		height: 33,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderColor: COLORS.blue,
		paddingHorizontal: 5,
		borderRadius: 15,
		borderWidth: 1,
		marginRight: 5,
	},
	box_noactive: {
		width: "100%",
		zIndex: 3,
		paddingVertical: 5,
	},
	dastavka: { paddingHorizontal: 15 },
	goBack: {
		flexDirection: "row",
		marginHorizontal: 20,
		marginVertical: 20,
		alignItems: "center",
	},
	notValue: {
		textAlign: "center",
		color: COLORS.red,
		marginTop: 100,
	},
});
