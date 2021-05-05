import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-elements";
import { auth, db } from "../../firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const imageRef = firebase
      .storage()
      .ref("/profileimage/" + auth.currentUser.email);
    imageRef.getDownloadURL().then((url) => {
      setImage(url);
    });
  }, []);

  const scrollViewRef = useRef();

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chevron-back" size={24} color="#F6F2E9" />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>{route.params.chatName}</Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView
            contentContainerStyle={{ paddingTop: 15 }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {messages.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View key={id} style={styles.reciever}>
                  <Avatar
                    position="absolute"
                    rounded
                    // WEB
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                      size: 30,
                    }}
                    bottom={-15}
                    right={-5}
                    size={30}
                    source={{
                      uri: image,
                    }}
                  />
                  <Text style={styles.recieverText}>{data.message}</Text>
                </View>
              ) : (
                <View key={id} style={styles.sender}>
                  <Avatar
                    position="absolute"
                    rounded
                    // WEB
                    containerStyle={{
                      position: "absolute",
                      bottom: -15,
                      right: -5,
                      size: 30,
                    }}
                    bottom={-15}
                    right={-5}
                    size={30}
                  />
                  <Text style={styles.senderText}>{data.message}</Text>
                  <Text style={styles.senderName}>{data.displayName}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              value={input}
              placeholder="Type Message Here"
              style={styles.textInput}
              onChangeText={(text) => setInput(text)}
              onSubmitEditing={sendMessage}
              autoCorrect={false}
            />
            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
              <Ionicons
                style={{ marginLeft: 8 }}
                name="send"
                size={24}
                color="#8D311A"
              />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
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
  backIcon: {
    marginTop: 65,
    position: "absolute",
    alignSelf: "flex-start",
    paddingLeft: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginLeft: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  recieverText: {
    color: "#38130A",
    fontWeight: "500",
    marginLeft: 0,
    marginBottom: 15,
  },
  senderText: {
    color: "#38130A",
    fontWeight: "500",
    marginLeft: 0,
    marginBottom: 15,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#F0DDCD",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "black",
  },
});

export default ChatScreen;
