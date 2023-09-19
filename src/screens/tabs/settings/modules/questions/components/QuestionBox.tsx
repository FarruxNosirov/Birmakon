import requests from "@novomarkt/api/requests";
import { SendQuestionValue } from "@novomarkt/api/types";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import React, { useState } from "react";
import { Alert, Platform, StyleSheet, TextInput, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";

export interface QuestionBoxProps {
	title?: string;
	button?: string;
}

const QuestionBox = ({ title, button }: QuestionBoxProps) => {
	const [question, setQuestion] = useState<SendQuestionValue>();
	const [loading, setLoading] = useState(false);
	const onSubmit = async () => {
		setLoading(true);
		try {
			let res = await requests.frequentQuestions.sendQuestion({
				name: question?.name as string,
				email: question?.email as string,
				message: question?.message as string,
			});
			let data = res.data.data;
			!!data && Alert.alert("", `Спасибо, ваше письмо успешно отправлено`);
			// console.log(JSON.stringify(res.data.data, null, 2));
			console.log("success");
			setQuestion({});
		} catch (error) {
			alert("errroooor");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<View style={{ backgroundColor: COLORS.white }}>
			<Spinner visible={loading} />
			<View style={styles.footer}>
				<Text style={styles.footerTxt}>{title ? title : ""}</Text>
				<TextInput
					style={styles.input}
					placeholder={"Ваше имя"}
					placeholderTextColor={COLORS.gray}
					value={question?.name}
					onChangeText={(e) => {
						setQuestion({ ...question, name: e });
					}}
				/>
				<TextInput
					placeholderTextColor={COLORS.gray}
					style={styles.input}
					keyboardType="email-address"
					placeholder={"Ваш  e-mail"}
					value={question?.email}
					onChangeText={(e) => {
						setQuestion({ ...question, email: e });
					}}
				/>
				<TextInput
					style={styles.bigger}
					placeholder={"Ваш отзыв"}
					placeholderTextColor={COLORS.gray}
					value={question?.message}
					onChangeText={(e) => {
						setQuestion({ ...question, message: e });
					}}
				/>
				<DefaultButton
					textStyle={styles.text}
					containerStyle={styles.button}
					text={button}
					onPress={onSubmit}
				/>
			</View>
		</View>
	);
};

export default QuestionBox;

const styles = StyleSheet.create({
	footer: {
		backgroundColor: "rgba(238, 73, 39, 0.50)",
		marginHorizontal: 15,
		borderRadius: 10,
		padding: 15,
		marginBottom: 40,
		marginTop: 20,
	},

	footerTxt: {
		color: COLORS.white,
		fontSize: 20,
		marginBottom: 15,
		fontWeight: "700",
	},

	input: {
		marginBottom: 15,
		backgroundColor: COLORS.white,
		borderRadius: 8,
		paddingHorizontal: 15,
		paddingVertical: Platform.OS == "android" ? 10 : 15,
		fontStyle: "italic",
	},

	bigger: {
		backgroundColor: COLORS.white,
		borderRadius: 8,
		paddingHorizontal: 15,
		paddingVertical: Platform.OS == "android" ? 10 : 15,
		paddingBottom: 60,
		fontStyle: "italic",
	},

	button: {
		padding: 0,
		marginTop: 30,
		marginBottom: 10,
		marginHorizontal: 0,
		paddingHorizontal: 15,
		alignSelf: "center",
		width: "100%",
	},

	text: {
		fontSize: 15,
	},
});
