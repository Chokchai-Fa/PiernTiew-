import React, { useState, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { auth } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Tab");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            source={require("../../assets/Logo/logo2.png")}
            style={styles.imageStyle}
          />
          <TextInput
            style={styles.inputtextStyle}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="EMAIL"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.inputtextStyle}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            placeholder="PASSWORD"
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
          <TouchableOpacity style={styles.loginBtn} onPress={signIn}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.loginText}>SIGNUP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6F2E9",
    flex: 1,
  },
  imageStyle: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginTop: 80,
  },
  inputtextStyle: {
    width: 300,
    height: 50,
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#8D311A",
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    fontSize: 18,
    marginBottom: 30,
    paddingLeft: 20,
  },
  loginBtn: {
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
  loginText: {
    fontSize: 20,
  },
  registerBtn: {
    width: 130,
    height: 50,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#8D311A",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginScreen;
