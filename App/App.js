import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import DetailItem from "./screens/DetailItem";
import EditItemScreen from "./screens/EditItemScreen";
import { ItemsProvider } from "./ItemsContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function ItemStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Liste des produits" }}
      />
      <Stack.Screen
        name="AddItem"
        component={AddItemScreen}
        options={{ title: "Ajouter au stock" }}
      />
      <Stack.Screen
        name="DetailItem"
        component={DetailItem}
        options={{ title: "Détails du produit" }}
      />
      <Stack.Screen
        name="EditItem"
        component={EditItemScreen}
        options={{ title: "Modifier le produit" }}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Items"
            component={ItemStack}
            options={{
              tabBarLabel: "Produits",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="pricetags-outline" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Planning"
            component={AddItemScreen}
            options={{
              tabBarLabel: "Planning",
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
}

export default App;
