import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { ItemsContext } from '../ItemsContext';

const EditBookScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const { books, setBooks } = useContext(ItemsContext);

  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [year, setYear] = useState(book.year.toString());
  const [description, setDescription] = useState(book.description || '');

  const saveChanges = () => {
    const updatedBooks = books.map(b => (b.id === book.id ? { ...b, title, author, year: parseInt(year), description } : b));
    setBooks(updatedBooks);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Auteur:</Text>
      <TextInput style={styles.input} value={author} onChangeText={setAuthor} />

      <Text style={styles.label}>Année de publication:</Text>
      <TextInput style={styles.input} value={year} onChangeText={setYear} keyboardType="numeric" />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Button title="Sauvegarder les modifications" onPress={saveChanges} />
      
      <Text style={styles.footer}>Interface et screen réalisé par Raphaël TISBA</Text>
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

export default EditBookScreen;
