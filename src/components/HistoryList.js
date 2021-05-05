import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { auth, db } from "../../firebase";

const HistoryList = ({
  id,
  eventname,
  startdatetime,
  stopdatetime,
  location,
}) => {
  return (
    <ListItem
      containerStyle={{ backgroundColor: "#F6F2E9" }}
      key={id}
      bottomDivider
    >
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800", marginBottom: 5 }}>
          {eventname}
        </ListItem.Title>
        <ListItem.Subtitle>Start At: {startdatetime}</ListItem.Subtitle>
        <ListItem.Subtitle>End At: {stopdatetime}</ListItem.Subtitle>
        <ListItem.Subtitle>Location: {location}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default HistoryList;

const styles = StyleSheet.create({});
