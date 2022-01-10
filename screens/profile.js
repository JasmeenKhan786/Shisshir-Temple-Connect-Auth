import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      account: '',
      address: '',
      image: '',
      email: firebase.auth().currentUser.email,
      id: '',
      city: '',
    };
  }
  getProfile = async () => {
    var temp = await db
      .collection('users')
      .where('email', '==', this.state.email)
      .get();

    temp.docs.map((doc) => {
      var obj = doc.data();
      this.setState({
        name: obj.name,
        city: obj.city,
        id: doc.id,
      });
    });
  };

  componentDidMount = () => {
    this.getProfile();
  };
  onSubmit = () => {
    db.collection('users').doc(this.state.id).update({
      name: this.state.name,
      city: this.state.city,
    }); 
    alert('profile updated');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={{
              color: 'black',
              fontSize: 18,
              justifyContent: 'space-between',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            Profile
          </Text> 
          <TouchableOpacity
            onPress={() => {
              firebase
                .auth()
                .signOut()
                .then(() => {
                  this.props.navigation.replace('Login');
                })
                .catch((error) => {
                  alert('Log Out Error, try later');
                });
            }}
            style={{}}>
            <Ionicons name="exit-outline" size={24} color="black" />
          </TouchableOpacity>
        </View> 

      
         <Image
         style={{width:'60%', height:150, borderRadius:10, alignSelf:'center', marginTop:30, resizeMode:'contain'}}
            source={{
              uri: 'https://media.istockphoto.com/vectors/cute-cartoon-vector-illustration-of-a-hinduist-temple-vector-id972680176?k=20&m=972680176&s=612x612&w=0&h=xS8vFKk4zq9CfHNJz4SKW6jQnEmai9EnF6IFRoHcgtg=',
            }}
          />

        <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
          Name
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            height: 30,
            backgroundColor: '#eee',
            borderColor: '#eee',
            paddingLeft: 10,
          }}
          value={this.state.name}
          placeholder="John Doe"
          onChangeText={(val) => {
            this.setState({ name: val });
          }}
        />

        <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
          Email
        </Text>
        <TextInput
        editable={false}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            height: 30,
            backgroundColor: '#eee',
            borderColor: '#eee',
            paddingLeft: 10,
          }}
          value={this.state.email}
          placeholder="johndoe@gmail.com"
        />
        <Text style={{ paddingLeft: 40, fontWeight: 'bold', marginTop: 20 }}>
          City
        </Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: '80%',
            alignSelf: 'center',
            height: 30,
            backgroundColor: '#eee',
            borderColor: '#eee',
            paddingLeft: 10,
          }}
          value={this.state.city}
          placeholder="35, Juhu, Mumbai"
          onChangeText={(val) => {
            this.setState({ city: val });
          }}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginTop: 40,
            borderColor: 'orange',
            borderWidth: 1,
            borderRadius: 5,
            width: '40%',
            backgroundColor: 'orange',
            padding: 6,
          }}
          onPress={this.onSubmit}>
          <Text style={{ textAlign: 'center', color: 'white' }}>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 80,
    paddingTop: 36,
    paddingHorizontal: 20,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
  },
});
