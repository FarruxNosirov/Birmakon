/* eslint-disable quotes */
import { EyeIcon, OpenedEyeIcon } from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import React, { useState } from "react";
import {
	StyleProp,
	StyleSheet,
	TextInput,
	TextStyle,
	TouchableOpacity,
	View,
	ViewStyle,
} from "react-native";
import Text from "./Text";

export interface DefaultInputProps {
	title?: string;
	placeholder?: string;
	titleStyle?: StyleProp<TextStyle>;
	containerStyle?: ViewStyle;
	inputStyle?: TextStyle;
	textContentType?: any;
	secureText?: boolean | undefined;
	onChange?: (val: string) => void;
	value?: string;
	keyboardType?:
		| "default"
		| "number-pad"
		| "decimal-pad"
		| "numeric"
		| "email-address"
		| "phone-pad";
}

const DefaultInputEye = ({
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
}: DefaultInputProps) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={[styles.title, titleStyle]}>{title}</Text>
			<View style={styles.eyeBox}>
				<TextInput
					textContentType={textContentType}
					secureTextEntry={isOpen === true ? secureText : !secureText}
					style={[styles.input, inputStyle]}
					placeholder={placeholder}
					placeholderTextColor={COLORS.gray}
					onChangeText={onChange}
					value={value}
					keyboardType={keyboardType}
				/>
				<TouchableOpacity
					onPress={() => setIsOpen(!isOpen)}
					hitSlop={{ left: 20, right: 20, bottom: 20, top: 20 }}
				>
					{isOpen === true ? (
						<EyeIcon fill={COLORS.gray} />
					) : (
						<OpenedEyeIcon fill={COLORS.gray} />
					)}
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default DefaultInputEye;

const styles = StyleSheet.create({
	title: {
		color: COLORS.defaultBlack,
		fontSize: 14,
		marginBottom: 8,
	},
	input: {
		width: "90%",
		fontFamily: "Montserrat-Medium",
		color: COLORS.defaultBlack,
		paddingHorizontal: 9,
	},
	container: {
		alignSelf: "center",
		marginBottom: 20,
	},

	eyeBox: {
		flexDirection: "row",
		alignItems: "center",
		borderColor: COLORS.darkBorder,
		borderWidth: 1,
		borderRadius: 8,
		width: WINDOW_WIDTH - 80,
	},
});
