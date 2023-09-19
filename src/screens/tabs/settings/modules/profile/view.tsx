import { assetUrl } from "@novomarkt/api/requests";
import { LocationIcon, PlusIcon } from "@novomarkt/assets/icons/icons";
import DefaultInput from "@novomarkt/components/general/DefaultInput";
import Text from "@novomarkt/components/general/Text";
import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { COLORS } from "@novomarkt/constants/colors";
import React, { useState } from "react";
import {
	FlatList,
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	View,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import CartSelectItem from "./components/cartItem/view";
import useProfileHook from "./hooks";
import { styles } from "./style";

export interface UserData {
	name: string;
	email: string;
	phone: string;
	dateOfBirth: string;
	isMale: boolean;
	gender: boolean;
}
const datPol = [
	{ id: 0, pol: "Муж." },
	{ id: 1, pol: "Жен." },
];
const ProfileView = () => {
	let {
		profileData,
		changePhoto,
		state,
		onStateChange,
		setActivePol,
		activePol,
		removAcountHandler,
		loading,
	} = useProfileHook();
	const [cartDanle, setCartDanle] = useState();
	console.log(cartDanle);

	return (
		<View style={styles.container}>
			<BackHeader style={styles.left} />
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 20}
			>
				<ScrollView style={styles.container2}>
					<View style={styles.title}>
						<Text style={styles.header}>Мои данные</Text>
					</View>
					<View style={styles.userData}>
						<View style={styles.userName}>
							<View style={styles.imageBox}>
								<Image
									source={{ uri: assetUrl + state?.photo }}
									style={styles.image}
								/>
								<TouchableOpacity style={styles.addImage} onPress={changePhoto}>
									<PlusIcon fill={COLORS.white} />
								</TouchableOpacity>
							</View>
							<View style={styles.userNameText}>
								<DefaultInput
									inputStyle={styles.input}
									containerStyle={styles.inputContainer}
									value={state.name}
									onChange={onStateChange("name")}
								/>
							</View>
						</View>

						<View style={styles.userNameText}>
							<DefaultInput
								inputStyle={styles.input2}
								title="Э-маил"
								containerStyle={styles.inputContainer}
								value={state.email}
								onChange={onStateChange("email")}
							/>
						</View>

						<View style={styles.userNameText}>
							<DefaultInput
								inputStyle={styles.input3}
								title="Телефон"
								containerStyle={styles.inputContainer}
								value={state.phone}
								onChange={onStateChange("phone")}
							/>
						</View>
						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
							}}
						>
							<View style={styles.birthday}>
								<DefaultInput
									inputStyle={styles.input2}
									title="Дата рождения"
									containerStyle={styles.inputContainer}
									value={state.birthday ? state.birthday : ""}
									onChange={onStateChange("birthday")}
								/>
							</View>
							<View style={styles.pol}>
								<Text style={styles.polTitle2}>Пол</Text>

								<View style={styles.polBox}>
									<FlatList
										data={datPol}
										numColumns={2}
										renderItem={({ item }) => (
											<TouchableOpacity
												onPress={() => setActivePol(item.id)}
												style={styles.polTitle}
											>
												<View
													style={[
														styles.activePol,

														{
															borderColor:
																activePol === item.id ? "red" : "black",
														},
													]}
												>
													<View
														style={[
															styles.noActivePol,
															{
																backgroundColor:
																	activePol === item.id
																		? COLORS.red
																		: COLORS.textColor,
															},
														]}
													/>
												</View>
												<Text>{item.pol}</Text>
											</TouchableOpacity>
										)}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.locate}>
						<Text style={styles.txt}>Адресa клиента</Text>
						<View style={styles.row}>
							<LocationIcon fill={COLORS.gray} />
							{profileData?.addresses?.map((e) => {
								<Text style={styles.moscow}>{e}</Text>;
							})}
							<Text style={styles.moscow}> {state.last_address}</Text>
						</View>
					</View>
					<View style={styles.delete}>
						<Text style={styles.txt}>Удаление личного кабинета</Text>
						<Text>Как только Ваш личный кабинет будет удален</Text>
						<TouchableOpacity onPress={removAcountHandler}>
							<Text style={styles.blueText}>Удаление личново кабинета</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.recover}>
						<Text style={styles.txt}>Восстановления пароля</Text>
						<Text style={styles.blueText}>
							Данные для восстановления пароля и sms
						</Text>
					</View>
					<View style={styles.shadowBoxTwo}>
						<Text style={styles.bank}> Банковские карты </Text>
						<CartSelectItem setCartDanle={setCartDanle} />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
			<Spinner visible={loading} />
		</View>
	);
};

export default ProfileView;
