import Text from "@novomarkt/components/general/Text";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { STRINGS } from "@novomarkt/locales/strings";
import React from "react";
import { ScrollView, View } from "react-native";
import Products from "./components/Products";
import ProductsListFav from "./components/ProductsListFav";

import Spinner from "react-native-loading-spinner-overlay";
import { useFavoritesHook } from "./hooks";
import { styles } from "./style";

const FavoriteView = () => {
	let { favorites, loading } = useFavoritesHook();
	if (favorites?.length === 0) {
		return (
			<View style={styles.empty}>
				<BackHeader name={STRINGS.favorites} />
				<View style={styles.emptyBox}>
					<Text style={styles.emptyText}>{STRINGS.favoritesIsEmpty}</Text>
				</View>
			</View>
		);
	}

	return (
		<>
			<BackHeader name={STRINGS.favorites} />
			<ScrollView style={styles.container}>
				{/* <SelectableMenu /> */}
				{/* <SelectableItems onPress={toggleModal} headerText={modalText} /> */}
				{favorites?.map((item, index) => (
					<Products item={item} key={index} />
				))}

				<Text style={styles.text}>{STRINGS.advertBlock}</Text>
				<ProductsListFav />
				{/* <Modal
					style={styles.view}
					isVisible={isModalVisible}
					onSwipeComplete={toggleModal}
					onBackdropPress={toggleModal}
					swipeDirection={["up", "left", "right", "down"]}
				>
					<View style={styles.modal}>
						<TouchableOpacity onPress={toggleModal}>
							<Text style={styles.modalText}>{STRINGS.recentlyAdded}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleModal}>
							<Text style={styles.modalText}>{STRINGS.popular}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleModal}>
							<Text style={styles.modalText}>{STRINGS.firstCheap}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleModal}>
							<Text style={styles.modalText}>{STRINGS.firsExpensive}</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={toggleModal}>
							<Text style={styles.modalText}>{STRINGS.newAdded}</Text>
						</TouchableOpacity>
					</View>
				</Modal> */}
				<Spinner visible={loading} />
			</ScrollView>
		</>
	);
};

export default FavoriteView;
