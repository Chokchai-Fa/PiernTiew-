import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { auth, db } from "../../firebase";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import EventList from "../components/EventList";

const HomeScreen = ({ navigation }) => {
  const [Event, setEvent] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("Event")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setEvent(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  const enterEventDetail = (id) => {
    navigation.navigate("EventDetail", {
      id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Feather name="search" size={30} color="#F6F2E9" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationIcon}>
          <MaterialIcons
            name="notifications-active"
            size={30}
            color="#F6F2E9"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("CreateEvent")}
        style={styles.createEventBtn}
      >
        <Ionicons
          name="create-outline"
          size={35}
          color="black"
          style={{ marginLeft: 10 }}
        />
        <Text style={styles.createText}>CREATE EVENT</Text>
      </TouchableOpacity>
      <ScrollView>
        {Event.map(
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
            <EventList
              key={id}
              id={id}
              eventname={eventName}
              startdatetime={startDateTime}
              stopdatetime={stopDateTime}
              maxpeople={maxPeople}
              location={Location}
              description={Description}
              enterEventDetail={enterEventDetail}
            />
          )
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
  searchIcon: {
    marginTop: 60,
    position: "absolute",
    alignSelf: "flex-end",
    paddingRight: 20,
  },
  notificationIcon: {
    marginTop: 60,
    position: "absolute",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  createEventBtn: {
    backgroundColor: "#E8C6B1",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
  },
  createText: {
    fontSize: 22,
    color: "#38130A",
  },
});
