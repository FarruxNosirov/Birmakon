import Text from "@novomarkt/components/general/Text";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import { ScrollView, View } from "react-native";
import HandlingTextBox from "./components/HandlingTextBox";
import QuestionBox from "./components/QuestionBox";
import { styles } from "./style";
import { COLORS } from "@novomarkt/constants/colors";

const QuestionsView = () => {
	return (
		<View style={{ flex: 1, backgroundColor: COLORS.white }}>
			<BackHeader name={STRINGS.faq} style={styles.header} />
			<ScrollView style={styles.container}>
				<Text style={styles.headerTxt}>Часто задаемевые вопросы</Text>
				<HandlingTextBox />
				<QuestionBox title={"У вас есть вопросы?"} button={"Отправить отзыв"} />
			</ScrollView>
		</View>
	);
};

export default QuestionsView;
