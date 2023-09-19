import requests from "@novomarkt/api/requests";
import { ProductItemResponse } from "@novomarkt/api/types";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ProductItem from "./ProductItem";

export interface PropularProductsProps {
	title?: string;
	sort?: string;
}

export const ProductsList = ({ title, sort }: PropularProductsProps) => {
	const [products, setProducts] = useState<ProductItemResponse[]>([]);
	const getProducts = useCallback(async () => {
		try {
			let res = await requests.products.getProducts(sort, 1);
			setProducts(res.data.data);
		} catch (error) {
			console.log("productLest", error);
		}
	}, [sort]);
	useEffect(() => {
		getProducts();
	}, [getProducts]);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title ? title : ""}</Text>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={products}
				renderItem={(props) => (
					<ProductItem {...props} getProducts={getProducts} />
				)}
				style={styles.container}
				contentContainerStyle={styles.contentContainerStyle}
				keyExtractor={(item, index) => index.toString()}
			/>
		</View>
	);
};

export default ProductsList;

const styles = StyleSheet.create({
	title: {
		color: COLORS.defaultBlack,
		fontSize: 19,
		marginLeft: 15,
		marginBottom: 20,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	container: { marginBottom: 15 },
	contentContainerStyle: { paddingHorizontal: 15 },
});
