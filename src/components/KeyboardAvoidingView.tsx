import React from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
} from "react-native";

const KeyboardAvoiding = ({ children }: any) => {
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
		>
			<ScrollView contentContainerStyle={styles.scrolContainer}>
				{children}
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default KeyboardAvoiding;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	scrolContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
