/* eslint-disable react-hooks/exhaustive-deps */
import requests, { appendUrl } from "@novomarkt/api/requests";
import {
	DeliveryMethodResponse,
	OrderSend,
	PaymentMethodResponse,
} from "@novomarkt/api/types";
import DefaultButton from "@novomarkt/components/general/DefaultButton";
import Text from "@novomarkt/components/general/Text";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { COLORS } from "@novomarkt/constants/colors";
import { STRINGS } from "@novomarkt/locales/strings";
import { loadCart } from "@novomarkt/store/slices/cartSlice";

import { BottomArrow, NewTopArrowIcon2 } from "@novomarkt/assets/icons/icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	Alert,
	Image,
	LayoutAnimation,
	Modal,
	ScrollView,
	Switch,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { Snackbar } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import { useDispatch } from "react-redux";
import CartSelectItem from "../../settings/modules/profile/components/cartItem/view";
import PickupPoint from "../components/PickupPoint";
import BtsModal from "./checkoutModal/BtsModal";
import CheckoutModal from "./checkoutModal/CheckoutModal";
import { styles } from "./style";

const CheckoutView = () => {
	const route = useRoute();
	//@ts-ignore
	const orderData: any = route.params?.item;
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [activeIndex, setIsActive] = useState(0);
	const [delivery, setDelivery] = useState<DeliveryMethodResponse[]>();
	const [payment, setPayment] = useState<PaymentMethodResponse[]>();
	const [isEnabled, setIsEnabled] = useState(false);
	const [shouldShow, setShouldShow] = useState(true);
	const [visibleSnackbar, setVisibleSnackbar] = useState(false);
	const [adresId, setIdersId] = useState();
	const [orderValyu, setOrderValyu] = useState<any>();
	const [modalShow, setModalShow] = useState(false);
	const [btsShowModal, setBtsShowModal] = useState(false);
	const [cartDanle, setCartDanle] = useState(0);
	const [storeDanle, setStoreDnale] = useState<any>([]);
	const [user, setUser] = useState<any>({
		phone: "",
		email: "",
		name: "",
		lastName: "",
		address: "",
	});
	const [state, setState] = useState<OrderSend>({
		address: "",
		comment: "",
		delivery_id: 1,
		email: "",
		lastName: "",
		name: "",
		payment_id: 0,
		phone: "",
		receiver: 0,
		logist_id: "",
		shop_address_id: 0,
	});
	const [newAdress, setNewAdress] = useState();

	const [isLoading, setIsLoading] = useState(false);
	const disabled = state.payment_id > 0 ? false : true;
	// console.log("newAdresss", JSON.stringify(newAdress, null, 2));

	const toggleSwitch = () => {
		// user to state
		if (isEnabled) {
			setState({
				...state,
				name: user.name,
				lastName: user.lastName,
				email: user.email,
				phone: user.phone,
				address: user.address,
			});
		} else {
			setState({
				...state,
				name: "",
				lastName: "",
				email: "",
				phone: "",
				address: "",
			});
		}
		setIsEnabled((previousState) => !previousState);
	};

	const effect = async () => {
		try {
			let res = await requests.products.deliveryMethods();
			let res2 = await requests.products.getProductPayment();
			let res3 = await requests.profile.getProfile();
			let res3Data = res3?.data?.data;

			setUser({
				...user,
				phone: res3Data?.phone,
				email: res3Data?.email,
				name: res3Data?.name,
				lastName: res3Data?.lastName || "",
				address: res3Data?.last_address,
				logist_id: adresId,
			});
			setState({
				...state,
				name: res3Data?.name,
				lastName: res3Data?.lastName || "",
				email: res3Data?.email,
				phone: res3Data?.phone,
				address: res3Data?.last_address,
				logist_id: adresId,
				shop_address_id: 0,
			});
			setDelivery(res.data.data);
			setPayment(res2.data.data as any);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		effect();
	}, [adresId]);

	let onStateChange = (key: string) => (value: string) => {
		setState({ ...state, [key]: value });
	};

	const sendProduct = async () => {
		if (state.address.length > 0) {
			await sendOrder();
		} else {
			return Alert.alert(`Ошибка `, "Вы не ввели свой адрес");
		}
	};
	const toggleSnackbar = () => setVisibleSnackbar(!visibleSnackbar);

	const sendOrder = async () => {
		setIsLoading(true);
		try {
			let res = await requests.order.sendOrder(state);
			if (state.payment_id === 37) {
				createCheck();
			}
			await requests.products.clearCart();
			let cartGet = await requests.products.getCarts();
			dispatch(loadCart(cartGet.data.data));

			setOrderValyu(res.data.data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			return;
		}
	};

	const createCheck = async () => {
		setIsLoading(true);
		try {
			let res = await requests.chek.createCheck(orderValyu.id);

			payaCheck(res.data?.data?.id);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	const payaCheck = async (data: any) => {
		try {
			await requests.chek.payaCheck(data, cartDanle);
			toggleSnackbar();
			setTimeout(() => {
				navigation.goBack();
			}, 1000);
		} catch (error) {
			console.log("error=", error);
		}
	};

	const storeAddresses = async () => {
		try {
			let res = await requests.categories.storeAddresses(31);
			setStoreDnale(res.data.data);
		} catch (error) {
			console.log("storeAddresses==== error", error);
		}
	};
	useEffect(() => {
		storeAddresses();
	}, []);

	return (
		<>
			<ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
				<>
					<BackHeader name={STRINGS.checkout} style={styles.backHeader} />

					<View style={styles.deliveryContainer}>
						<Text style={styles.headerTxt}>{STRINGS.deliveryChoose}</Text>
						{delivery?.map((item, index) => {
							return (
								<TouchableOpacity
									style={
										activeIndex === item.id ? styles.activeBox : styles.box
									}
									onPress={() => {
										// eslint-disable-next-line no-sequences
										setIsActive(item.id),
											setState({ ...state, delivery_id: item.id });
									}}
									key={index}
								>
									<View
										style={
											activeIndex === item.id
												? styles.activeBorder
												: styles.border
										}
									>
										<View
											style={
												activeIndex === item.id ? styles.activeDot : styles.dot
											}
										/>
									</View>
									<View style={styles.textBox}>
										<Text style={styles.text}>{item?.name}</Text>
									</View>
								</TouchableOpacity>
							);
						})}
					</View>
					{activeIndex === 1 ? (
						<View style={styles.noActive}>
							<TouchableOpacity
								style={styles.boActive_box}
								onPress={() => setModalShow(true)}
							>
								<Text style={{ color: COLORS.black, fontSize: 14 }}>
									Выберите логистическую компанию
								</Text>
								<NewTopArrowIcon2 />
							</TouchableOpacity>
						</View>
					) : null}
					{activeIndex === 3 ? (
						<View style={styles.noActive}>
							<TouchableOpacity
								style={styles.boActive_box}
								onPress={() => setBtsShowModal(true)}
							>
								<Text style={{ color: COLORS.black, fontSize: 14 }}>
									Выберите БТС
								</Text>
								<NewTopArrowIcon2 />
							</TouchableOpacity>
						</View>
					) : null}
					{activeIndex === 2 ? (
						<View style={{ width: "100%", paddingHorizontal: 20 }}>
							<SelectDropdown
								data={storeDanle ? storeDanle : []}
								onSelect={(selectedItem: any) => {
									setState({ ...state, shop_address_id: selectedItem.id });
								}}
								buttonTextAfterSelection={(selectedItem: any) => {
									return selectedItem.address;
								}}
								rowTextForSelection={(item: any) => {
									return item.address;
								}}
								buttonStyle={styles.dropdown2BtnStyle}
								buttonTextStyle={{
									fontSize: 16,
									color: COLORS.defaultBlack,
									textAlign: "left",
								}}
								renderDropdownIcon={() => {
									return <BottomArrow fill={"#000000"} />;
								}}
								dropdownIconPosition="right"
								rowTextStyle={styles.text}
								defaultButtonText="Выберите"
							/>
						</View>
					) : null}
					{newAdress !== undefined ? (
						<View
							style={{
								flexDirection: "row",
								width: "100%",
								paddingHorizontal: 20,
								flexWrap: "wrap",
								marginTop: 20,
							}}
						>
							<Text style={styles.text}>{newAdress?.city_name} ,</Text>
							<Text style={styles.text}>{newAdress?.region_name} ,</Text>
							<Text style={styles.text}>{newAdress?.unit_name} ,</Text>
							<Text style={styles.text}>{newAdress?.adress}</Text>
						</View>
					) : null}
					<View style={styles.pickupContainer}>
						<View style={styles.pickupBox}>
							<Text style={styles.boxTxt}>
								Срок доставки будет расчитан после
							</Text>
							<ScrollView
								horizontal={true}
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
								}}
							>
								{orderData?.cart?.map((item: any, index: any) => {
									return (
										<View
											style={{
												width: "100%",
												marginVertical: 2,
												flexDirection: "row",
											}}
											key={index}
										>
											<View style={styles.boxNum}>
												<Image
													source={{
														uri: appendUrl(item.product.photo),
													}}
													style={styles.boxImage}
												/>
												{item.amount ? (
													<View style={styles.imageNum}>
														<Text style={styles.num}>{item?.amount}</Text>
													</View>
												) : null}
											</View>
										</View>
									);
								})}
							</ScrollView>
						</View>
					</View>
					<View style={styles.recipientContainer}>
						<Text style={styles.recipHeaderTxt}>{STRINGS.recipient}</Text>
						<View style={styles.recipBox}>
							<View style={styles.switch}>
								<Text style={styles.notMe}>{STRINGS.itsNotMe}</Text>
								<Switch
									hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
									trackColor={{ false: "#767577", true: COLORS.darkBlue4 }}
									thumbColor={isEnabled ? COLORS.red : COLORS.white}
									ios_backgroundColor="#3e3e3e"
									onValueChange={toggleSwitch}
									value={isEnabled}
								/>
							</View>
							<PickupPoint
								onStateChange={onStateChange}
								typePayment={payment as any}
							/>
							{state.payment_id === 37 ? (
								<View style={styles.shadowBoxTwo}>
									<Text style={styles.bank}> Банковские карты </Text>
									<CartSelectItem setCartDanle={setCartDanle} />
								</View>
							) : null}

							<TextInput
								placeholder={STRINGS.inputName}
								style={styles.input}
								onChangeText={onStateChange("name")}
								placeholderTextColor={COLORS.gray}
								value={state.name}
							/>
							<TextInput
								placeholder={STRINGS.inputLastName}
								style={styles.input}
								onChangeText={onStateChange("lastName")}
								placeholderTextColor={COLORS.gray}
								value={state.lastName}
							/>
							<TextInput
								placeholder={STRINGS.email}
								style={styles.input}
								keyboardType={"email-address"}
								onChangeText={onStateChange("email")}
								placeholderTextColor={COLORS.gray}
								value={state.email}
							/>
							<TextInput
								placeholder={STRINGS.address}
								style={styles.input}
								keyboardType={"email-address"}
								onChangeText={onStateChange("address")}
								placeholderTextColor={COLORS.gray}
								value={state.address}
							/>
							<TextInput
								placeholder={STRINGS.phoneNumber}
								style={styles.input}
								keyboardType={"phone-pad"}
								onChangeText={onStateChange("phone")}
								placeholderTextColor={COLORS.gray}
								value={state.phone}
								onFocus={() => {
									if (state.phone === "") {
										onStateChange("phone")("+998");
									}
								}}
							/>
							<TouchableOpacity
								onPress={() => {
									LayoutAnimation.configureNext(
										LayoutAnimation.Presets.easeInEaseOut
									);
									setShouldShow(!shouldShow);
								}}
							>
								<Text style={styles.underline}>
									+ Дополнительный номер телефона
								</Text>
							</TouchableOpacity>
							{!shouldShow ? (
								<TextInput
									placeholder={STRINGS.phoneNumber}
									style={styles.input}
									keyboardType={"phone-pad"}
									onChangeText={onStateChange("phone")}
									placeholderTextColor={COLORS.gray}
									value={state.phone}
									onFocus={() => {
										if (state.phone === "") {
											onStateChange("phone")("+998");
										}
									}}
								/>
							) : null}
						</View>

						<DefaultButton
							containerStyle={styles.recipButton}
							text={STRINGS.addOrder}
							onPress={sendProduct}
							loading={isLoading}
							disabled={disabled}
						/>
					</View>

					<Snackbar
						visible={visibleSnackbar}
						onDismiss={toggleSnackbar}
						duration={4000}
					>
						Заказ оформлен успешно!
					</Snackbar>
				</>
			</ScrollView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalShow}
				onRequestClose={() => {
					setModalShow(!modalShow);
				}}
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<View
					style={{
						borderWidth: 1,
						zIndex: 10,
						flex: 1,
					}}
				>
					<CheckoutModal
						setModalShow={setModalShow}
						setIdersId={setIdersId}
						setNewAdress={setNewAdress}
					/>
				</View>
			</Modal>
			<Modal
				animationType="slide"
				transparent={true}
				visible={btsShowModal}
				onRequestClose={() => {
					setBtsShowModal(!btsShowModal);
				}}
				style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
			>
				<View
					style={{
						borderWidth: 1,
						zIndex: 10,
						flex: 1,
					}}
				>
					<BtsModal
						setModalShow={setBtsShowModal}
						setIdersId={setIdersId}
						setNewAdress={setNewAdress}
						orderData={orderData}
					/>
				</View>
			</Modal>
		</>
	);
};

export default CheckoutView;
