import { useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import WebView from "react-native-webview";

const WebViewComponets = () => {
	const { params } = useRoute<any>();
	const [loading, setLoading] = useState(false);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<WebView
				source={{ uri: params }}
				onLoadStart={() => setLoading(true)}
				onLoadEnd={() => setLoading(false)}
			/>
			<Spinner visible={loading} />
		</SafeAreaView>
	);
};

export default WebViewComponets;
