import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../../firebase";
import { Ionicons } from "@expo/vector-icons";
import CustomListChat from "../components/CustomListChat";

const AllChatScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .where("Joined", "array-contains", auth.currentUser.uid)
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate("Chatting", {
      id,
      chatName,
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
        <Text style={styles.titleText}>CHAT</Text>
      </View>

      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListChat
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
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
    fontWeight: "bold",
    color: "#8D311A",
  },
});

export default AllChatScreen;
