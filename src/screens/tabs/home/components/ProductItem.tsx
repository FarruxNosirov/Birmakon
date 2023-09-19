/* eslint-disable quotes */
import requests, { appendUrl } from "@novomarkt/api/requests";
import { ProductItemResponse } from "@novomarkt/api/types";
import {
	BasketIcon,
	HeartIconBorder,
	HeartIconRed,
} from "@novomarkt/assets/icons/icons";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useAppSelector } from "@novomarkt/store/hooks";
import { toggleLoading } from "@novomarkt/store/slices/appSettings";
import {
	favoriteSelector,
	loadFavorite,
} from "@novomarkt/store/slices/favoriteSlice";
import { useNavigation } from "@react-navigation/core";
import React, {
	ReactElement,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	ActivityIndicator,
	Alert,
	Image,
	ListRenderItemInfo,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useDispatch } from "react-redux";

import { loadCart } from "@novomarkt/store/slices/cartSlice";
import { useIsFocused } from "@react-navigation/native";
import { find, flatten, isEmpty } from "lodash";

const ProductItem = ({
	item,
}: ListRenderItemInfo<ProductItemResponse> & {
	getProducts?: () => void;
}): ReactElement => {
	let { category, name, price, discount, price_old, id } = item;
	const dispatch = useDispatch();
	const isFocused = useIsFocused();
	let navigation = useNavigation();
	const [inside, setInside] = useState<any[]>([]);
	const productList = useMemo(() => {
		return flatten(inside.map((user) => user?.cart));
	}, [inside]);

	let isInCart = useMemo(
		() => find(productList, { product: { id } }),
		[id, productList]
	);

	const fav = useAppSelector(favoriteSelector);
	let isFav = !!fav[id];
	const [animate, setAnimate] = useState(false);

	const fistReqest = useCallback(async () => {
		try {
			let cartGet = await requests.products.getCarts();
			setInside(cartGet.data.data);
		} catch (error) {}
	}, []);

	useEffect(() => {
		isFocused && fistReqest();
	}, [fistReqest, isFocused]);

	const onCartPress = async () => {
		if (!isEmpty(isInCart)) {
			try {
				setAnimate(true);
				dispatch(toggleLoading(true));
				await requests.products.removeItem({
					product_id: id,
				});
				let cartGet = await requests.products.getCarts();
				dispatch(loadCart(cartGet.data.data));
				dispatch(toggleLoading(false));
				setInside(cartGet.data.data);
			} catch (error) {
				console.log(error);
			} finally {
				setAnimate(false);
				dispatch(toggleLoading(false));
			}
		} else {
			try {
				setAnimate(true);
				dispatch(toggleLoading(true));
				let res = await requests.products.addToCart({
					amount: 1,
					product_id: id,
				});
				let cartRes = await requests.products.getCarts();
				setInside(cartRes.data.data);
				dispatch(loadCart(cartRes.data.data));
			} catch (error) {
				Alert.alert(JSON.stringify(error, null, 4));
			} finally {
				setAnimate(false);
				dispatch(toggleLoading(false));
			}
		}
	};

	const onAddFavorite = async () => {
		try {
			dispatch(toggleLoading(true));
			await requests.favorites.addFavorite({
				product_id: id,
			});
			let r = await requests.favorites.getFavorites();
			dispatch(loadFavorite(r.data.data));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(toggleLoading(false));
		}
	};

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				//@ts-ignore
				navigation.navigate(ROUTES.PRODUCT_DETAILS, { item, id })
			}
		>
			<View style={styles.container}>
				<View style={styles.imageBox}>
					<Image
						source={{ uri: appendUrl(item?.photo) }}
						style={styles.image}
					/>
					<View style={styles.absolute}>
						<TouchableOpacity
							onPress={onAddFavorite}
							hitSlop={{
								left: 10,
								right: 10,
								top: 10,
								bottom: 10,
							}}
						>
							{isFav ? (
								<HeartIconRed fill={COLORS.red} />
							) : (
								<HeartIconBorder fill={COLORS.red} stroke={COLORS.red} />
							)}
						</TouchableOpacity>
						{discount ? (
							<View style={styles.discount}>
								<Text style={styles.dscountText}>
									{discount ? discount : ""}%
								</Text>
							</View>
						) : null}
					</View>
				</View>
				<View style={styles.details}>
					<View style={styles.nameAndPrice}>
						<View style={styles.row}>
							<Text style={styles.brand}>
								{category?.name?.length > 20
									? category?.name?.slice(0, 20) + ".."
									: category?.name}
							</Text>
							{/* <Text style={styles.brand}>{shop?.name}</Text> */}
						</View>
						<Text style={styles.name}>
							{name.length > 30 ? name.slice(0, 30) + "..." : name}
						</Text>
						<View style={styles.priceBox}>
							<Text style={styles.price}>
								{price.toLocaleString("ar-EG")} сум
							</Text>
							{price_old ? (
								<Text style={styles.oldPrice}>
									{price_old.toLocaleString("ar-EG")} сум
								</Text>
							) : null}
						</View>
					</View>

					<DefaultButton
						containerStyle={styles.button}
						secondary={isInCart}
						onPress={() => onCartPress()}
					>
						{animate ? (
							<ActivityIndicator
								size="small"
								color={COLORS.red}
								animating={animate}
							/>
						) : (
							<View style={styles.buttonContainer}>
								<Text
									style={[isInCart ? styles.inactiveCartText : styles.cartText]}
								>
									{isInCart ? `${STRINGS.addToCart}е` : `${STRINGS.addToCart}у`}
								</Text>
								<BasketIcon
									fill={isInCart ? COLORS.cartColor3 : COLORS.white}
								/>
							</View>
						)}
					</DefaultButton>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default ProductItem;

const styles = StyleSheet.create({
	dscountText: { fontSize: 12, color: COLORS.defaultBlack, fontWeight: "700" },
	discount: {
		borderRadius: 8,
		padding: 4,
		backgroundColor: COLORS.discountRed,
	},
	absolute: {
		position: "absolute",
		right: 0,
		top: 10,
		justifyContent: "space-between",
		height: 162,
		alignItems: "flex-end",
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
	button: {
		marginHorizontal: 0,
	},
	price: {
		color: COLORS.textColor,
		fontSize: 15,
		marginVertical: 5,
		fontWeight: "700",
	},
	name: {
		color: COLORS.defaultBlack,
		fontSize: 13,
		fontWeight: "700",
	},
	brand: {
		color: COLORS.gray,
		fontSize: 11,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	image: {
		width: "100%",
		height: 180,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	imageBox: {
		width: "100%",
		height: 178,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		position: "relative",
		resizeMode: "cover",
	},
	container: {
		borderWidth: 1,
		borderColor: COLORS.white,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		elevation: 5,
		shadowOpacity: 0.1,
		shadowRadius: 5,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		width: WINDOW_WIDTH / 2 - 20,
		marginHorizontal: 5,
		marginVertical: 4,
	},
	details: {
		paddingHorizontal: 8,
		paddingBottom: 23,
	},
	buttonContainer: {
		flexDirection: "row",
	},

	oldPrice: {
		color: COLORS.red,
		textDecorationLine: "line-through",
		fontSize: 12,
	},
	nameAndPrice: {
		minHeight: 80,
	},
	priceBox: {
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
});
