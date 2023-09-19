import { DeliveryIcon } from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchProps {
	autoFocus?: boolean;
	onChange?: () => void;
}

const SearchHeader = ({ autoFocus, onChange }: SearchProps) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View
				style={[styles.searchInputBox, { width: autoFocus ? "85%" : "100%" }]}
			>
				<TextInput
					style={styles.searchInput}
					placeholder={STRINGS.searching}
					placeholderTextColor={COLORS.textColor}
					autoFocus={false}
					autoCorrect={false}
					onChangeText={onChange}
					onPressIn={() => navigation.navigate(ROUTES.SEARCH as never)}
				/>
			</View>
			{autoFocus ? (
				<View style={styles.NotificationBox}>
					<TouchableOpacity
						onPress={() => navigation.navigate(ROUTES.DELIVERY as never)}
					>
						<DeliveryIcon
							fill={COLORS.whiteGray}
							style={{ width: 120, height: 120 }}
						/>
					</TouchableOpacity>
				</View>
			) : null}
		</View>
	);
};

export default SearchHeader;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		marginBottom: 10,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	searchInputBox: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.lightGray,
		height: 50,
		borderRadius: 8,
		paddingHorizontal: 15,
	},
	searchInput: {
		fontSize: 16,
		width: "90%",
		borderRadius: 8,
		height: "100%",
		color: COLORS.textColor,
	},
	NotificationBox: {
		width: 50,
		height: 50,
		// backgroundColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
	},
});
