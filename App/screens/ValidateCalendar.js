import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { ItemsContext } from '../ItemsContext';  // Importer le contexte des items

const EventItem = ({ event, onDelete, items }) => {
  // Trouver l'item correspondant à l'itemId dans l'événement
  const selectedItem = items.find(item => item.id === event.itemId);

  return (
    <View style={styles.eventItem}>
      <View style={styles.eventInfo}>
        <Text style={styles.name}>{event.entreprise}</Text>
        <Text style={styles.dates}>
          Du {moment(event.startDate).format('DD/MM/YYYY')} au {moment(event.endDate).format('DD/MM/YYYY')}
        </Text>
        {selectedItem ? (
          <Text style={styles.selectedItem}>
            Item sélectionné: {selectedItem.name} (Quantité: {selectedItem.quantity})
          </Text>
        ) : (
          <Text style={styles.noItem}>Aucun item sélectionné</Text>
        )}
      </View>
      <TouchableOpacity onPress={() => onDelete(event.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const ValidateCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { items } = useContext(ItemsContext);  // Accéder aux items via le contexte

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://10.0.2.2:5000/events');
      const data = await response.json();
      setEvents(data);
      setLoading(false);
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de récupérer les événements');
      setLoading(false);
    }
  };

  const deleteEvent = async (id) => {
    try {
      const response = await fetch(`http://10.0.2.2:5000/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'événement');
      }

      fetchEvents();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer l\'événement');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Chargement des événements...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <EventItem event={item} onDelete={deleteEvent} items={items} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  eventInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  dates: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  selectedItem: {
    fontSize: 16,
    color: "#007bff",
    marginTop: 5,
  },
  noItem: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
});

export default ValidateCalendar;
