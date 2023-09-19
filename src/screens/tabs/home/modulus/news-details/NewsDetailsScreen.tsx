import { appendUrl } from "@novomarkt/api/requests";
import Text from "@novomarkt/components/general/Text";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { useNewsPageHooks } from "./hooks";
import { styles } from "./styles";
import RenderHTML from "react-native-render-html";
import { COLORS } from "@novomarkt/constants/colors";
const width = Dimensions.get("window").width;
const NewsDetailsScreen = () => {
	let { item } = useNewsPageHooks();
	const mixedStyle = {
		body: {
			whiteSpace: "normal",
			color: COLORS.textColor,
		},
		p: {
			color: COLORS.textColor,
		},
		h1: {
			color: COLORS.textColor,
		},
		h2: {
			color: COLORS.textColor,
		},
	};

	return (
		<View style={styles.container}>
			<BackHeader name={STRINGS.back} style={styles.header} />

			<ScrollView showsVerticalScrollIndicator={true}>
				<Image source={{ uri: appendUrl(item.photo) }} style={styles.image} />

				<View style={styles.contantBox}>
					<Text style={styles.name}>{item?.name}</Text>
					<RenderHTML
						contentWidth={width}
						source={{
							html: `
					${item?.description_mini}`,
						}}
						tagsStyles={mixedStyle}
					/>
				</View>
			</ScrollView>
		</View>
	);
};

export default NewsDetailsScreen;
