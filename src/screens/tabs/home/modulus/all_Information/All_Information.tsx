import { LeftArrowIcon } from "@novomarkt/assets/icons/icons";
import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { styles } from "./styles";

const All_Information = () => {
	let navigation = useNavigation();
	let router = useRoute<any>();
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<TouchableOpacity style={styles.button} onPress={navigation.goBack}>
					<LeftArrowIcon
						style={styles.icon}
						hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
					/>
					<Text style={styles.text}>Характеристики</Text>
				</TouchableOpacity>
				<View style={styles.scrol_container}>
					<View style={styles.title}>
						<Text style={styles.title_text}>{router.params.name}</Text>
					</View>
					<ScrollView
						style={styles.information}
						showsVerticalScrollIndicator={false}
					>
						<Text style={styles.title_text}>{router.params.description}</Text>
					</ScrollView>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default All_Information;
