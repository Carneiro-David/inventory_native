import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ItemsContext } from '../ItemsContext';

const AddItemScreen = ({ navigation }) => {
  const { addItem } = useContext(ItemsContext); 
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState(''); 
  const [description, setDescription] = useState('');

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name,
      quantity: parseInt(quantity),
      type,
      price: parseFloat(price),
      description,
      image: 'https://via.placeholder.com/150', 
    };

    addItem(newItem); 
    navigation.navigate('Home'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom du produit :</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom du produit"
      />

      <Text style={styles.label}>Quantité en stock :</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantité"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Type de produit :</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="Type de produit"
      />

      <Text style={styles.label}>Prix :</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Prix"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description :</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description du produit"
      />

      <Button title="Ajouter le produit" onPress={handleAddItem} />
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
});

export default AddItemScreen;
