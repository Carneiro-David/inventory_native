import React, { useContext } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert } from 'react-native';
import { ItemsContext } from '../ItemsContext'; 

const DetailItem = ({ route, navigation }) => {
  const { item } = route.params;
  const { deleteItem } = useContext(ItemsContext);

  const handleDelete = () => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cet item ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Supprimer",
          onPress: () => {
            deleteItem(item.id);
            navigation.goBack();
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.quantity}>Quantité: {item.quantity}</Text>
      <Text style={styles.type}>Type: {item.type}</Text>
      <Text style={styles.price}>Prix: {item.price} €</Text>
      <Text style={styles.description}>{item.description}</Text>

      <Button
        title="Modifier l'Item"
        onPress={() => navigation.navigate('EditItem', { item })}
      />

      <Button
        title="Supprimer l'Item"
        onPress={handleDelete}
        color="red" // Optionnel, pour rendre le bouton rouge
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemImage: {
    width: 150,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantity: {
    fontSize: 18,
    marginBottom: 10,
  },
  type: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DetailItem;
