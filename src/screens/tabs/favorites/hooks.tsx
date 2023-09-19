import requests from "@novomarkt/api/requests";
import { ROUTES } from "@novomarkt/constants/routes";
import { useAppSelector } from "@novomarkt/store/hooks";
import {
	favoriteArraySelector,
	loadFavorite,
} from "@novomarkt/store/slices/favoriteSlice";
import { selectUser } from "@novomarkt/store/slices/userSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const useFavoritesHook = () => {
	const [isModalVisible, setModalVisible] = useState(false);
	const dispatch = useDispatch();
	let favoritesArray = useSelector(favoriteArraySelector);
	const user = useAppSelector(selectUser);
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	const toggleModal = () => {
		setModalVisible(!isModalVisible);
	};
	const [loading, setLoading] = useState(false);

	const getFavs = async () => {
		setLoading(true);
		try {
			let res = await requests.favorites.getFavorites();
			dispatch(loadFavorite(res.data.data));
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
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

	return {
		favorites: favoritesArray,
		toggleModal,
		isModalVisible,
		getFavs,
		loading,
	};
};
