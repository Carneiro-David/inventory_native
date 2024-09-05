import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ItemsContext } from '../ItemsContext';

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { items, setItems } = useContext(ItemsContext);

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [type, setType] = useState(item.type);
  const [price, setPrice] = useState(item.price.toString());
  const [description, setDescription] = useState(item.description || '');

  const saveChanges = () => {
    const updatedItems = item.map(i => (i.id === item.id ? { ...i, name, quantity: parseInt(quantity), type, description, price: parseInt(price) } : i));
    setItems(updatedItems);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Quantité:</Text>
      <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" />

      <Text style={styles.label}>Type:</Text>
      <TextInput style={styles.input} value={type} onChangeText={setType} />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Prix unité:</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

      <Button title="Sauvegarder les modifications" onPress={saveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#555',
  },
});

export default EditItemScreen;
