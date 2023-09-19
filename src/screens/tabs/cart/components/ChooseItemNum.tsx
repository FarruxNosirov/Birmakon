import requests, { appendUrl } from "@novomarkt/api/requests";
import {
	CrashIcon,
	MinusIcon,
	PlusCounterIcon,
} from "@novomarkt/assets/icons/icons";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { STRINGS } from "@novomarkt/locales/strings";
import { toggleLoading } from "@novomarkt/store/slices/appSettings";

import { loadCart } from "@novomarkt/store/slices/cartSlice";
import React from "react";
import {
	Image,
	LayoutAnimation,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch } from "react-redux";

export default function ChooseItemNum({
	data,
	index,
}: {
	data: any;
	index?: number;
}) {
	const dispatch = useDispatch();
	let id = data?.product?.id;

	const onAddItem = async () => {
		try {
			dispatch(toggleLoading(true));
			await requests.products.increaseItem({
				amount: 1,
				product_id: id,
			});
			let cartRes = await requests.products.getCarts();
			dispatch(loadCart(cartRes.data.data));
			// dispatch(updateBasketCount({ count: count + 1 }));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(toggleLoading(false));
		}
	};

	const onDecreaseItem = async () => {
		try {
			dispatch(toggleLoading(true));
			await requests.products.decreaseItem({
				product_id: id,
			});
			let cartRes = await requests.products.getCarts();
			dispatch(loadCart(cartRes.data.data));
			// dispatch(updateBasketCount({ count: count - 1 }));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(toggleLoading(false));
		}
	};

	const onRemoveItem = async () => {
		try {
			dispatch(toggleLoading(true));
			await requests.products.removeItem({
				product_id: id,
			});
			let cartRes = await requests.products.getCarts();
			dispatch(loadCart(cartRes.data.data));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(toggleLoading(false));
			LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
		}
	};

	return (
		<>
			<View key={index} style={styles.container}>
				<View style={styles.imageBox}>
					<Image
						style={styles.leftImage}
						source={{ uri: appendUrl(data?.product?.photo) }}
					/>
				</View>
				<View style={styles.textBox}>
					<Text style={styles.headerTxt}>{data?.product?.name}</Text>
					<Text style={styles.itemTxt}>
						{STRINGS.color}
						<Text> {data?.product?.color?.name}</Text>
					</Text>
					<Text style={styles.itemTxt}>
						{STRINGS.size}
						<Text> {data?.product?.size ?? 36}</Text>
					</Text>
					<View style={styles.rowTxt}>
						<Text style={styles.blueTxt}>{data?.product?.price} сум</Text>
						{data?.product?.price_old ? (
							<Text style={styles.lineThrough}>
								{data?.product?.price_old} сум
							</Text>
						) : null}
					</View>
					<View style={styles.counter}>
						<TouchableOpacity onPress={onDecreaseItem} style={styles.minus}>
							<View style={styles.minus}>
								<MinusIcon fill={COLORS.white} />
							</View>
						</TouchableOpacity>
						<View style={styles.topBottom}>
							<Text>{data?.amount} шт</Text>
						</View>
						<TouchableOpacity onPress={onAddItem} style={styles.plus}>
							<View style={styles.plus}>
								<PlusCounterIcon fill={COLORS.white} />
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.iconBox}>
					{/* <TouchableOpacity
						hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
					>
						<View style={styles.chackout}>
							<Image
								style={styles.image}
								source={require("../../../../assets/images/tick.png")}
							/>
						</View>
					</TouchableOpacity> */}
					<TouchableOpacity
						onPress={onRemoveItem}
						hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
					>
						<CrashIcon fill={COLORS.gray} />
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: COLORS.white,
		shadowOpacity: 0.05,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		borderRadius: 10,
		paddingVertical: 11,
		paddingHorizontal: 11,
		elevation: 2,
		marginHorizontal: 15,
	},

	leftImage: {
		width: 80,
		height: 90,
		borderRadius: 8,
	},

	textBox: {
		flexShrink: 1,
		paddingHorizontal: 10,
		maxWidth: "50%",
	},

	headerTxt: {
		fontSize: 14,
		letterSpacing: 0.5,
		fontWeight: "700",
		color: COLORS.defaultBlack,
	},

	itemTxt: {
		fontSize: 11,
		color: COLORS.defaultBlack,
	},

	rowTxt: {
		alignItems: "center",
		flexDirection: "row",
		marginVertical: 5,
	},

	blueTxt: {
		fontSize: 15,
		fontWeight: "700",
		color: COLORS.red,
	},

	lineThrough: {
		fontSize: 12,
		marginLeft: 10,
		textDecorationLine: "line-through",
	},

	counter: {
		// alignItems: "center",
		flexDirection: "row",
		width: 150,
	},

	iconBox: {
		paddingVertical: 5,
		justifyContent: "flex-end",
	},

	item: {
		color: COLORS.white,
	},

	minus: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5,
		backgroundColor: COLORS.orange,
	},

	plus: {
		paddingVertical: 5,
		paddingHorizontal: 5,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
		backgroundColor: COLORS.lightBlack,
	},
	topBottom: {
		// height: "100%",
		width: 50,
		borderColor: COLORS.whiteGray,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	imageBox: {
		width: 85,
		justifyContent: "center",
		alignItems: "center",
	},
	chackout: {
		width: 18,
		height: 18,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	image: { width: 14, height: 14 },
});
