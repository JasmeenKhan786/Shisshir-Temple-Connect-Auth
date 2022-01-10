import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground, 
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import db from "../config";
import firebase from "firebase";
//Components

//JSX - JS and HTML/XML

//props - help you to pass values between components or classes
//states - help you to store values
//json
//this.setState({name:'Jasmeen'})

//Component Lifecycle:
// Mounting Updating Unmounting

//functional components

//Main axis - justifyContent
//Cross axis - alignItems

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "auth@gmail.com",
      pwd: "123456",
    };
  }

  logIn = async (email, password) => {
    var response = await db
      .collection("users")
      .where("email", "==", this.state.email)
      .where("type", "==", "auth")
      .get();

    if (response.docs.length != 0) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          alert("Logged In");
          this.props.navigation.replace("PoojaRequests");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage);
        });
    } else {
      alert("Sorry this account is not authorized");
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
       
          <ScrollView contentContainerStyle={{flex:1}}>
          <ImageBackground
          source={require("../assets/delaware-hindu-temple.jpg")}
          style={{ width: "100%", height: "100%", flex: 1 }}
        >
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                marginTop: '20%',
                marginLeft: "10%",
              }}
            >
              Login
            </Text>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                width: "80%",
                alignSelf: "center",
                marginTop: '30%',
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:'rgba(20,20,20,0.5)'
              }}
            >
              <FontAwesome name="at" size={20} color="white" />
              <TextInput
                style={{ width: "90%", paddingLeft: 20, height: 30, color:'white' }}
                placeholder="Email ID"
                placeholderTextColor={"white"}
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                width: "80%",
                alignSelf: "center",
                marginTop: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:'rgba(20,20,20,0.5)'

              }} 
            >
              <Feather name="lock" size={20} color="white" />
              <TextInput
                style={{ width: "90%", paddingLeft: 20, height: 30 , color:'white'}}
                placeholder="Password"
                placeholderTextColor={"white"}
                secureTextEntry
                onChangeText={(val) => {
                  this.setState({ pwd: val });
                }}
              />
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: "orange",
                width: "80%",
                alignSelf: "center",
                height: 40,
                marginTop: "30%",
                justifyContent: "center",
                borderColor: "orange",
              }}
              onPress={() => {
                if (this.state.email && this.state.pwd) {
                  this.logIn(this.state.email, this.state.pwd);
                } else {
                  alert("Please fill all fields");
                }
              }}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 18 }}
              >
                Login
              </Text>
            </TouchableOpacity>
        </ImageBackground>

          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
