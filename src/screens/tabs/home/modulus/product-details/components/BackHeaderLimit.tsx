import { GroupIcon, LeftArrowIcon } from "@novomarkt/assets/icons/icons";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { useAppSelector } from "@novomarkt/store/hooks";
import { selectUser } from "@novomarkt/store/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export interface BackHeaderLimitType {
	image?: string;
	content?: string;
	date?: string;
	name?: string;
	id?: Number;
	detailIdValue?: any;
}

const BackHeaderLimit: FC<BackHeaderLimitType> = ({
	name,
	id,
	detailIdValue,
}) => {
	let navigation = useNavigation();
	const userToken = useAppSelector(selectUser);
	return (
		<View style={styles.row}>
			<TouchableOpacity onPress={navigation.goBack}>
				<LeftArrowIcon
					style={{ width: 120, height: 120 }}
					hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
				/>
			</TouchableOpacity>
			<Text style={styles.logoText}>{name ? name : ""}</Text>
			{detailIdValue?.shop && userToken.token ? (
				<TouchableOpacity
					onPress={() =>
						navigation.navigate(
							//@ts-ignore
							ROUTES.CHATPRODUCTS as never,
							{
								idShop: detailIdValue?.shop?.id,
								idProduct: detailIdValue.id,
							} as never
						)
					}
				>
					<GroupIcon style={{ width: 120, height: 120 }} />
				</TouchableOpacity>
			) : null}
		</View>
	);
};

export default BackHeaderLimit;

const styles = StyleSheet.create({
	row: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderColor: COLORS.whiteGray,
		backgroundColor: COLORS.white,
		marginTop: 20,
	},
	heart: {
		marginRight: 20,
	},
	logoText: {
		color: COLORS.defaultBlack,
		fontWeight: "500",
		fontSize: 20,
	},
});
