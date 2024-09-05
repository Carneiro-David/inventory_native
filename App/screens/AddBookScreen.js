import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ItemsContext } from '../ItemsContext'; // Import du contexte

const AddBookScreen = ({ navigation }) => {
  const { addBook } = useContext(ItemsContext); // Récupérer la fonction addBook du contexte
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  const handleAddBook = () => {
    const newBook = {
      id: Date.now().toString(),
      title,
      author,
      year,
      description,
      cover: 'https://via.placeholder.com/150', // Tu peux modifier cette ligne pour ajouter une image réelle
    };

    addBook(newBook); // Ajouter le livre au contexte
    navigation.navigate('Home'); // Retour à l'accueil après l'ajout
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Titre du livre" />

      <Text style={styles.label}>Auteur:</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} placeholder="Auteur" />

      <Text style={styles.label}>Année de publication:</Text>
      <TextInput style={styles.input} value={year} onChangeText={setYear} placeholder="Année" keyboardType="numeric" />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description" />

      <Button title="Ajouter le Livre" onPress={handleAddBook} />
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

export default AddBookScreen;
