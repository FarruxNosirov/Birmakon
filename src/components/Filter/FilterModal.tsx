import { NewTopArrowIcon } from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type Props = {
	onPress: () => any;
	children: React.ReactNode;
	active: boolean;
	title?: any;
	activeBorder?: boolean;
};

const FilterModal = (props: Props) => {
	return (
		<View
			style={[styles.box, { borderBottomWidth: props.activeBorder ? 1 : 0 }]}
		>
			<TouchableOpacity onPress={props.onPress} style={styles.box_active}>
				<Text style={styles.active_title}>{props?.title}</Text>
				<View style={styles.icon_box}>
					<NewTopArrowIcon
						rotateValue={props.active ? "0deg" : "180deg"}
						color={COLORS.red}
					/>
				</View>
			</TouchableOpacity>
			<View>{props.children}</View>
		</View>
	);
};

export default FilterModal;

const styles = StyleSheet.create({
	box: {
		marginLeft: 15,
		marginRight: 15,
		borderBottomColor: "#71717119",
		paddingBottom: 5,

		backgroundColor: COLORS.white,
	},
	box_active: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		zIndex: 4,
	},
	active_title: {
		fontWeight: "700",
		fontSize: 17,
		lineHeight: 40,
		color: COLORS.black,
	},
	icon_box: {
		width: 40,
		height: 20,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
});
