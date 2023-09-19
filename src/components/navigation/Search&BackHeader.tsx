import { LeftArrow, SearchIcon } from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import { REGULAR_FONT_FAMILY } from "@novomarkt/constants/fonts";
import { ROUTES } from "@novomarkt/constants/routes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
	Platform,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

interface SearchProps {
	autoFocus?: boolean;
	onChange?: (valyu: string) => void;
}

const SearchBackHeader = ({ autoFocus, onChange }: SearchProps) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.goBack}
			>
				<LeftArrow />
			</TouchableOpacity>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder={STRINGS.searching}
					placeholderTextColor={COLORS.whiteGray}
					autoFocus={autoFocus}
					autoCorrect={false}
					onChangeText={onChange}
					onFocus={() => {
						navigation.navigate(ROUTES.SEARCH as never);
					}}
				/>
				<SearchIcon fill={COLORS.whiteGray} />
			</View>
		</View>
	);
};

export default SearchBackHeader;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		width: "100%",
	},
	inputContainer: {
		flex: 1,
		borderRadius: 8,
		marginVertical: 10,
		marginRight: 10,
		paddingHorizontal: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: COLORS.lightGray,
		color: COLORS.whiteGray,
		width: "90%",
		paddingRight: 10,
	},
	input: {
		paddingVertical: Platform.OS == "android" ? 10 : 12,
		fontFamily: REGULAR_FONT_FAMILY,
		width: "90%",
		color: COLORS.textColor,
	},
	goBack: { width: "10%", marginLeft: 15 },
});
