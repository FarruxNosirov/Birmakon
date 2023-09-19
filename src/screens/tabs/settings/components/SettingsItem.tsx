import { COLORS } from "@novomarkt/constants/colors";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SvgProps } from "react-native-svg";

export interface SettingsItemProps {
	icon?: (props: SvgProps) => JSX.Element;
	text?: string;
	onPress?: any;
	focus?: boolean;
}

const SettingsItem = ({ icon: Icon, text, onPress }: SettingsItemProps) => {
	const [onActive, setOnActive] = useState(false);

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				onPress();
			}}
		>
			<View style={[styles.container, { backgroundColor: COLORS.white }]}>
				<View style={styles.icon}>{Icon ? <Icon /> : null}</View>
				<Text style={styles.text}>{text}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default SettingsItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: "rgba(113, 113, 113, 0.3)",
		paddingVertical: 12,
		// backgroundColor: "#131E3D",
	},

	text: {
		marginLeft: 10,
		color: COLORS.defaultBlack,
		fontSize: 16,
	},

	icon: {
		width: 30,
	},
});
