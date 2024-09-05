import React, { useContext, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { ItemsContext } from "../ItemsContext";
import { Ionicons } from "@expo/vector-icons";
import { Animated, Pressable } from "react-native";

const ItemItem = ({ item, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
    >
      <Animated.View style={[styles.itemItem, { transform: [{ scale }] }]}>
        <Image source={{ uri: item.cover }} style={styles.coverImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.author}>Auteur: {item.author}</Text>
          <Text style={styles.year}>Année: {item.year}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#888" />
      </Animated.View>
    </Pressable>
  );
};

const HomeScreen = ({ navigation }) => {
  const { items } = useContext(ItemsContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ItemItem
            item={item}
            onPress={() => navigation.navigate("DetailItem", { item: item })}
          />
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddItem')}>
        <Ionicons name="add-circle" size={28} color="white" />
        <Text style={styles.addButtonText}>Ajouter un item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  itemItem: {
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
  coverImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  author: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  year: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default HomeScreen;
