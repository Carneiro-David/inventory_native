import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ItemsContext } from '../ItemsContext';

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { items, setItems } = useContext(ItemsContext);

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity.toString());
  const [type, setType] = useState(item.type);
  const [price, setPrice] = useState(item.price.toString());
  const [description, setDescription] = useState(item.description || '');
  const [image, setImage] = useState(item.image);

  // Sélectionner une image depuis la galerie
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Prendre une photo avec la caméra
  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission caméra refusée');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveChanges = () => {
    const updatedItems = items.map(i => (i.id === item.id ? { ...i, name, quantity: parseInt(quantity), type, description, price: parseInt(price) ,image} : i));
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

      <View style={styles.buttonContainer}>
        <Button title="Choisir une image" onPress={pickImage} />
        <Button title="Prendre une photo" onPress={takePhoto} />
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}

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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#900', // Rouge foncé
  },
});

export default EditItemScreen;
