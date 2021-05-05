import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import * as firebase from "firebase";
import { Feather } from "@expo/vector-icons";
import HistoryList from "../components/HistoryList";
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen = ({ navigation }) => {
  const [joinedevent, setJoinedevent] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = db
      .collection("Event")
      .where("Joined", "array-contains", auth.currentUser.uid)
      .onSnapshot((snapshot) =>
        setJoinedevent(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    navigation.addListener("didFocus");
    const imageRef = firebase
      .storage()
      .ref("/profileimage/" + auth.currentUser.email);
    imageRef.getDownloadURL().then((url) => {
      setImage(url);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity style={styles.logoutIcon} onPress={signOutUser}>
          <Feather name="log-out" size={30} color="#F6F2E9" />
        </TouchableOpacity>
      </View>

      <View style={styles.title}>
        <Text style={styles.titleText}>PROFILE</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Edit")}
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            paddingRight: 20,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              position: "absolute",
              alignSelf: "flex-end",
              paddingRight: 20,
              fontSize: 18,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{ uri: image }}
          style={{
            height: 150,
            width: 150,
            borderRadius: 200,
            alignItems: "center",
            alignSelf: "center",
            marginTop: 10,
          }}
        ></Image>
        {isFocused ? (
          <Text style={styles.profileText}>{auth.currentUser.displayName}</Text>
        ) : null}
      </View>

      <View
        style={{
          justifyContent: "center",
          width: "90%",
          margin: 10,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ fontSize: 16 }}>
          {isFocused ? <Text>{auth.currentUser.email}</Text> : null}
        </Text>
      </View>
      <View style={styles.title}>
        <Text
          style={{
            fontSize: 22,
            color: "#38130A",
            color: "#8D311A",
          }}
        >
          HISTORY
        </Text>
      </View>

      <ScrollView>
        <View>
          {joinedevent.map(
            ({
              id,
              data: {
                eventName,
                startDateTime,
                stopDateTime,
                maxPeople,
                Location,
                Description,
              },
            }) => (
              <HistoryList
                key={id}
                id={id}
                eventname={eventName}
                startdatetime={startDateTime}
                stopdatetime={stopDateTime}
                maxpeople={maxPeople}
                location={Location}
                description={Description}
              />
            )
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F2E9",
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    width: 80,
    height: 40,
    alignSelf: "center",
    marginTop: 55,
  },
  topBar: {
    alignItems: "stretch",
    width: "auto",
    backgroundColor: "#8D311A",
    height: 110,
  },
  title: {
    backgroundColor: "#E8C6B1",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 22,
    alignSelf: "flex-start",
    color: "#38130A",
    color: "#8D311A",
    marginLeft: 15,
  },
  settingBtn: {
    backgroundColor: "#f0ddcd",
    height: 45,
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 5,
  },
  settingText: {
    fontSize: 22,
    color: "#38130A",
    marginLeft: 15,
    color: "#8D311A",
  },
  logoutText: {
    fontSize: 22,
    color: "#38130A",
    marginLeft: 15,
    color: "black",
  },
  profileText: {
    fontSize: 25,
    alignSelf: "center",
    fontWeight: "bold",
  },
  logoutIcon: {
    marginTop: 60,
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 20,
  },
});

export default ProfileScreen;
