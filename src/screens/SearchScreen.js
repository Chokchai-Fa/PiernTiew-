import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("Setting")}
        >
          <Ionicons name="chevron-back" size={24} color="#F6F2E9" />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>EDIT PROFILE</Text>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
