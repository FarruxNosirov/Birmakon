import Search from "@novomarkt/components/search";
import { ROUTES } from "@novomarkt/constants/routes";
import AuthStack from "@novomarkt/screens/auth";
import TabNavigation from "@novomarkt/screens/tabs";
import { CheckoutScreen } from "@novomarkt/screens/tabs/cart/checkout";
import { CheckoutPointScreen } from "@novomarkt/screens/tabs/cart/checkout-point";
import ChatProducts from "@novomarkt/screens/tabs/settings/modules/messages/ChatProduct/ChatProduct";
import { useAppSelector } from "@novomarkt/store/hooks";

import { selectUser } from "@novomarkt/store/slices/userSlice";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

let Stack = createNativeStackNavigator();

const AppRouter = () => {
	const insets = useSafeAreaInsets();
	const user = useAppSelector(selectUser);

	return (
		<View style={{ flex: 1, marginTop: insets.top }}>
			<NavigationContainer key={user.token}>
				<Stack.Navigator
					screenOptions={{
						headerShown: false,
					}}
				>
					{!user.token ? (
						<Stack.Screen name={ROUTES.AUTH} component={AuthStack} />
					) : (
						<>
							<Stack.Screen name={ROUTES.TABS} component={TabNavigation} />
							<Stack.Screen
								name={ROUTES.CHECKOUT_POINT}
								component={CheckoutPointScreen}
							/>
							<Stack.Screen name={ROUTES.AUTH} component={AuthStack} />
							<Stack.Screen name={ROUTES.SEARCH} component={Search} />
							<Stack.Screen name={ROUTES.CHECKOUT} component={CheckoutScreen} />
							<Stack.Screen
								name={ROUTES.CHATPRODUCTS}
								component={ChatProducts}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
};

export default AppRouter;
