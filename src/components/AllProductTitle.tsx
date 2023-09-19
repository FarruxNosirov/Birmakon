import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

import { GestureResponderEvent } from "react-native-modal";
import { COLORS } from "@novomarkt/constants/colors";
import { CloseIcon } from "@novomarkt/assets/icons/icons";

type AllTitleType = {
	title?: string;
	color?: boolean;
	marginTop?: number;
	marginBottom?: number;
	onPress?: (event: GestureResponderEvent) => void;
};

export default function AllProductTitle(props: AllTitleType) {
	return (
		<View
			style={[
				styles.title_container,
				{ marginBottom: props.marginBottom, marginTop: props.marginTop },
			]}
		>
			{props ? (
				<Text style={[styles.title]}>{props.title}</Text>
			) : (
				<Text style={[styles.title]}>Популярные товары</Text>
			)}

			<TouchableOpacity onPress={props.onPress}>
				<CloseIcon fill={COLORS.black} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	title_container: {
		paddingHorizontal: 15,
		paddingVertical: 10,

		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 25,
		fontWeight: "700",
		lineHeight: 40,
		color: "#3F3535",
	},
});
