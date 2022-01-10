import * as React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import db from "../config";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

//Cross axis - alignItems

//Array
//Map and Scrollview
//Flatlist

export default class PoojaRequests extends React.Component {
  constructor() {
    super();
    this.state = {
      requests: [],
    };
  }
  getData = async () => {
    this.setState({ requests: [] });
    var response = await db.collection("Pooja Requests").get();
    response.docs.map((a) => {
      var temp = this.state.requests;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ requests: temp });
    });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: "5%",
              alignItems: "center",
              paddingTop: 40,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                width: "70%",
                color: "orange",
              }}
            >
              Current Pooja Requests
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Profile");
              }}
            >
              <Ionicons name="person-circle-sharp" size={50} color="orange" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 30, flex: 1 }}>
            {this.state.requests.length === 0 ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{marginTop:'30%', fontSize:18}}>Requests will appear here!</Text>
              </View>
            ) : (
              this.state.requests.map((d) => {
                return (
                  <TouchableOpacity
                  key={d.id}
                    style={{
                      marginTop: 10,
                      width: "90%",
                      alignSelf: "center",
                      borderRadius: 10,
                    }}
                    onPress={() => {
                      this.props.navigation.navigate("PoojaRequestDetails", {
                        id: d.id,
                      });
                    }}
                  >
                    <LinearGradient
                      colors={["#f9d976", "#f39f86"]}
                      start={{ x: 0.7, y: 0.8 }}
                      style={{
                        borderRadius: 10,
                        padding: 10,
                        flex: 1,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {d.name}
                        </Text>
                        <Text
                          style={{
                            backgroundColor: "white",
                            padding: 5,
                            borderRadius: 5,
                          }}
                        >
                          {d.responseStatus}
                        </Text>
                      </View>

                      <Text style={{ color: "grey" }}>{d.dateStart}</Text>
                      <Text style={{ color: "grey" }}>{d.dateEnd}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
