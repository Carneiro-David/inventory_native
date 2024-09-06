import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { ItemsContext } from '../ItemsContext'; 
import { Ionicons } from '@expo/vector-icons';

const DetailItem = ({ route, navigation }) => {
  const { item } = route.params;
  const { deleteItem } = useContext(ItemsContext);

  // Fonction appelée lorsqu'on veut supprimer un item
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

  // Visuel de la page
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.quantity}>Quantité: {item.quantity}</Text>
        <Text style={styles.type}>Type: {item.type}</Text>
        <Text style={styles.price}>Prix: {item.price} €</Text>
        <Text style={styles.description}>{item.description}</Text>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate('EditItem', { item })}
          >
            <Ionicons name="pencil" size={20} color="white" />
            <Text style={styles.buttonText}>Modifier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={handleDelete}
          >
            <Ionicons name="trash" size={20} color="white" />
            <Text style={styles.buttonText}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Style de la page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white', 
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  itemImage: {
    width: 200,
    height: 250, 
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center', 
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', 
    color: '#333', 
  },
  quantity: {
    fontSize: 18,
    color: '#555', 
    marginBottom: 10,
    textAlign: 'center',
  },
  type: {
    fontSize: 18,
    color: '#555', 
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#28a745', 
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default DetailItem;
