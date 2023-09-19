import Delivery from "@novomarkt/components/Delivery/ViewIndex";
import { ROUTES } from "@novomarkt/constants/routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CatalogDetailsView from "../catalog/modules/catalog-details/view";
import ShopView from "../settings/modules/messages/components/shopView";
import BrendAll from "./components/brand/BrendAll";
import Comparison from "./modulus/Comparison/view";
import All_Information from "./modulus/all_Information/All_Information";
import NewsDetailsView from "./modulus/news-details/NewsDetailsScreen";
import ReviewsAll from "./modulus/product-details/components/ReviewsAll";
import ProductDetailsView from "./modulus/product-details/view";
import HomeView from "./view";
import ShopProducts from "./components/shops/shopProducts/ShopProducts";

let Stack = createNativeStackNavigator();

export let HomeStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen component={HomeView} name={ROUTES.HOME} />
			<Stack.Screen
				component={ProductDetailsView}
				name={ROUTES.PRODUCT_DETAILS}
			/>
			<Stack.Screen component={NewsDetailsView} name={ROUTES.NEWS_DETAILS} />
			<Stack.Screen component={All_Information} name={ROUTES.ALL_INFORMATION} />
			<Stack.Screen component={Comparison} name={ROUTES.COMPARISON} />
			<Stack.Screen component={Delivery} name={ROUTES.DELIVERY} />
			<Stack.Screen component={ShopProducts} name={ROUTES.ShopProducts} />
			<Stack.Screen
				component={CatalogDetailsView}
				name={ROUTES.CATALOG_DETAILS}
			/>
			<Stack.Screen name={ROUTES.SHOPVIEW} component={ShopView} />
			<Stack.Screen name={ROUTES.REVIEWSALL} component={ReviewsAll} />
			<Stack.Screen name={ROUTES.BrendAll} component={BrendAll} />
		</Stack.Navigator>
	);
};
