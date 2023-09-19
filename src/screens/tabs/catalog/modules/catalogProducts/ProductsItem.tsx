import requests, { assetUrl } from "@novomarkt/api/requests";
import {
	BasketIcon,
	HeartIconActive,
	HeartIconNotActive,
} from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useAppSelector } from "@novomarkt/store/hooks";
import { cartSelector, loadCart } from "@novomarkt/store/slices/cartSlice";
import {
	favoriteSelector,
	loadFavorite,
} from "@novomarkt/store/slices/favoriteSlice";
import { selectUser } from "@novomarkt/store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useDispatch } from "react-redux";

const ProductsItem = (item: any) => {
	let { price, discount, id } = item;

	const [animate, setAnimate] = useState(false);
	const cart = useAppSelector(cartSelector);
	let isInCart = !!cart[id];
	const dispatch = useDispatch();
	const fav = useAppSelector(favoriteSelector);
	let isFav = !!fav[id];
	const user = useAppSelector(selectUser);
	const notDiscountPrice = (price * 100) / (100 - discount);

	const navigation = useNavigation();

	const onAddFavorite = async () => {
		if (!user.token) {
			return Alert.alert(`Oшибка `, "вы не зарегистрированы", [
				{
					text: "Ок",
					onPress: () => navigation.navigate(ROUTES.AUTH as never),
				},
			]);
		} else {
			try {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				let res = await requests.favorites.addFavorite({
					product_id: id,
				});
				let r = await requests.favorites.getFavorites();
				dispatch(loadFavorite(r.data.data));
			} catch (error) {
				console.log(error);
			}
		}
	};

	const onCartPress = async () => {
		if (isInCart) {
			try {
				setAnimate(true);
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				let clear = await requests.products.removeItem({
					product_id: id,
				});
				let cartGet = await requests.products.getCarts();
				dispatch(loadCart(cartGet.data.data));
				setAnimate(false);
			} catch (error) {
				console.log(error);
				setAnimate(false);
			}
		} else {
			try {
				setAnimate(true);
				let res = await requests.products.addToCart({
					amount: 1,
					product_id: id,
				});
				if (!user.token) {
					return Alert.alert(`Oшибка `, "вы не зарегистрированы", [
						{
							text: "Ок",
							onPress: () => navigation.navigate(ROUTES.AUTH as never),
						},
					]);
				}
				if (res.status.toString() === "422") {
					Alert.alert("Кол-во товара на складе меньше чем вы указали");
				}
				let cartRes = await requests.products.getCarts();
				dispatch(loadCart(cartRes.data.data));
				setAnimate(false);
			} catch (error) {
				Alert.alert("Кол-во товара на складе меньше чем вы указали");
			} finally {
				setAnimate(false);
			}
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				//@ts-ignore
				navigation.navigate(ROUTES.PRODUCT_DETAILS, { item, id })
			}
		>
			<View style={styles.cartItem}>
				<Image style={styles.image} source={{ uri: assetUrl + item.photo }} />
				{discount ? (
					<View style={styles.sileBox}>
						<Text style={styles.sileText}>{discount}%</Text>
					</View>
				) : null}

				<TouchableOpacity onPress={onAddFavorite} style={styles.heartIconBox}>
					{isFav ? (
						<HeartIconActive fill={COLORS.red} />
					) : (
						<HeartIconNotActive />
					)}
				</TouchableOpacity>

				<View style={styles.cartItemInfo}>
					<View style={{ height: 115 }}>
						<View style={styles.title_box}>
							<Text style={styles.typeText}>
								{item.category?.name?.length > 15
									? item.category?.name?.slice(0, 15) + "..."
									: item.category?.name}
							</Text>
						</View>
						<View
							style={{
								flexDirection: "column",
								justifyContent: "space-between",
								height: 80,
							}}
						>
							<Text style={styles.nameText}>
								{item.name?.length > 25
									? item.name?.slice(0, 25) + "..."
									: item.name}
							</Text>
							<View
								style={{
									flexDirection: "column",
								}}
							>
								<Text style={styles.priceText}>
									{price
										.toLocaleString(undefined, {
											minimumFractionDigits: 0,
											maximumFractionDigits: 0,
										})
										.replace(/,/gi, " ")}{" "}
									{STRINGS.money}
								</Text>
								{discount ? (
									<Text style={styles.priceTextSile}>
										{/* {notDiscountPrice
											.toLocaleString(undefined, {
												minimumFractionDigits: 0,
												maximumFractionDigits: 0,
											})
											.replace(/,/gi, " ")}{" "} */}
										{notDiscountPrice.toFixed(0)}
										{STRINGS.money}
									</Text>
								) : null}
							</View>
						</View>
					</View>

					<TouchableOpacity
						style={[
							styles.button,
							{ backgroundColor: isInCart ? "#0052FF" : "#FFFFFF" },
						]}
						onPress={onCartPress}
					>
						{animate ? (
							<ActivityIndicator
								size="small"
								color={isInCart ? "#fff" : "#0052FF"}
								animating={animate}
							/>
						) : (
							<View style={styles.buttonContainer}>
								<Text
									style={[isInCart ? styles.cartText : styles.inactiveCartText]}
								>
									{isInCart ? `${STRINGS.addToCart}е` : `${STRINGS.addToCart}у`}
								</Text>
								<BasketIcon fill={isInCart ? COLORS.white : "#0052FF"} />
							</View>
						)}
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ProductsItem;

const styles = StyleSheet.create({
	cartItem: {
		height: 330,
		width: Dimensions.get("screen").width / 2 - 20,
		backgroundColor: "#fff",
		borderRadius: 8,
		marginBottom: 20,
		flexDirection: "column",
		marginRight: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	buttonContainer: {
		flexDirection: "row",
	},
	cartText: {
		color: COLORS.white,
		marginRight: 4,
		fontWeight: "700",
		fontSize: 15,
	},
	inactiveCartText: {
		color: "#0052FF",
		marginRight: 8,

		fontWeight: "700",
		fontSize: 15,
	},
	image: {
		width: Dimensions.get("screen").width / 2 - 20,
		height: 156,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	cartItemInfo: {
		paddingHorizontal: 10,
	},
	typeText: {
		fontSize: 13,
		fontWeight: "400",
		color: COLORS.blue,
	},
	nameText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#023047",
	},
	priceTextSile: {
		fontSize: 14,
		fontWeight: "400",
		color: COLORS.black,
		textDecorationLine: "line-through",
		textDecorationStyle: "solid",
		opacity: 0.5,
	},
	priceText: {
		fontSize: 15,
		fontWeight: "400",
		color: COLORS.blue,
	},
	button: {
		width: "100%",
		height: 42,
		borderRadius: 45,
		backgroundColor: COLORS.white,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		borderWidth: 1,
		borderColor: "#0052FF",
	},
	buttonText: {
		fontSize: 15,
		fontWeight: "700",
		color: COLORS.defaultTextColor,
		marginRight: 10,
	},
	sileBox: {
		width: 40,
		height: 25,
		backgroundColor: COLORS.white,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		bottom: 180,
		right: 8,
	},
	sileText: {
		fontSize: 13,
		fontWeight: "700",
		color: COLORS.black,
	},
	sileBoxBgColor: {
		backgroundColor: COLORS.defaultTextColor,
	},
	sileTextFS: {
		fontSize: 13,
	},
	heartIconBox: {
		position: "absolute",
		top: 10,
		right: 10,
	},
	title_box: {
		height: 20,
		width: "100%",
	},
});
