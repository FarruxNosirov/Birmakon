import { assetUrl } from "@novomarkt/api/requests";
import { COLORS } from "@novomarkt/constants/colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const OrderItem = ({ item, payment, delivery }: any) => {
	// console.log("payment", JSON.stringify(item, null, 2));

	return (
		<View style={styles.shadowBox}>
			<View style={styles.imageBox}>
				<Image
					source={{ uri: assetUrl + item?.product?.photo }}
					style={styles.img}
				/>
				<Text style={styles.price}>
					{item?.price
						.toLocaleString(undefined, {
							minimumFractionDigits: 0,
							maximumFractionDigits: 0,
						})
						.replace(/,/gi, " ")}{" "}
					{/* {STRINGS.money} */}
				</Text>
			</View>
			<View style={styles.contentBox}>
				<View style={{ maxHeight: 50 }}>
					<Text style={styles.text}>
						{item?.product?.name}
						{/* {item?.product?.name?.length > 40
              ? item?.product?.name.slice(0, 45) + '...'
              : item?.product?.name} */}
					</Text>
				</View>
				<View
					style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
				>
					{item?.product?.color !== null ? (
						<>
							<Text style={styles.name}>Цвет:</Text>
							<Text style={[styles.name]}>{item?.product?.color?.name}</Text>
						</>
					) : null}
				</View>

				<Text style={styles.items}>Бренд: {item?.product?.brand?.name}</Text>
				<Text style={styles.items}>Доставка: {delivery?.name}</Text>
				{/* <Text style={styles.items}>Адрес: {user?.last_address}</Text> */}
				{/* <Text style={styles.items}>
          Способ оплаты:
          <View style={styles.row}>
            <Image
              style={styles.cards}
              source={require('@assets/images/mir.png')}
            />
            <Image
              style={styles.cardsV}
              source={require('@assets/images/visa.png')}
            />
            <Image
              style={styles.cardsM}
              source={require('@assets/images/mastercard.png')}
            />
          </View>
        </Text> */}
				<Text style={styles.items}>Оплата: {payment?.name}</Text>
			</View>
		</View>
	);
};

export default OrderItem;

const styles = StyleSheet.create({
	shadowBox: {
		marginVertical: 10,
		marginHorizontal: 15,
		borderRadius: 8,
		backgroundColor: COLORS.white,
		flexDirection: "row",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
		paddingTop: 10,
		paddingHorizontal: 10,
	},
	imageBox: {
		width: 125,
	},

	img: {
		width: 120,
		height: 120,
	},

	text: {
		fontSize: 13,

		color: COLORS.defaultBlack,
		textTransform: "uppercase",
	},

	contentBox: {
		flex: 1,
		paddingLeft: 5,
	},

	name: {
		marginTop: 5,
		marginBottom: 5,
		fontSize: 13,
		color: COLORS.defaultBlack,
	},

	items: {
		color: COLORS.defaultBlack,
		fontSize: 13,
		alignItems: "center",
		marginBottom: 5,
	},

	price: {
		fontSize: 20,
		color: COLORS.defaultBlack,
		alignSelf: "center",
		padding: 10,
		marginBottom: 5,
		fontWeight: "700",
	},

	cards: {
		width: 35,
		height: 12,
		marginHorizontal: 5,
	},
	cardsV: {
		width: 35,
		height: 10,
		marginRight: 5,
	},
	cardsM: {
		width: 35,
		height: 10,
	},

	row: {
		flexDirection: "row",
	},
});
