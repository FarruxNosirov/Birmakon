import { COLORS } from "@novomarkt/constants/colors";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";

const LoadingModal = () => {
	return (
		<View style={styles.animation}>
			<View style={styles.loadingModal}>
				<View style={styles.loadingImage}>
					<Image
						source={require("@novomarkt/assets/images/ic_launcher.png")}
						style={styles.image}
					/>
				</View>
			</View>
			<ActivityIndicator size="large" color="#0000ff" />
		</View>
	);
};

export default LoadingModal;
const styles = StyleSheet.create({
	animation: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: COLORS.white,
	},
	loadingModal: {
		width: 250,
		height: 250,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: COLORS.white,
	},
	loadingImage: {
		width: 170,
		height: 170,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 50,
	},
	image: {
		width: "100%",
		height: "100%",
		resizeMode: "contain",
	},
});
