import requests from "@novomarkt/api/requests";
import { ROUTES } from "@novomarkt/constants/routes";
import { useAppDispatch } from "@novomarkt/store/hooks";
import { userLoggedIn } from "@novomarkt/store/slices/userSlice";
import { validatePhoneNumber } from "@novomarkt/utils/validation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
export interface LoginState {
	phone: string;
	password: string;
	code?: string;
}

const useLoginHook = () => {
	const route = useRoute();
	const codeValue = route.params;
	let navigation = useNavigation();
	const [error, setError] = useState(false);
	let [loading, setLoading] = useState<boolean>(false);
	let dispatch = useAppDispatch();

	const [state, setState] = useState<LoginState>({
		phone: "+998901951625",
		password: "565189",
	});
	let onStateChange = (key: string) => (value: string) => {
		setState({ ...state, [key]: value });
	};

	let onLogin = async () => {
		if (validatePhoneNumber(state.phone)) {
			try {
				setLoading(true);
				let res = await requests.auth.login(state);
				console.log(JSON.stringify(res.data, null, 2));
				dispatch(userLoggedIn(res.data));
				setError(!res.data);
			} catch (error) {
				console.log("error", error);
			} finally {
				setLoading(false);
			}
		} else {
			setTimeout(() => {
				setError(true);
			}, 3000);
		}
	};

	let onForgotPassNavigation = () =>
		navigation.navigate(ROUTES.FORGOTPASSWORD as never);
	let onLoginNavigation = () => navigation.navigate(ROUTES.REGISTER as never);

	return {
		onLogin,
		onStateChange,
		state,
		loading,
		onLoginNavigation,
		onForgotPassNavigation,
		error,
		codeValue,
	};
};

export default useLoginHook;
