import requests from "@novomarkt/api/requests";
import { ROUTES } from "@novomarkt/constants/routes";
import { useAppDispatch } from "@novomarkt/store/hooks";
import { userLoggedIn } from "@novomarkt/store/slices/userSlice";
import { validatePhoneNumber } from "@novomarkt/utils/validation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

let timer = -1;

const useVerificationHook = () => {
	const route: any = useRoute();
	let dispatch = useAppDispatch();
	let navigation = useNavigation();
	const [timeLeft, setTimeLeft] = useState(30);
	const [loading, setLoading] = useState<boolean>(false);
	const [state, setState] = useState<{ code: string; phone: string }>({
		code: "",
		phone: route.params?.phone ? route.params?.phone : "",
	});

	const startTimer = () => {
		timer = setTimeout(() => {
			if (timeLeft <= 0) {
				clearTimeout(timer);
				return false;
			}
			setTimeLeft(timeLeft - 1);
		}, 1000);
		return timer;
	};

	useEffect(() => {
		startTimer();
		return () => clearTimeout(timer);
	});

	let resendCode = async () => {
		setTimeLeft(40);
		if (validatePhoneNumber(state.phone)) {
			try {
				setLoading(true);
				let res = await requests.auth.forgetPassword(route.params?.phone);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};

	let onVerificate = async () => {
		//validate phone matches +998 ** *** ** **
		if (validatePhoneNumber(state.phone as string)) {
			//send data to remote
			try {
				setLoading(true);
				let res = await requests.auth.resedSms(state);
				const data = res.data.data;
				!!data &&
					Alert.alert(
						"Ogoxlatirish",
						`Mufoqiyatli kodingiz ${data.password} ga uzgardi!`
					);

				!!data &&
					navigation.navigate(ROUTES.LOGIN as never, { data: res.data });
				dispatch(userLoggedIn(res.data.date));
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}
	};
	let onChangePhoneNumber = () => navigation.goBack();

	let onStateChange = (key: string) => (value: string) => {
		setState({ ...state, [key]: value });
	};
	// console.log(JSON.stringify(state, null, 2));
	return {
		timeLeft,
		onChangePhoneNumber,
		onVerificate,
		state,
		onStateChange,
		loading,
		resendCode,
	};
};

export default useVerificationHook;
