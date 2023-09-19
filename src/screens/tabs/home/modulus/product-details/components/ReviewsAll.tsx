import {
	Checked,
	LeftArrowIcon,
	MarkedStar,
	NotMarkedStar,
} from "@novomarkt/assets/icons/icons";
import { COLORS } from "@novomarkt/constants/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../style";
const ReviewsAll = () => {
	const navigation = useNavigation();
	const { params }: any = useRoute();

	return (
		<View style={{ flex: 1, backgroundColor: COLORS.white }}>
			<TouchableOpacity onPress={navigation.goBack} style={styles.goBack}>
				<LeftArrowIcon
					style={{ width: 120, height: 120 }}
					hitSlop={{ left: 10, right: 10, top: 10, bottom: 10 }}
				/>
				<Text
					style={{ fontSize: 20, color: COLORS.defaultBlack, marginLeft: 10 }}
				>
					Посмотреть все отзывы
				</Text>
			</TouchableOpacity>
			{/* <View style={styles.topBarr}>
				<Text style={styles.topBarrTitle}>Сортировать по:</Text>
				<Text style={styles.topBarrTitle}>
					Дате <BottomArrowIcon />
				</Text>
				<Text style={styles.topBarrTitle}>Оценке</Text>
			</View> */}

			<FlatList
				data={params}
				renderItem={({ item }) => (
					<View style={styles.containerComment}>
						<View style={styles.boxes}>
							<View style={styles.nameRow}>
								<Text style={styles.name}>{item.user.name}</Text>
								<View style={styles.stars}>
									{new Array(5).fill(1).map((e, i) => {
										if (i < item.rate) {
											return (
												<MarkedStar
													style={{ width: 120, height: 120 }}
													fill={COLORS.red}
												/>
											);
										} else {
											return (
												<NotMarkedStar
													style={{ width: 120, height: 120 }}
													fill={COLORS.whiteGray}
												/>
											);
										}
									})}
								</View>
							</View>
							<Text style={styles.comment}>{item.review}</Text>
							<View style={styles.row}>
								<Text>{item.date.split(" ")[0]}</Text>
								<View style={styles.row}>
									<Checked
										fill={COLORS.red}
										style={[styles.icon, { width: 120, height: 120 }]}
									/>
									<Text>Я купил товар</Text>
								</View>
							</View>
						</View>
					</View>
				)}
				ListEmptyComponent={
					<Text style={styles.notValue}>Нет результатов</Text>
				}
			/>
		</View>
	);
};

export default ReviewsAll;
