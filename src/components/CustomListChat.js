import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../../firebase";
import * as firebase from "firebase";

const CustomListChat = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  }, []);

  useEffect(() => {
    let isMounted = true;
    const imageRef = firebase.storage().ref("/images/" + chatName);
    imageRef.getDownloadURL().then((url) => {
      //from url you can fetched the uploaded image easily
      if (isMounted) setImage(url);
    });
  }, []);

  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      key={id}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: image,
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListChat;

const styles = StyleSheet.create({});
