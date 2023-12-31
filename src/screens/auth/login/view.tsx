import DefaultButton from "@novomarkt/components/general/DefaultButton";
import DefaultInput from "@novomarkt/components/general/DefaultInput";
import DefaultInputEye from "@novomarkt/components/general/DefaultInputEye";
import Text from "@novomarkt/components/general/Text";
import { STRINGS } from "@novomarkt/locales/strings";
import { toggleLoading } from "@novomarkt/store/slices/appSettings";
import React, { useEffect } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import { useDispatch } from "react-redux";
import useLoginHook from "./hooks";
import { styles } from "./style";
import KeyboardAvoiding from "@novomarkt/components/KeyboardAvoidingView";

const LoginView = () => {
	let {
		loading,
		onStateChange,
		onLogin,
		state,
		onLoginNavigation,
		onForgotPassNavigation,
		error,
	} = useLoginHook();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(toggleLoading(false));
	}, []);

	return (
		<View style={styles.onceView}>
			<KeyboardAvoiding>
				<View style={styles.container}>
					<Image
						style={styles.image}
						source={require("../../../assets/images/Logo.png")}
					/>
					<View style={styles.inputBox}>
						<DefaultInput
							containerStyle={styles.input}
							title={STRINGS.number}
							placeholder={STRINGS.yourNumber}
							onChange={onStateChange("phone")}
							value={state.phone}
							keyboardType="phone-pad"
							onFocus={() => {
								if (state.phone === "") {
									onStateChange("phone")("+998");
								}
							}}
						/>
						<DefaultInputEye
							containerStyle={styles.input}
							title={STRINGS.password}
							placeholder={STRINGS.yourPassword}
							textContentType={"password"}
							secureText={false}
							onChange={onStateChange("password")}
							value={state.password}
						/>
						{error ? (
							<Text style={styles.error}>
								Имя пользователя и/или пароль неверны
							</Text>
						) : null}
						<DefaultButton
							textStyle={styles.buttonTxt}
							text={STRINGS.auth}
							onPress={onLogin}
							loading={loading}
							containerStyle={styles.button}
						/>
						<View style={styles.rowText}>
							<TouchableOpacity
								onPress={onForgotPassNavigation}
								hitSlop={{ left: 20, right: 20, bottom: 20, top: 20 }}
							>
								<Text style={styles.blueText}>Забыли пароль?</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={onLoginNavigation}
								hitSlop={{ left: 20, right: 20, bottom: 20, top: 20 }}
							>
								<Text style={styles.askText}>Нет учетной записи?</Text>
							</TouchableOpacity>
						</View>
						<DefaultButton
							textStyle={styles.buttonTxt}
							text={STRINGS.registration}
							onPress={onLoginNavigation}
							containerStyle={styles.button}
						/>
					</View>
				</View>
			</KeyboardAvoiding>
		</View>
	);
};

export default LoginView;
