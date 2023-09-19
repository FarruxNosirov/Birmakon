import requests from "@novomarkt/api/requests";
import { QuestionsResponse } from "@novomarkt/api/types";
import { PlayIcon } from "@novomarkt/assets/icons/icons";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import RenderHTML from "react-native-render-html";
const width = Dimensions.get("window").width;

const HandlingTextBox = () => {
	const [shouldShow, setShouldShow] = useState(0);
	const [questions, setQuestions] = useState<QuestionsResponse[]>();
	const [shouldShowID, setShouldShowID] = useState(false);
	let effect = async () => {
		try {
			let res = await requests.frequentQuestions.getQuestions();
			setQuestions(res.data.data);
		} catch (error) {}
	};
	useEffect(() => {
		effect();
	}, []);
	const mixedStyle = {
		body: {
			whiteSpace: "normal",
			color: COLORS.textColor,
			padding: 0,
			margin: 0,
		},
		p: {
			color: COLORS.textColor,
			padding: 0,
			margin: 0,
		},
		h1: {
			color: COLORS.textColor,
			padding: 0,
			margin: 0,
		},
		h2: {
			color: COLORS.textColor,
			padding: 0,
			margin: 0,
		},
	};
	return (
		<View style={styles.container}>
			{questions?.map((e, i) => {
				return (
					<View style={styles.containerView} key={i}>
						<TouchableOpacity
							style={styles.row}
							onPress={() => {
								setShouldShow(i);
								setShouldShowID((a) => !a);
							}}
						>
							<PlayIcon fill={COLORS.white} />
							<View style={styles.titleBox}>
								<RenderHTML
									contentWidth={width}
									source={{
										html: `
                                     ${e?.question}`,
									}}
									baseStyle={styles.messege_HtmlText}
									tagsStyles={mixedStyle}
								/>
							</View>
						</TouchableOpacity>
						<View style={{ marginVertical: 10 }}>
							{shouldShow === i && shouldShowID ? (
								<RenderHTML
									contentWidth={width}
									source={{
										html: `
                                     ${e?.answer}`,
									}}
									baseStyle={styles.messege_HtmlText}
									tagsStyles={mixedStyle}
								/>
							) : null}
						</View>
					</View>
				);
			})}
		</View>
	);
};

export default HandlingTextBox;

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		marginHorizontal: 15,
		marginVertical: 10,
	},
	containerView: {},
	row: {
		flexDirection: "row",
		alignItems: "center",
	},

	text1: {
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.black,
		marginLeft: 10,
		alignItems: "center",
		height: 25,
	},
	text: {
		color: COLORS.defaultBlack,
		fontSize: 14,
		marginLeft: 10,
		marginTop: 10,
	},

	titleBox: { width: "90%", marginLeft: 10 },
	messege_HtmlText: {
		color: COLORS.textColor,
		fontSize: 14,
		fontWeight: "normal",
		padding: 0,
		margin: 0,
	},
});
