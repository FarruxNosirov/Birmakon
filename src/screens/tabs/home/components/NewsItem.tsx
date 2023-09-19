import { appendUrl } from "@novomarkt/api/requests";
import { NewsItemResponse } from "@novomarkt/api/types";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useNavigation } from "@react-navigation/native";
import React, { ReactElement } from "react";
import {
	Image,
	ListRenderItemInfo,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

export interface NewsItemProps {
	image: string;
	content: string;
	date: string;
	id: number;
}

const NewsItem = ({
	item,
}: ListRenderItemInfo<NewsItemResponse>): ReactElement => {
	let { date, photo, id, name } = item;
	let navigation = useNavigation();
	let [day] = date.split(" ");

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				//@ts-ignore
				navigation.navigate(ROUTES.NEWS_DETAILS, { item, id })
			}
		>
			<View style={styles.container}>
				<Image source={{ uri: appendUrl(photo) }} style={styles.image} />
				<View style={styles.content}>
					<Text style={styles.text}>
						{name.length > 80 ? name.slice(0, 80) + "..." : name}
					</Text>

					<View style={styles.row}>
						<TouchableOpacity
							style={styles.buttonContainer}
							onPress={() =>
								//@ts-ignore
								navigation.navigate(ROUTES.NEWS_DETAILS, { item, id })
							}
						>
							<Text style={styles.btnText}>{STRINGS.detailed}</Text>
						</TouchableOpacity>
						<Text style={styles.dateStyle}>{day ? day : ""}</Text>
					</View>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default NewsItem;

const styles = StyleSheet.create({
	text: {
		fontSize: 12,
		color: COLORS.defaultBlack,
		height: 65,
	},
	dateStyle: {
		color: COLORS.red,
		fontSize: 12,
		alignSelf: "flex-end",
		marginTop: 10,
	},
	buttonContainer: {
		marginTop: 0,
		marginHorizontal: 0,
		paddingVertical: 5,
		paddingHorizontal: 7,
		width: "50%",
		margin: 0,
		flexDirection: "row",
		justifyContent: "center",
		borderRadius: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4.84,
		elevation: 5,
		backgroundColor: COLORS.darkBlue4,
	},
	buttonText: {
		fontSize: 12,
	},
	row: {
		marginVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	container: {
		backgroundColor: COLORS.white,
		borderRadius: 8,
		elevation: 2,
		shadowOpacity: 0.3,
		shadowRadius: 3,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		width: WINDOW_WIDTH / 2 - 20,
		margin: 4,
		marginRight: 10,
		writingDirection: 170,
	},
	image: {
		width: "100%",
		height: 120,
		borderRadius: 8,
	},
	content: {
		padding: 8,
	},
	btnText: { color: COLORS.white, fontSize: 12, lineHeight: 24 },
});
