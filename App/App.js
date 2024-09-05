import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddBookScreen from './screens/AddBookScreen';
import DetailLivre from './screens/DetailLivre';
import EditBookScreen from './screens/EditBookScreen';
import { ItemsProvider } from './ItemsContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ItemsProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil des Livres' }} />
          <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: 'Ajouter un Livre' }} />
          <Stack.Screen name="DetailLivre" component={DetailLivre} options={{ title: 'Détails du Livre' }} />
          <Stack.Screen name="EditBook" component={EditBookScreen} options={{ title: 'Modifier le Livre' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ItemsProvider>
  );
};

export default App;