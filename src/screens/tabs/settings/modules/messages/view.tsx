import BackHeader from "@novomarkt/components/navigation/BackHeader";
import { COLORS } from "@novomarkt/constants/colors";
import { STRINGS } from "@novomarkt/locales/strings";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import ChatsView from "./chats/view";
import AdminView from "./components/adminView";
import { styles } from "./style";

const Tab = createMaterialTopTabNavigator();
function MessageView() {
	return (
		<>
			<BackHeader name={STRINGS.myMessages} style={styles.header} />
			<Tab.Navigator
				screenOptions={{
					tabBarLabelStyle: { fontSize: 10 },
					tabBarActiveTintColor: COLORS.red,
					tabBarInactiveTintColor: COLORS.gray,
				}}
				style={{ backgroundColor: COLORS.white }}
			>
				<Tab.Screen name="Mагазину" component={ChatsView} />
				<Tab.Screen name="Администратору" component={AdminView} />
			</Tab.Navigator>
		</>
	);
}
export default MessageView;
