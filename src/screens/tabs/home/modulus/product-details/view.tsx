/* eslint-disable quotes */
import requests from "@novomarkt/api/requests";
import { SendReviewProps } from "@novomarkt/api/types";
import {
	BasketIcon,
	MinusIcon,
	PlusCounterIcon,
	RightArrow,
} from "@novomarkt/assets/icons/icons";
import Characteristics from "@novomarkt/components/Characteristics";
import FilterModal from "@novomarkt/components/Filter/FilterModal";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import Text from "@novomarkt/components/general/Text";
import { COLORS } from "@novomarkt/constants/colors";
import { ROUTES } from "@novomarkt/constants/routes";
import { WINDOW_WIDTH } from "@novomarkt/constants/sizes";
import { STRINGS } from "@novomarkt/locales/strings";
import { useAppSelector } from "@novomarkt/store/hooks";
import { toggleLoading } from "@novomarkt/store/slices/appSettings";
import { cartArraySelector, loadCart } from "@novomarkt/store/slices/cartSlice";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import {
	Alert,
	FlatList,
	ScrollView,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import { Rating } from "react-native-ratings";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import ProductsList from "../../components/ProductsList";
import BackHeaderLimit from "./components/BackHeaderLimit";
import CustomCarouselItem from "./components/CustomCarouselItem";
import ReviewBox from "./components/ReviewBox";
import FavoritePrice from "./components/favoritePrice";
import { styles } from "./style";
import ProductItem from "../../components/ProductItem";
import Spinner from "react-native-loading-spinner-overlay";

const ProductDetailsView = () => {
	let {
		params: { item, id },
	} = useRoute<any>();
	const [colorActive, setColorActive] = useState(id);
	let newId = colorActive;
	useEffect(() => {
		setColorActive(id);
	}, [id]);
	const [detailIdValue, setDetailIdValue] = useState<any>([]);
	const [sizeActive, setSizeActive] = useState();
	const [modalOpen, setModalOpen] = useState(false);
	const [active, setActive] = useState({
		value1: false,
		value2: false,
	});
	const [activeSlide, setActiveSlide] = useState(0);
	// const [shouldShow, setShouldShow] = useState(true);
	const [loading, setLoading] = useState(false);
	const [related, setrelated] = useState();
	const [reviewsList, setReviewsList] = useState<any>([]);
	const [rate, setRate] = useState(0);
	const [review, setReview] = useState<SendReviewProps>({
		product_id: newId,
		rate: 0,
		review: "",
	});
	const cart = useAppSelector(cartArraySelector);
	const isActive =
		cart.filter((i) => i?.product?.id === newId).length > 0 ? true : false;

	let onStateChange = (key: string) => (value: string) => {
		setReview((e) => ({ ...e, [key]: value }));
	};

	const toggleModal = () => {
		setModalOpen(!modalOpen);
	};
	const flatlistRef = React.useRef();
	const onPressFunction = () => {
		//@ts-ignore
		flatlistRef.current.scrollTo({
			y: 0,
			animated: true,
		});
	};
	const dispatch = useDispatch();
	let navigation: any = useNavigation();

	const [animate, setAnimate] = useState(false);
	const [adValue, setAdValue] = useState(0);

	const relatedProducts = useCallback(async () => {
		try {
			let res = await requests.products.relatedProducts(newId);
			setrelated(res.data.data);
		} catch (error) {
			console.log(error);
		}
	}, [newId]);

	const adHandler = (a: string) => {
		// eslint-disable-next-line quotes
		if (a === "add") {
			setAdValue((c) => c + 1);
		} else {
			if (adValue > 0) {
				setAdValue((c) => c - 1);
			} else {
				setAdValue(0);
			}
		}
	};

	const onCartPress = async () => {
		if (isActive) {
			try {
				setAnimate(true);
				let clear = await requests.products.removeItem({
					product_id: newId,
				});
				let cartGet = await requests.products.getCarts();
				dispatch(loadCart(cartGet.data.data));
				setAnimate(false);
				setAdValue(0);
			} catch (error) {
				console.log(error);
				setAnimate(false);
			}
		} else {
			try {
				setAnimate(true);
				let res = await requests.products.addToCart({
					amount: adValue,
					product_id: newId,
				});
				if (res.status.toString() === "422") {
					Alert.alert("Кол-во товара на складе меньше чем вы указали");
				}
				let cartRes = await requests.products.getCarts();
				dispatch(loadCart(cartRes.data.data));
				setAnimate(false);
			} catch (error) {
				Alert.alert("Кол-во товара на складе меньше чем вы указали");
			} finally {
				setAnimate(false);
			}
		}
	};
	const onDecreaseItem = async () => {
		try {
			dispatch(toggleLoading(true));
			let res = await requests.products.decreaseItem({
				product_id: newId,
			});
			let cartRes = await requests.products.getCarts();
			dispatch(loadCart(cartRes.data.data));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(toggleLoading(false));
		}
	};
	const onAddItem = async () => {
		try {
			dispatch(toggleLoading(true));
			let res = await requests.products.increaseItem({
				amount: 1,
				product_id: newId,
			});
			let cartRes = await requests.products.getCarts();
			dispatch(loadCart(cartRes.data.data));
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(toggleLoading(false));
		}
	};

	const onSendReview = async () => {
		try {
			setLoading(true);
			let res = await requests.products.sendReview({
				rate: review.rate,
				review: review.review,
				product_id: newId,
			});

			if (res.data) {
				Alert.alert("Спасибо", `Ваш отзыв успешно отправлено`, [
					{
						text: "OK",
					},
				]);
			} else {
				Alert.alert(
					"Ваш отзыв не отправлен",
					`Чтобы оставить отзыв вам необходимо купить данный товар`,
					[
						{
							text: "OK",
						},
					]
				);
			}
		} catch (error) {
			console.log(error);
		} finally {
			setModalOpen(false);
			setLoading(false);
		}
	};

	const getReviews = useCallback(async () => {
		try {
			let res = await requests.products.getReviews(newId);
			setReviewsList(res.data.data);
		} catch (e) {
			console.log(e);
		}
	}, [newId]);
	const getDetailId = useCallback(async () => {
		try {
			setLoading(true);
			let res = await requests.products.getProductDetailID(newId);
			setDetailIdValue(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	}, [newId]);
	let per = detailIdValue.reviews_count;
	let separate = detailIdValue.review_separate;
	reviewsList.map(() => {
		const sum = reviewsList.reduce((a: any, b: any) => {
			return b.rate + a;
		}, 0);

		let percent = sum / reviewsList.length;
		per = percent.toString().substring(0, 3);
	});

	const productCart = cart.filter((i) => i?.product?.id === newId);

	const chaeckountAdd = () => {
		if (isActive) {
			navigation.navigate(ROUTES.CHECKOUT, productCart);
		} else {
			Alert.alert("Ошибка", "Вы должны заказать заранее");
		}
	};

	useEffect(() => {
		getReviews();
		getDetailId();
		relatedProducts();
		onPressFunction();
	}, [getDetailId, getReviews, relatedProducts]);

	const onPress = () => {
		setActive({ ...active, value1: !active.value1 });
	};
	const onPress2 = () => {
		setActive({ ...active, value2: !active.value2 });
	};
	// console.log("detailIdValue", JSON.stringify(detailIdValue, null, 2));

	return (
		<View style={styles.container}>
			<BackHeaderLimit name={item.name} id={id} detailIdValue={detailIdValue} />
			{/* <Spinner visible={animate} /> */}
			<ScrollView showsVerticalScrollIndicator={false} ref={flatlistRef}>
				<View style={styles.otsenka}>
					<Rating
						type="custom"
						ratingCount={5}
						imageSize={18}
						ratingColor="#EE4927"
						ratingBackgroundColor="#B4B4B4"
						readonly={true}
						startingValue={item?.rating}
						tintColor="#fff"
					/>

					<Text>{item?.rating} отзывов</Text>
				</View>
				{/* carousel */}
				<View style={styles.carousel}>
					<Carousel
						onSnapToItem={(index) => setActiveSlide(index)}
						itemWidth={WINDOW_WIDTH}
						windowSize={WINDOW_WIDTH}
						sliderWidth={WINDOW_WIDTH}
						itemHeight={200}
						sliderHeight={200}
						data={detailIdValue.gallery}
						renderItem={CustomCarouselItem}
						pagingEnabled
					/>
					<Pagination
						activeDotIndex={activeSlide}
						dotsLength={
							detailIdValue.gallery ? detailIdValue.gallery.length : 1
						}
						dotStyle={styles.dotStyle}
						inactiveDotStyle={styles.dotNoActive}
						containerStyle={styles.dotContainer}
					/>
				</View>
				<Text style={styles.itemName}>{item.name}</Text>
				<FavoritePrice
					oldprice={item.price_old}
					newprice={item.price}
					fromTo={item.count_price}
					fromToFrom={item.count_price1}
					tofrom={item.count_price2}
					smallprice={item.price_opt_small}
					bigprice={item.price_opt}
				/>
				{detailIdValue?.products?.length > 0 ? (
					<>
						<View style={styles.box4}>
							<View style={styles.box4_content}>
								<Text style={styles.box4_title}>Цвет:</Text>

								<FlatList
									style={{ marginTop: 18 }}
									horizontal
									showsHorizontalScrollIndicator={false}
									data={detailIdValue?.products}
									renderItem={({ item }) => (
										<TouchableOpacity
											onPress={() => setColorActive(item.id)}
											style={[
												styles.buttonColor,
												{
													backgroundColor:
														newId === item.id ? COLORS.blue : "#FFFFFF",
												},
											]}
										>
											<Text
												style={[
													styles.active_title,
													{
														color: newId === item.id ? "#ffffff" : COLORS.blue,
													},
												]}
											>
												{item.color}
											</Text>
										</TouchableOpacity>
									)}
								/>
							</View>
						</View>
					</>
				) : null}
				{detailIdValue?.filters?.length > 0 ? (
					<>
						{detailIdValue?.filters.map((item: any) => {
							return (
								<>
									{item.name === "Размер" ? (
										<>
											<View style={styles.box4}>
												<View style={styles.box4_content}>
													<Text style={styles.box4_title}>{item.name}:</Text>
													<FlatList
														style={{ marginTop: 18 }}
														horizontal
														showsHorizontalScrollIndicator={false}
														data={item.items}
														renderItem={({ item }) => (
															<TouchableOpacity
																onPress={() => setSizeActive(item.value_id)}
																style={[
																	styles.buttonSize,
																	{
																		backgroundColor:
																			sizeActive === item.value_id
																				? COLORS.blue
																				: "#FFFFFF",
																	},
																]}
															>
																<Text
																	style={[
																		styles.active_title,
																		{
																			color:
																				sizeActive === item.value_id
																					? "#ffffff"
																					: COLORS.blue,
																		},
																	]}
																>
																	{item.value}
																</Text>
															</TouchableOpacity>
														)}
													/>
												</View>
											</View>
										</>
									) : null}
								</>
							);
						})}
					</>
				) : null}

				<View style={styles.counter}>
					<TouchableOpacity
						onPress={() => {
							adHandler("remov");
							if (isActive) {
								onDecreaseItem();
							}
						}}
					>
						<View style={styles.minus}>
							<MinusIcon
								style={{ width: 120, height: 120 }}
								fill={COLORS.white}
							/>
						</View>
					</TouchableOpacity>
					<View style={styles.topBottom}>
						<Text>
							{isActive
								? cart.filter((i) => i?.product?.id === item?.id).length
									? cart.filter((i) => i?.product?.id === item?.id)[0].amount
									: 0
								: adValue}
						</Text>
					</View>
					<TouchableOpacity
						onPress={() => {
							adHandler("add");
							if (isActive) {
								onAddItem();
							}
						}}
					>
						<View style={styles.plus}>
							<PlusCounterIcon
								style={{ width: 120, height: 120 }}
								fill={COLORS.white}
							/>
						</View>
					</TouchableOpacity>
					<View style={styles.function}>
						<Text style={styles.functionText}>Габариты: 120х120</Text>
					</View>
				</View>
				{/* amount */}

				<View style={styles.oldContainer}>
					<TouchableOpacity onPress={chaeckountAdd}>
						<View style={styles.oldView}>
							<Text style={styles.oldText}>Купить</Text>
						</View>
					</TouchableOpacity>

					{/* basketAktev */}
					<View style={styles.sectionContainer}>
						<DefaultButton
							containerStyle={styles.button}
							onPress={onCartPress}
							secondary={isActive}
						>
							<View style={styles.buttonContainer}>
								<Text
									style={[isActive ? styles.inactiveCartText : styles.cartText]}
								>
									{STRINGS.addToCart}
								</Text>
								<BasketIcon
									style={{ width: 120, height: 120 }}
									fill={isActive ? COLORS.cartColor3 : COLORS.white}
								/>
							</View>
						</DefaultButton>
					</View>
					{/* basketAktev */}

					<TouchableOpacity
					// onPress={() =>
					// 	navigation.navigate(ROUTES.COMPARISON, {
					// 		item: item.options,
					// 		productSize: productSize,
					// 	})
					// }
					>
						<View style={styles.oldView1}>
							<Text style={styles.oldText}>Сравнить</Text>
						</View>
					</TouchableOpacity>
				</View>
				{/* <TouchableOpacity
					onPress={() =>
						navigation.navigate(ROUTES.ALL_INFORMATION, detailIdValue)
					}
				>
					<View style={styles.sectionBox}>
						<Text style={styles.sectionBoxText}>{STRINGS.characteristics}</Text>
						<View style={styles.iconView}>
							<BlueBackIcon style={{ width: 120, height: 120 }} />
						</View>
					</View>
				</TouchableOpacity> */}
				{detailIdValue?.productProperties?.length > 0 && (
					<>
						<FilterModal
							title="Характеристики"
							active={active.value2}
							onPress={onPress2}
						>
							{active.value2 && (
								<View style={[styles.box_noactive]}>
									<Characteristics
										productProperties={detailIdValue?.productProperties}
									/>
								</View>
							)}
						</FilterModal>
						{/* <DefaultButton
							text="Все характеристика"
							containerStyle={{ marginHorizontal: 15, marginVertical: 20 }}
							onPress={() =>
								navigation.navigate(ROUTES.ALL_INFORMATION, detailIdValue)
							}
						/> */}
					</>
				)}
				{detailIdValue?.description !== "" && (
					<FilterModal
						title="Описание"
						active={active.value1}
						onPress={onPress}
					>
						{active.value1 && (
							<View style={[styles.box_noactive]}>
								<View style={styles.flatlistContainerBox}>
									<Text style={styles.flatlistContainerBoxText}>
										{detailIdValue.description}
									</Text>
								</View>
							</View>
						)}
					</FilterModal>
				)}

				{/* {item.options?.map((e: any) => {
					return (
						<View style={styles.map}>
							<Text style={styles.key}>{e.key}</Text>
							<Text>{e.value}</Text>
						</View>
					);
				})} */}

				<View style={styles.dastavka}>
					<View style={styles.flatlistContainer12}>
						<Text style={styles.flatlistContainerText12}>Мироншох</Text>
					</View>
					<View style={styles.propertyBox}>
						<Text style={styles.propertyBoxText}>
							12545 отзывов (94% положительных)
						</Text>
						<Text style={styles.propertyBoxText}>Махмуда тараби 23</Text>
						<Text style={styles.propertyBoxText}>Ташкент</Text>
					</View>
				</View>

				{/* <ProductsList title="Товары продовца" /> */}

				<DefaultButton containerStyle={styles.marginBottomEnd}>
					<Text style={styles.buttonReview}>Перейти в магазин</Text>
				</DefaultButton>
				{reviewsList.length > 0 && (
					<TouchableOpacity
						onPress={() => navigation.navigate(ROUTES.REVIEWSALL, reviewsList)}
					>
						<View style={styles.composTwo}>
							<Text style={styles.composition}>
								{STRINGS.reviews} {reviewsList.length}
							</Text>
							<RightArrow
								style={{ width: 120, height: 120 }}
								fill={COLORS.red}
							/>
						</View>
					</TouchableOpacity>
				)}

				{/* ReviewBox */}
				<ReviewBox
					percent={per}
					separate={separate}
					rating={detailIdValue.rating}
				/>
				{/* ReviewBox */}
				{/* {!shouldShow ? (
					<View style={{ marginVertical: 10 }}>
						{reviewsList?.map((item: any) => (
							<View key={item.id} style={styles.containerComment}>
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
						))}
					</View>
				) : null} */}
				{/* <TouchableOpacity
					onPress={() => navigation.navigate(ROUTES.REVIEWSALL, reviewsList)}
				>
					<Text style={styles.flexEnd}>{STRINGS.comments}</Text>
				</TouchableOpacity> */}

				<DefaultButton
					containerStyle={styles.marginBottom}
					onPress={toggleModal}
				>
					<Text style={styles.buttonReview}>{STRINGS.sendReview}</Text>
				</DefaultButton>

				<View style={{ flex: 1 }}>
					<Text style={styles.titleBottom}>Похожие товары</Text>
					<FlatList
						style={styles.bottomFilter}
						showsVerticalScrollIndicator={false}
						data={related}
						renderItem={(item) => <ProductItem {...item} />}
						numColumns={2}
						contentContainerStyle={styles.contentContainerStyle}
						keyExtractor={(item) => item.id}
					/>
				</View>

				<View style={{ height: 100, width: 100 }} />
			</ScrollView>
			<ReactNativeModal isVisible={modalOpen} onBackdropPress={toggleModal}>
				<View style={styles.modalView}>
					<View
						style={{
							width: "100%",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "700",
								color: COLORS.textColor,
							}}
						>
							Оставьте отзыв
						</Text>
					</View>
					<Rating
						type="star"
						ratingCount={5}
						imageSize={25}
						onFinishRating={(e: number) => setRate(e)}
						startingValue={rate}
						style={{ marginVertical: 15 }}
					/>

					<TextInput
						style={styles.bigger}
						placeholder={"Сообщение"}
						placeholderTextColor={COLORS.textColor}
						onChangeText={onStateChange("review")}
					/>

					<View style={{ marginTop: 5, width: "100%" }}>
						<DefaultButton text={STRINGS.sendReview} onPress={onSendReview} />
					</View>
				</View>
			</ReactNativeModal>
			<Spinner visible={loading} />
		</View>
	);
};

export default ProductDetailsView;
