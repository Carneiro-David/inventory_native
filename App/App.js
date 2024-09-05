import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import DetailItem from './screens/DetailItem';
import EditItemScreen from './screens/EditItemScreen';
import { ItemsProvider } from './ItemsContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil des item' }} />
          <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Ajouter un item' }} />
          <Stack.Screen name="DetailItem" component={DetailItem} options={{ title: 'Détails de l\'item' }} />
          <Stack.Screen name="EditItem" component={EditItemScreen} options={{ title: 'Modifier l\'item' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
};

export default App;