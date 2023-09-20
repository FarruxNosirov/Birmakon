import ProductItem from "@novomarkt/screens/tabs/home/components/ProductItem";
import React from "react";
import { FlatList, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import SearchBackHeader from "../navigation/Search&BackHeader";
import { useSearchHook } from "./hooks";
import { styles } from "./styles";
const Search = () => {
	let { result, onStateChange, loading } = useSearchHook();
	const renderList = () => (
		<FlatList
			numColumns={2}
			data={result}
			showsHorizontalScrollIndicator={false}
			showsVerticalScrollIndicator={false}
			renderItem={(props: any) => <ProductItem {...props} />}
			contentContainerStyle={styles.contentContainerStyle}
			ListFooterComponent={<View style={styles.footer} />}
		/>
	);

	return (
		<View style={styles.container}>
			<SearchBackHeader onChange={onStateChange("text")} />
			{loading ? <Spinner visible={loading} /> : renderList()}
		</View>
	);
};

export default Search;
