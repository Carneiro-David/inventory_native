import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ItemsContext } from '../ItemsContext';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const CalendarScreen = () => {
  const { items } = useContext(ItemsContext);

  const [selectedItemId, setSelectedItemId] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [events, setEvents] = useState({});
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Fonction pour obtenir toutes les dates entre la date de début et la date de fin
  const getDatesInRange = (start, end) => {
    let dates = {};
    let currentDate = moment(start);
    const endDate = moment(end);

    while (currentDate <= endDate) {
      const dateString = currentDate.format('YYYY-MM-DD');
      dates[dateString] = {
        selected: true,
        marked: true,
        color: 'lightblue',
        textColor: 'black',
      };
      currentDate = currentDate.add(1, 'days');
    }
    return dates;
  };

  const handleAddEvent = () => {
    if (!selectedItemId || !entreprise || !startDate || !endDate) {
      Alert.alert('Erreur', 'Tous les champs doivent être remplis');
      return;
    }

    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    // Obtenir toutes les dates entre startDate et endDate et les ajouter aux événements
    const newEvents = getDatesInRange(start, end);

    setEvents({
      ...events,
      ...newEvents, // Marquer toutes les dates entre start et end
    });

    setSelectedItemId('');
    setEntreprise('');
    setStartDate(null);
    setEndDate(null);
    setSuccessMessage(true); // Affiche le message de validation

    // Réinitialiser le calendrier et masquer le message après 15 secondes
    setTimeout(() => {
      setEvents({});
      setSuccessMessage(false); // Masquer le message après 15 secondes
    }, 15000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Calendar
        markedDates={events}
      />

      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>Événement ajouté avec succès !</Text>
        </View>
      )}

      <Text style={styles.label}>Sélectionnez un item</Text>
      <Picker
        selectedValue={selectedItemId}
        onValueChange={(itemValue) => setSelectedItemId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Sélectionner un item" value="" />
        {items.map((item) => (
          <Picker.Item key={item.id} label={item.name} value={item.id} />
        ))}
      </Picker>

      <TextInput
        placeholder="Entreprise"
        value={entreprise}
        onChangeText={setEntreprise}
        style={styles.input}
      />

      <View>
        <Text style={styles.label}>Date de début</Text>
        <Button title="Sélectionner la date de début" onPress={() => setShowStartDatePicker(true)} />
        {startDate && <Text>Date sélectionnée : {startDate.toLocaleDateString()}</Text>}
        {showStartDatePicker && (
          <DateTimePicker
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowStartDatePicker(false);
              if (date) setStartDate(date);
            }}
          />
        )}
      </View>

      <View>
        <Text style={styles.label}>Date de fin</Text>
        <Button title="Sélectionner la date de fin" onPress={() => setShowEndDatePicker(true)} />
        {endDate && <Text>Date sélectionnée : {endDate.toLocaleDateString()}</Text>}
        {showEndDatePicker && (
          <DateTimePicker
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowEndDatePicker(false);
              if (date) setEndDate(date);
            }}
          />
        )}
      </View>

      <View style={styles.addButtonContainer}>
        <Button title="Ajouter l'événement" onPress={handleAddEvent} color="green" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  addButtonContainer: {
    marginTop: 20,
  },
  successMessage: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#d4edda',
    borderRadius: 5,
  },
  successText: {
    color: '#155724',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
