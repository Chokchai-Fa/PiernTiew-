import React, { useState, useEffect } from "react";
import {
  Animated,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import * as firebase from "firebase";

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState("");

  const saveProfile = () => {
    auth.currentUser
      .updateProfile({
        displayName: name,
      })
      .catch((e) => console.log(e))
      .then(() => {
        navigation.navigate("Profile");
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="chevron-back" size={24} color="#F6F2E9" />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>EDIT PROFILE</Text>
      </View>

      <View>
        <Text style={styles.inputTitle}>NAME :</Text>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 200,
            height: 40,
            marginTop: 3,
            marginLeft: 15,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Name*"
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {
            saveProfile();
          }}
        >
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 80,
    height: 40,
    alignSelf: "center",
    marginTop: 55,
  },
  container: {
    backgroundColor: "#F6F2E9",
    flex: 1,
  },
  topBar: {
    alignItems: "stretch",
    width: "auto",
    backgroundColor: "#8D311A",
    height: 110,
  },
  backIcon: {
    marginTop: 65,
    position: "absolute",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  title: {
    backgroundColor: "#E8C6B1",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    alignSelf: "center",
    color: "#38130A",
  },
  inputTitle: {
    fontSize: 18,
    marginTop: 15,
    color: "#38130A",
    marginLeft: 10,
  },
  inputTitle: {
    fontSize: 15,
    marginTop: 8,
    color: "#38130A",
    marginLeft: 15,
  },
  saveBtn: {
    width: 130,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#8D311A",
    alignSelf: "center",
    backgroundColor: "#E8C6B1",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  saveText: {
    marginBottom: 5,
    fontSize: 20,
  },
});

export default EditProfile;
