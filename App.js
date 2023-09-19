import AppRouter from "@novomarkt/routes/AppRouter";
import { persistor, store } from "@novomarkt/store/configureStore";
import React from "react";
import { Platform, UIManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

if (Platform.OS === "android") {
	if (UIManager.setLayoutAnimationEnabledExperimental) {
		UIManager.setLayoutAnimationEnabledExperimental(true);
	}
}

const App = () => {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AppRouter />
				</PersistGate>
			</Provider>
		</SafeAreaProvider>
	);
};

export default App;
