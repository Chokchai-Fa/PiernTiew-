import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import YourEventScreen from "./src/screens/YourEventScreen";
import AllChatScreen from "./src/screens/AllChatScreen";
import ChatScreen from "./src/screens/ChatScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import EditProfile from "./src/screens/EditProfile";
import SearchScreen from "./src/screens/SearchScreen";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { MaterialIcons } from "@expo/vector-icons";
import CreateEventScreen from "./src/screens/CreateEventScreen";
import EventDetailScreen from "./src/screens/EventDetailScreen";

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#8D311A" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

const Stack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const TabNavigator = () => (
  <Tabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Event") {
          iconName = "event";
        } else if (route.name === "Chat") {
          iconName = "chat";
        } else if (route.name === "Profile") {
          iconName = "person";
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#8D311A",
      inactiveTintColor: "gray",
    }}
  >
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Event" component={YourEventScreen} />
    <Tabs.Screen name="Chat" component={AllChatScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Tab" component={TabNavigator} />
        <Stack.Screen name="Edit" component={EditProfile} />
        <Stack.Screen name="Chatting" component={ChatScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        <Stack.Screen name="EventDetail" component={EventDetailScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
