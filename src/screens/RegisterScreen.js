import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  Button,
  View,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Keyboard,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emptyState = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert("First name is required");
    } else if (!email) {
      Alert.alert("Email field is required.");
    } else if (!password) {
      Alert.alert("Password field is required.");
    } else if (!confirmPassword) {
      setPassword("");
      Alert.alert("Confirm password field is required.");
    } else if (password !== confirmPassword) {
      Alert.alert("Password does not match!");
    } else {
      registration(email, password, lastName, firstName);
      emptyState();
    }
  };

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
        });
        console.log(authUser);
      })
      .catch((error) => alert(error.message));
  };

  const [image, setImage] = useState(
    "https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png"
  );

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

    var ref = storage.ref().child("profileimage/" + imageName);
    return ref.put(blob);
  };

  const onChooseImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={require("../../assets/Logo/logo2.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.title}>
        <Text style={styles.titleText}>REGISTER WITH</Text>
      </View>

      <ScrollView onBlur={Keyboard.dismiss}>
        <Text style={styles.inputTitle}>NAME :</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
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
          placeholder="Username*"
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <Text style={styles.inputTitle}>E-MAIL :</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 300,
            height: 40,
            marginTop: 3,
            marginLeft: 15,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Email*"
          value={email}
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />

        <Text style={styles.inputTitle}>PASSWORD :</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 300,
            height: 40,
            marginTop: 3,
            marginLeft: 15,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Enter your password*"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputTitle}>CONFIRM PASSWORD :</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: "#8D311A",
            backgroundColor: "#FFFFFF",
            fontSize: 18,
            width: 300,
            height: 40,
            marginTop: 3,
            marginLeft: 15,
            borderRadius: 10,
            paddingLeft: 10,
          }}
          placeholder="Retype your password to confirm*"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
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
          <Text style={styles.createText}>Select Profile Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => {
            uploadImage(image, email)
              // .then(() => {
              //   Alert.alert("Success");
              // })
              // .catch((error) => {
              //   Alert.alert(error);
              // })
              .then(() => register());
          }}
        >
          <Text style={styles.createText}>SIGN UP</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.inlineText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#8D311A", marginTop: 15, marginLeft: 5 }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F2E9",
    flex: 1,
  },
  imageStyle: {
    width: 80,
    height: 40,
    alignSelf: "center",
    marginTop: 25,
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
    marginTop: 8,
    color: "#38130A",
    marginLeft: 15,
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
  inlineText: {
    marginTop: 15,
    color: "black",
    alignSelf: "center",
  },
});

export default RegisterScreen;
