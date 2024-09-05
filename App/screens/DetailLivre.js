import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const DetailLivre = ({ route, navigation }) => {
  const { book } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: book.cover }} style={styles.coverImage} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Auteur: {book.author}</Text>
      <Text style={styles.year}>Année: {book.year}</Text>
      <Text style={styles.description}>{book.description}</Text>

      <Button
        title="Modifier le Livre"
        onPress={() => navigation.navigate('EditBook', { book })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  coverImage: {
    width: 150,
    height: 200,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 18,
    marginBottom: 10,
  },
  year: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default DetailLivre;
