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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import EventList from "../components/EventList";

const YourEventScreen = ({ navigation }) => {
  const [joinedevent, setJoinedevent] = useState([]);
  const [ownerevent, setOwnerevent] = useState([]);

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

  useEffect(() => {
    const unsubscribe = db
      .collection("Event")
      .where("Owner", "array-contains", auth.currentUser.uid)
      .onSnapshot((snapshot) =>
        setOwnerevent(
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
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>YOUR EVENT</Text>
      </View>

      <ScrollView>
        <View style={styles.type}>
          <Text style={styles.typeText}>OWNER</Text>
        </View>
        {ownerevent.map(
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

        <View style={styles.type}>
          <Text style={styles.typeText}>JOINED</Text>
        </View>
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
  typeText: {
    fontSize: 22,
    alignSelf: "flex-start",
    color: "#38130A",
    marginLeft: 20,
  },
  type: {
    backgroundColor: "#E8C6B1",
    height: 45,
    justifyContent: "center",
    borderTopColor: "#8D311A",
    borderTopWidth: 2,
    borderRadius: 10,
  },
});

export default YourEventScreen;
