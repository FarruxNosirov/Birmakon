import requests from "@novomarkt/api/requests";
import SearchHeader from "@novomarkt/components/navigation/SearchHeader";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import CategoryItem from "./components/CategoryItem";
import { styles } from "./style";

import LoadingModal from "@novomarkt/components/LoadingModal/LoadingModal";
import Text from "@novomarkt/components/general/Text";

const CatalogView = () => {
	const [categories, setCategories] = useState([]);
	const [loading, setLaoding] = useState(false);
	let effect = async () => {
		setLaoding(true);
		try {
			let res = await requests.categories.getCategories();
			setCategories(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLaoding(false);
		}
	};
	useEffect(() => {
		effect();
	}, []);
	if (loading) {
		return <LoadingModal />;
	}

	return (
		<View style={styles.container}>
			<SearchHeader />
			<FlatList
				data={categories}
				renderItem={(props) => <CategoryItem {...props} />}
				numColumns={2}
				contentContainerStyle={styles.flatLest}
				keyExtractor={(item: any) => item.id}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<Text>Нет результатов</Text>}
			/>
		</View>
	);
};

export default CatalogView;
