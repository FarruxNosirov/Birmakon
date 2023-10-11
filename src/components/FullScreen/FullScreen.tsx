/* eslint-disable quotes */
import { assetUrl } from "@novomarkt/api/requests";
import { CloseIcon } from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import {
	Dimensions,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import ImageViewer from "react-native-image-zoom-viewer";
import Spinner from "react-native-loading-spinner-overlay/lib";

const { height, width } = Dimensions.get("window");

const FullScreen = () => {
	const navigation = useNavigation();
	const route = useRoute<any>();
	const params = route?.params;

	const { uri = [] } = params;
	const loading = uri ? false : true;

	const imgList = useMemo(() => {
		const neeList = uri.map((u: string) => ({
			url: assetUrl + u,
		}));

		return neeList;
	}, [uri]);

	const renderImage = () => {
		if (!uri) {
			return <View />;
		}

		return (
			<View style={styles.renderImage}>
				<ImageViewer
					style={styles.imageWrapper}
					imageUrls={imgList}
					enableSwipeDown={false}
					enableImageZoom={true}
					saveToLocalByLongPress={false}
					pageAnimateTime={300}
					enablePreload={true}
				/>
			</View>
		);
	};

	return (
		<View style={styles.mediaPlayer}>
			<TouchableOpacity
				style={styles.closeIcon}
				onPress={() => {
					navigation.goBack();
				}}
			>
				<CloseIcon fill={COLORS.white} />
			</TouchableOpacity>

			<View style={styles.renderImageBox}>{renderImage()}</View>

			<Spinner visible={loading} textContent={""} textStyle={{}} />
		</View>
	);
};

export default FullScreen;

const styles = StyleSheet.create({
	mediaPlayer: { flex: 1, backgroundColor: COLORS.black },
	closeIcon: {
		position: "absolute",
		top: Platform.OS === "ios" ? 50 : 42,
		right: 15,
		fontSize: 24,
		padding: 1,
		color: "#fff",
		zIndex: 10,
	},

	container: {
		position: "relative",
		flex: 1,
	},
	imageWrapper: {
		height: width,
		width: width,
	},
	renderImageBox: { borderWidth: 2, zIndex: 1, height: height / 1.1 },
	renderImage: {
		height: height,
		alignItems: "center",
		alignContent: "center",
		justifyContent: "center",
	},
});
