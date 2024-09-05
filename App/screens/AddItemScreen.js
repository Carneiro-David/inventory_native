import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ItemsContext } from '../ItemsContext';

const AddItemScreen = ({ navigation }) => {
  const { addItem } = useContext(ItemsContext);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

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

  const handleAddItem = () => {
    const newItem = {
      id: Date.now().toString(),
      name,
      quantity: parseInt(quantity),
      type,
      price: parseFloat(price),
      description,
      image: image || 'https://via.placeholder.com/150',
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
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Quantité en stock :</Text>
      <TextInput
        style={styles.input}
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Quantité"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Type de produit :</Text>
      <TextInput
        style={styles.input}
        value={type}
        onChangeText={setType}
        placeholder="Type de produit"
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Prix :</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="Prix"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description :</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Description du produit"
        placeholderTextColor="#666"
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity onPress={handleAddItem} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Ajouter le produit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2E2E2E', // Gris foncé
  },
  label: {
    fontSize: 16,
    color: '#E0E0E0', // Gris clair
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#555', // Gris intermédiaire
    backgroundColor: '#3E3E3E', // Gris foncé intermédiaire
    color: '#FFF', // Blanc
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#900', // Rouge foncé
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF', // Blanc
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#900', // Rouge foncé
  },
  submitButton: {
    backgroundColor: '#B22222', // Rouge plus intense
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF', // Blanc
    fontSize: 18,
  },
});

export default AddItemScreen;