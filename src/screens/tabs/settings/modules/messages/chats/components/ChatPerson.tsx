import { ChatIcon } from "@novomarkt/assets/icons/icons";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const ChatPersonComponent = () => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			style={styles.row}
			onPress={() => navigation.navigate(ROUTES.SHOPVIEW as never)}
		>
			<View style={styles.round}>
				<ChatIcon fill={"#000"} />
			</View>
			<Text style={styles.text}>Сlozzone</Text>
		</TouchableOpacity>
	);
};

export default ChatPersonComponent;

const styles = StyleSheet.create({
	row: {
		paddingVertical: 7,
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		paddingHorizontal: 10,
		borderColor: COLORS.whiteGray,
	},

	round: {
		padding: 15,
		borderRadius: 25,
		backgroundColor: COLORS.lightPurple,
	},

	text: {
		fontSize: 17,
		marginHorizontal: 10,
		color: COLORS.defaultBlack,
	},
});
