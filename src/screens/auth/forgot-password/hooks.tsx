import requests from "@novomarkt/api/requests";
import { ROUTES } from "@novomarkt/constants/routes";
import { useAppDispatch } from "@novomarkt/store/hooks";
import { userLoggedIn } from "@novomarkt/store/slices/userSlice";
import { validatePhoneNumber } from "@novomarkt/utils/validation";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export interface OnResedProps {
	phone?: string;
}
export const ResendHook = () => {
	const [state, setState] = useState<any>({
		phone: "",
	});
	const [error, setError] = useState("");
	let [loading, setLoading] = useState<boolean>(false);
	let dispatch = useAppDispatch();
	let navigition = useNavigation<any>();

	const OnPress = async () => {
		// @ts-ignore
		if (validatePhoneNumber(state.phone)) {
			try {
				setLoading(true);
				let res = await requests.auth.forgetPassword(state);
				console.log("Data===", JSON.stringify(res, null, 2));
				dispatch(userLoggedIn(res));
				navigition.navigate(ROUTES.VERIFICATION as never, {
					phone: state.phone,
				});
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		} else {
			setError("Заполните поля");
			setTimeout(() => {
				setError("");
			}, 3000);
		}
	};
	const onChange = (phone: string) => {
		setState({ ...state, phone: phone });
	};
	return {
		onChange,
		OnPress,
		error,
		loading,
		state,
	};
};
