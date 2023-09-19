import DefaultButton from "@novomarkt/components/general/DefaultButton";
import DefaultInput from "@novomarkt/components/general/DefaultInput";
import Text from "@novomarkt/components/general/Text";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import { Image, View } from "react-native";
import { ResendHook } from "./hooks";
import { styles } from "./styles";

const ForgotPassView = () => {
	let { onChange, OnPress, error, loading, state } = ResendHook();

	return (
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
				<View style={styles.margin}>
					<Text style={styles.header}>{STRINGS.problemActivation}</Text>
					<Text style={styles.title}>{STRINGS.forgotPassword}</Text>
					<DefaultInput
						containerStyle={styles.input}
						placeholder={STRINGS.yourNumber}
						onChange={onChange}
						value={state.phone}
						keyboardType="phone-pad"
						onFocus={() => {
							if (state.phone === "") {
								onChange("+998");
							}
						}}
					/>
					{error ? <Text style={styles.error}>{error}</Text> : null}
					<DefaultButton
						textStyle={styles.buttonTxt}
						text={STRINGS.continue}
						containerStyle={styles.button}
						onPress={OnPress}
						loading={loading}
					/>
				</View>
			</View>
		</View>
	);
};

export default ForgotPassView;
