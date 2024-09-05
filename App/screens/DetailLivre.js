import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const DetailLivre = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.cover }} style={styles.coverImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>Auteur: {item.author}</Text>
      <Text style={styles.year}>Année: {item.year}</Text>
      <Text style={styles.description}>{item.description}</Text>

      <Button
        title="Modifier le Livre"
        onPress={() => navigation.navigate('EditBook', { item })}
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
