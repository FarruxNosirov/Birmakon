/* eslint-disable quotes */
import { COLORS } from "@novomarkt/constants/colors";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import React from "react";
import {
	StyleProp,
	StyleSheet,
	TextInput,
	TextStyle,
	View,
	ViewStyle,
} from "react-native";
import Text from "./Text";

export interface DefaultInputProps {
	title?: string;
	autoFocus?: boolean;
	placeholder?: string;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	textContentType?: any;
	secureText?: boolean | undefined;
	onChange?: (val: string) => void;
	value?: string;
	onFocus?: () => void;
	keyboardType?: any;
}

const DefaultInput = ({
	placeholder,
	title,
	titleStyle,
	containerStyle,
	inputStyle,
	textContentType,
	secureText,
	onChange,
	value,
	keyboardType,
	autoFocus,
	onFocus,
}: DefaultInputProps) => {
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={[styles.title, titleStyle]}>{title}</Text>
			<TextInput
				textContentType={textContentType}
				secureTextEntry={secureText}
				style={[inputStyle ? inputStyle : styles.input]}
				placeholder={placeholder}
				placeholderTextColor={COLORS.gray}
				onChangeText={onChange}
				value={value}
				keyboardType={keyboardType}
				autoFocus={autoFocus}
				onFocus={onFocus}
			/>
		</View>
	);
};

export default DefaultInput;

const styles = StyleSheet.create({
	title: {
		color: COLORS.defaultBlack,
		fontSize: 14,
		marginBottom: 8,
	},
	input: {
		borderColor: COLORS.darkBorder,
		borderWidth: 1,
		borderRadius: 8,
		width: WINDOW_WIDTH - 80,
		fontFamily: "Montserrat-Medium",
		color: COLORS.defaultBlack,
		paddingHorizontal: 9,
	},
	container: {
		alignSelf: "center",
		marginBottom: 10,
	},
});
