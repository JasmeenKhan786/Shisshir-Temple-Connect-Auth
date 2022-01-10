import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

//Cross axis - alignItems
import db from '../config';
import { LinearGradient } from 'expo-linear-gradient';
export default class PoojaRequestDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      request: '',
      response: '',
    };
  }
  async componentDidMount() {
    var id = this.props.route.params.id;

    var resp = await db.collection('Pooja Requests').doc(id).get();
    this.setState({ request: resp.data() });
  }

  update = () => {
    db.collection('Pooja Requests').doc(this.props.route.params.id).update({
      response: this.state.response,
      responseStatus: 'Responded',
    });
    alert('Response Sent');
    this.props.navigation.navigate('PoojaRequests')
  };
 
  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PoojaRequests')}
          style={{ padding: 10, marginTop:'10%' }}>
          <AntDesign name="back" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <TouchableOpacity
            style={{
              margin: '5%',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 200,
              borderRadius: 30,
            }}>
            <LinearGradient
              colors={['#f9d976', '#f39f86']}
              style={{
                width: '100%',

                borderRadius: 30,
                paddingTop: 20,
                paddingBottom: 10,
                justifyContent: 'space-evenly',
              }}>
              <Text
                style={{ fontSize: 20, alignSelf: 'center',marginTop:10 }}>
                Name: {this.state.request.name}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginHorizontal: '5%',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    backgroundColor: 'white',
                    padding: 5,
                  }}>
                  <Text>{this.state.request.dateStart}</Text>
                  <Text>{this.state.request.dateEnd}</Text>
                </View>
                <Text style={{ fontWeight: 'bold' }}>
                  Status: {this.state.request.responseStatus}
                </Text>
              </View>
              <View style={{ marginLeft: '5%',marginTop:30 }}>
                <Text>Seva Name: {this.state.request.sevaName}</Text>
                <Text>{this.state.request.additionalPersons}</Text>
                <Text>Gothram: {this.state.request.gotram}</Text>
                <Text>
                  Other Gothrams :{this.state.request.additionalPersonsGotram}
                </Text>
                <Text>Price: {this.state.request.price}</Text>
                <Text style={{ marginBottom: 20 }}>
                  Additional Requests: {this.state.request.anythingElse}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={{ paddingLeft: 5, marginTop: 70, fontSize: 25 }}>
            Respond to the devotee
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              marginTop: 30,
              borderRadius: 15,
              height: 150,
              width: '80%',
              alignSelf: 'center',
            }}
            onChangeText={(val) => {
              this.setState({ response: val });
            }}></TextInput>
          <TouchableOpacity
            onPress={() => {
              this.update();
            }}
            style={{
              alignSelf: 'center',
              width: '75%',
              height: 50,
              borderWidth: 1,
              backgroundColor: 'orange',
              borderRadius: 20,
              marginTop: 20,
              borderColor: 'orange',
            }}>
            <Text
              style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
              Update
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
