/* eslint-disable react-native/no-inline-styles */
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import DefaultInput from "@novomarkt/components/general/DefaultInput";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import Text from "../../../components/general/Text";
import useVerificationHook from "./hooks";
import { styles } from "./styles";

const VerificationView = () => {
	let {
		timeLeft,
		onChangePhoneNumber,
		state,
		onStateChange,
		onVerificate,
		loading,
		resendCode,
	} = useVerificationHook();

	return (
		<View style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 70 : -150}
			>
				<ScrollView contentContainerStyle={styles?.scrolContainer}>
					<View style={styles.container}>
						<Image
							style={{
								width: 320,
								height: 60,
								marginHorizontal: 30,
								marginBottom: 10,
								justifyContent: "center",
							}}
							source={require("../../../assets/images/Logo.png")}
						/>
						<View style={styles.inputBox}>
							<View style={styles.textView}>
								<Text style={styles.endText}>
									Мы отправили код на{" "}
									<Text style={styles.txt}>{state.phone}</Text> номер
								</Text>
								<TouchableOpacity onPress={onChangePhoneNumber}>
									<Text style={styles.blueEnd}>Изменить номер</Text>
								</TouchableOpacity>
							</View>
							<DefaultInput
								containerStyle={styles.input}
								title={STRINGS.code}
								placeholder={STRINGS.yourCode}
								titleStyle={styles.title}
								onChange={onStateChange("code")}
								value={state.code}
							/>
							{timeLeft > 0 && <Text style={styles.timer}>-{timeLeft}</Text>}

							<DefaultButton
								text={STRINGS.resend}
								containerStyle={styles.btn}
								textStyle={styles.buttonTxt}
								secondary={timeLeft !== 0}
								onPress={resendCode}
							/>
							<DefaultButton
								text={STRINGS.registration}
								textStyle={styles.buttonTxt}
								containerStyle={styles.defButton}
								loading={loading}
								onPress={onVerificate}
							/>
							<TouchableOpacity onPress={onChangePhoneNumber}>
								<Text style={styles.end}>Уже зарегистрирован?</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</View>
	);
};

export default VerificationView;
