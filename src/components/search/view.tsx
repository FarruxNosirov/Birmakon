import ProductItem from "@novomarkt/screens/tabs/home/components/ProductItem";
import React from "react";
import {
	FlatList,
	View,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import SearchBackHeader from "../navigation/Search&BackHeader";
import { useSearchHook } from "./hooks";
import { styles } from "./styles";
import Spinner from "react-native-loading-spinner-overlay";
const Search = () => {
	let { result, onStateChange, loading } = useSearchHook();

	return (
		<View style={styles.container}>
			<SearchBackHeader autoFocus={true} onChange={onStateChange("text")} />
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "padding"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : -150}
			>
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<FlatList
						numColumns={2}
						data={result}
						showsHorizontalScrollIndicator={false}
						showsVerticalScrollIndicator={false}
						renderItem={(props: any) => <ProductItem {...props} />}
						contentContainerStyle={styles.contentContainerStyle}
						ListFooterComponent={<View style={styles.footer} />}
					/>
				</ScrollView>
			</KeyboardAvoidingView>
			<Spinner visible={loading} />
		</View>
	);
};

export default Search;
