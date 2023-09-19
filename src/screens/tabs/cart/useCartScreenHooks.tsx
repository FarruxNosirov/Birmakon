import requests from "@novomarkt/api/requests";
import { ROUTES } from "@novomarkt/constants/routes";
import { useAppSelector } from "@novomarkt/store/hooks";
import { cartArraySelector, loadCart } from "@novomarkt/store/slices/cartSlice";
import { selectUser } from "@novomarkt/store/slices/userSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const useCartScreenHooks = () => {
	const dispatch = useDispatch();
	const user = useAppSelector(selectUser);
	let navigation: any = useNavigation();
	const isFocused = useIsFocused();
	let cart = useSelector(cartArraySelector);
	let totalPrices = cart.reduce((total, item) => {
		item?.cart.forEach((product: { price: number }) => {
			total += product.price;
		});
		return total;
	}, 0);

	const onClearCart = async () => {
		try {
			await requests.products.clearCart();
			let cartGet = await requests.products.getCarts();
			dispatch(loadCart(cartGet.data.data));
		} catch (error) {
			console.log(error);
		} finally {
		}
	};

	const onRegistr = useCallback(() => {
		if (!user.token) {
			return Alert.alert(`Oшибка `, "вы не зарегистрированы", [
				{
					text: "Отмена",
					onPress: () => navigation.navigate(ROUTES.HOME as never),
				},
				{
					text: "Хорошо",
					onPress: () => navigation.navigate(ROUTES.AUTH as never),
				},
			]);
		}
	}, [navigation, user]);

	useEffect(() => {
		isFocused && onRegistr();
	}, [isFocused, onRegistr]);

	const [activeShop, setActiveShop] = useState({});
	const isEmpty = Object.keys(activeShop).length === 0;

	return { onClearCart, totalPrices, cart, setActiveShop, activeShop, isEmpty };
};
