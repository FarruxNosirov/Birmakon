import { useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
	ActivityIndicator,
	FlatList,
	Modal,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import ProductsItem from "./ProductsItem";
import { ProductItemResponse } from "@novomarkt/api/types";
import requests from "@novomarkt/api/requests";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import LoadingModal from "@novomarkt/components/LoadingModal/LoadingModal";
import { COLORS } from "@novomarkt/constants/colors";
import SortAndFilter from "@novomarkt/components/SortAndFilter";
import SortView from "@novomarkt/components/SortView";
import FilterScren from "@novomarkt/components/Filter/FilterScreen";

const CatalogProductsScreen = () => {
	let {
		params: { id, name },
	}: any = useRoute();
	const [products, setProducts] = useState<ProductItemResponse[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalFilter, setModalFilter] = useState("");
	const [modalSort, setModalSort] = useState("");
	const [newValyu, setNewValyu] = useState<ProductItemResponse[]>([]);
	const [newQueryProps, setNewQueryProp] = useState();
	const [skip, setSkip] = useState(1);
	const [skipNew, setSkipNew] = useState(1);
	const [isMore, setIsMore] = useState(true);
	const [isMoreNew, setIsMoreNew] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [pageSize, setPageSize] = useState(1);
	const [pageNewSize, setPageNewSize] = useState(1);
	const [subCategoriyaId, setSubCategoriyaId] = useState<number>(0);

	const didMount = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await requests.products.getProductsWithID(id, 1);
			const date = res.data.data;
			setProducts(date);
			setPageSize(res.data._meta.pageCount);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		didMount();
	}, [didMount]);

	const loadMore = useCallback(async () => {
		setIsMore(false);
		const pageCount = skip + 1;
		if (pageSize < pageCount) {
			return;
		}
		try {
			const res = await requests.products.getProductsWithID(id, pageCount);
			const data = res.data.data;
			setProducts((a) => [...a, ...data]);
			setSkip(pageCount);
		} catch (error) {
			console.log(error);
		} finally {
			setIsMore(true);
		}
	}, [id, pageSize, skip]);

	const filterNewHandler = useCallback(async () => {
		setIsLoading(true);
		try {
			let res = await requests.filter.productFilter2(
				subCategoriyaId,
				1,
				newQueryProps
			);
			setNewValyu(res.data.data);
			setPageNewSize(res.data._meta.pageCount);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, [newQueryProps, subCategoriyaId]);

	useEffect(() => {
		filterNewHandler();
	}, [filterNewHandler]);

	const loadMoreFilter = useCallback(async () => {
		setIsMoreNew(false);
		const pageCount = skipNew + 1;
		if (pageNewSize < pageCount) {
			return;
		}
		try {
			const res = await requests.filter.productFilter2(
				subCategoriyaId,
				pageCount,
				newQueryProps
			);
			let data = res.data.data;
			setNewValyu((a) => [...a, ...data]);
			setSkipNew(pageCount);
			setIsMoreNew(true);
		} catch (error) {
			console.log(error);
		}
	}, [newQueryProps, pageNewSize, skipNew, subCategoriyaId]);

	const NewPriceData = [...newValyu];
	const myArray = NewPriceData.filter((item) => item.price !== 0);
	const filterValue = subCategoriyaId > 0;
	const newProductsDate = [...products];
	const sortNewProductsDate = newProductsDate.filter(
		(item) => item.price !== 0
	);

	const renderList = () => {
		return (
			<FlatList
				showsVerticalScrollIndicator={false}
				data={filterValue ? myArray : sortNewProductsDate}
				numColumns={2}
				contentContainerStyle={styles.contentContainerStyle}
				onEndReachedThreshold={0.5}
				windowSize={3}
				updateCellsBatchingPeriod={100}
				maxToRenderPerBatch={1}
				initialNumToRender={1}
				renderItem={({ item }) => (
					<ProductsItem {...item} modalSort={modalSort} />
				)}
				keyExtractor={(item, index) => index.toLocaleString()}
				ListEmptyComponent={
					<Text style={styles.notValue}>Нет результатов</Text>
				}
				onEndReached={() => {
					if (isMore && !filterValue) {
						loadMore();
					}
					if (isMoreNew && filterValue) {
						loadMoreFilter();
					}
				}}
				ListFooterComponent={
					<>
						{isMore && pageSize > 0 && !filterValue && !isLoading ? (
							<View style={{ alignItems: "center" }}>
								<ActivityIndicator size="large" color="#0000ff" />
							</View>
						) : null}
						{isMoreNew && pageNewSize > 0 && filterValue && !isLoading ? (
							<View style={{ alignItems: "center" }}>
								<ActivityIndicator size="large" color="#0000ff" />
							</View>
						) : null}
					</>
				}
			/>
		);
	};

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.container}>
				<View style={{ marginBottom: 5 }}>
					<BackHeader name={name} />
					<SortAndFilter
						setModalVisible={setModalVisible}
						setModalFilter={setModalFilter}
						setModalSort={modalSort}
						isFilter={true}
						isSort={false}
					/>
				</View>

				{isLoading ? <LoadingModal /> : renderList()}
			</View>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}
			>
				{modalFilter === "Сортировать" ? (
					<SortView
						setModalVisible={setModalVisible}
						setModalSort={setModalSort}
						modalSort={""}
					/>
				) : (
					<FilterScren
						setModalVisible={setModalVisible}
						filter={id}
						setNewQueryProps={setNewQueryProp}
						subCateName={name}
						setSubCategoriyaId={setSubCategoriyaId}
					/>
				)}
			</Modal>
		</SafeAreaView>
	);
};

export default CatalogProductsScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.white,
		width: "100%",
		height: "100%",
	},
	render_container: {
		position: "relative",
		width: "100%",
		marginTop: 29,
		flexWrap: "wrap",
		flexDirection: "row",
	},
	contentContainerStyle: {
		paddingHorizontal: 10,
		flexDirection: "column",
		paddingTop: 10,
	},
	notValue: {
		textAlign: "center",
		color: COLORS.red,
		marginTop: 100,
	},
});
