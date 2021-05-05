import React, { useLayoutEffect, useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import { auth, db } from "../../firebase";
import { ScrollView } from "react-native";

const EventDetailScreen = ({ navigation, route }) => {
  const [event, setEvent] = useState([]);
  const [chatid, setChatid] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("Event")
      .doc(route.params.id)
      .onSnapshot((snapshot) => {
        setEvent(snapshot.data());
      });
    return unsubscribe;
  }, [route]);

  useEffect(() => {
    if (event.eventName) {
      const unsubscribe = db
        .collection("chats")
        .where("chatName", "==", event.eventName)
        .onSnapshot((snapshot) =>
          setChatid(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      return unsubscribe;
    }
  }, [event]);

  const takeImage = () => {
    const imageRef = firebase.storage().ref("/images/" + event.eventName);
    imageRef
      .getDownloadURL()
      .then((url) => {
        setImage(url);
      })
      .catch((e) => console.log("getting downloadURL of image error => ", e));
  };

  const joinEvent = () => {
    db.collection("Event")
      .doc(route.params.id)
      .update({
        Joined: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      });

    db.collection("chats")
      .doc(chatid[0].id)
      .update({
        Joined: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.uid),
      })
      .then(() => {
        navigation.navigate("Home");
      });
  };

  const leaveEvent = () => {
    db.collection("Event")
      .doc(route.params.id)
      .update({
        Joined: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
      });

    db.collection("chats")
      .doc(chatid[0].id)
      .update({
        Joined: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.uid),
      })
      .then(() => {
        navigation.navigate("Home");
      });
  };

  event.eventName && takeImage();

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#F6F2E9" />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>EVENT DETAIL</Text>
      </View>
      <ScrollView>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>EVENT NAME : </Text>
          <Text style={{ fontSize: 18 }}>{event.eventName}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>MAXPEOPLE : </Text>
          <Text style={{ fontSize: 18 }}>{event.maxPeople}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>START : </Text>
          <Text style={{ fontSize: 18 }}>{event.startDateTime}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>FINISH : </Text>
          <Text style={{ fontSize: 18 }}>{event.stopDateTime}</Text>
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>LOCATION : </Text>
          <Text style={{ fontSize: 18 }}>{event.Location}</Text>
        </View>

        <View>
          {image ? (
            <Image
              source={{ uri: `${image}` }}
              style={{
                alignSelf: "center",
                marginTop: 10,
                borderRadius: 10,
                width: "90%",
                height: 300,
              }}
            ></Image>
          ) : (
            <Text style={styles.titleText}>Loading...</Text>
          )}
        </View>

        <View style={{ marginTop: 15 }}>
          <Text style={styles.detailText}>DESCRIPTION : </Text>
          <Text style={{ fontSize: 18, margin: 20 }}>{event.Description}</Text>
        </View>

        {event.Joined instanceof Object ? (
          event.Joined.includes(auth.currentUser.uid) ? (
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => {
                leaveEvent();
              }}
            >
              <Text style={styles.joinText}>LEAVE</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => {
                joinEvent();
              }}
            >
              <Text style={styles.joinText}>JOIN</Text>
            </TouchableOpacity>
          )
        ) : (
          <Text>Fetching, Please Wait... </Text>
        )}

        <View style={{ height: 50 }}></View>
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
  detailText: {
    fontSize: 18,
    color: "#38130A",
    marginLeft: 10,
    fontWeight: "bold",
  },
  detailContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  joinBtn: {
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
  },
  joinText: {
    fontSize: 20,
  },
});

export default EventDetailScreen;
