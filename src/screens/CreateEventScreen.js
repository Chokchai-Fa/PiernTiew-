import React, { useState, useEffect, createElement } from "react";
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
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { auth, db, storage } from "../../firebase";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { Touchable } from "react-native";

const CreateEventScreen = ({ navigation }) => {
  //DatePicker Component
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [startdatetime, setstartDateTime] = useState(
    moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")
  );
  const [stopdatetime, setstopDateTime] = useState(
    moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")
  );
  const [chosenMode, setChosenMode] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    if (chosenMode) {
      /* Here, use the same date in both branches of the if statement */
      setstartDateTime(moment(date).format("MMMM Do YYYY, h:mm:ss a"));
    } else {
      /* `date` is used again */
      setstopDateTime(moment(date).format("MMMM Do YYYY, h:mm:ss a"));
    }

    hideDatePicker();
  };

  const [eventname, setEventame] = useState("");
  const [maxpeople, setMaxpeople] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const createEvent = async () => {
    await db
      .collection("Event")
      .add({
        eventName: eventname,
        startDateTime: startdatetime,
        stopDateTime: stopdatetime,
        maxPeople: maxpeople,
        Location: location,
        Description: description,
        Owner: [auth.currentUser.uid],
        Joined: [auth.currentUser.uid],
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((error) => alert(error));
  };

  const createChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: eventname,
        Owner: [auth.currentUser.uid],
        Joined: [auth.currentUser.uid],
      })
      .catch((error) => alert(error));
  };

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = storage.ref().child("images/" + imageName);
    return ref.put(blob);
  };

  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // console.log(image);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo1.png")}
          style={styles.imageStyle}
        />
        <TouchableOpacity
          style={styles.backIcon}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="arrow-back" size={30} color="#F6F2E9" />
        </TouchableOpacity>
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>CREATE EVENT</Text>
      </View>
      <ScrollView>
        <Text style={styles.inputTitle}>EVENT NAME :</Text>
        <TextInput
          value={eventname}
          onChangeText={(text) => setEventame(text)}
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 250,
            height: 40,
            marginTop: 10,
            marginLeft: 20,
            borderRadius: 10,
            paddingLeft: 10,
          }}
        />

        <Text style={styles.inputTitle}>DATE AND TIME :</Text>
        <View style={styles.datePickerContainer}>
          <View>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => {
                showDatePicker();
                setChosenMode(true);
              }}
            >
              <Text>{startdatetime}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="datetime"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>

          <Text style={styles.inputTitle}> To </Text>

          <View>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => {
                showDatePicker();
                setChosenMode(false);
              }}
            >
              <Text>{stopdatetime}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.inputTitle}>MAX PEOPLE :</Text>
        <TextInput
          value={maxpeople}
          onChangeText={(number) => setMaxpeople(parseInt(number))}
          keyboardType={"numeric"}
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 75,
            height: 40,
            marginTop: 10,
            marginLeft: 20,
            borderRadius: 10,
            paddingLeft: 10,
          }}
        />
        <Text style={styles.inputTitle}>LOCATION :</Text>
        <TextInput
          value={location}
          onChangeText={(text) => setLocation(text)}
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 300,
            height: 40,
            marginTop: 10,
            marginLeft: 20,
            borderRadius: 10,
            paddingLeft: 10,
          }}
        />

        <TouchableOpacity
          style={{
            width: 200,
            height: 50,
            borderRadius: 30,
            borderWidth: 3,
            borderColor: "#8D311A",
            alignSelf: "center",
            backgroundColor: "#E8C6B1",
            marginTop: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={onChooseImagePress}
        >
          <Text style={styles.createText}>UPLOAD IMAGE</Text>
        </TouchableOpacity>

        <Text style={styles.inputTitle}>DESCRIPTION :</Text>
        <TextInput
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          textAlignVertical="top"
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: "90%",
            height: 350,
            marginTop: 10,
            marginLeft: 20,
            borderRadius: 10,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        />
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => {
            createEvent();
            uploadImage(image, eventname)
              .then(() => {
                Alert.alert("Success");
              })
              .catch((error) => {
                Alert.alert(error);
              })
              .then(() => createChat())
              .then(() => navigation.navigate("Home"));
          }}
        >
          <Text style={styles.createText}>CREATE</Text>
        </TouchableOpacity>

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
  inputTitle: {
    fontSize: 18,
    marginTop: 15,
    color: "#38130A",
    marginLeft: 10,
  },
  datePickerContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  datePicker: {
    borderWidth: 1,
    borderColor: "#8D311A",
    backgroundColor: "#FFFFFF",
    fontSize: 18,
    width: 150,
    height: 50,
    marginLeft: 20,
    borderRadius: 10,
    paddingLeft: 10,
    justifyContent: "center",
  },
  createBtn: {
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
  createText: {
    fontSize: 20,
  },
});

export default CreateEventScreen;
