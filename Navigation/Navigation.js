import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';

import Loading from '../screens/Loading';
import PoojaRequest from '../screens/PoojaRequests';
import PoojaRequestDetails from '../screens/PoojaRequestDetails';
import Login from '../screens/Login';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Profile from '../screens/profile';
const Stack1 = createStackNavigator();

const PoojaStack = () => {
  return (
    <Stack1.Navigator>
      <Stack1.Screen
        name="PoojaRequests"
        component={PoojaRequest}
        options={{ headerShown: false }}
      />
      <Stack1.Screen
        name="PoojaRequestDetails"
        component={PoojaRequestDetails}
        options={{ headerShown: false }}
      />
    </Stack1.Navigator>
  );
};

const Tab = createMaterialBottomTabNavigator();

const TabContent = () => {
  return (
    <Tab.Navigator
      initialRouteName="PoojaRequests"
      activeColor="#f0edf6"
      inactiveColor="#3e2465"
      labeled={true}
      barStyle={{ backgroundColor: 'orange' }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

           if (route.name === 'Home') {
            return <Ionicons name={"home-outline"} size={20} color={color} />;
          } else if (route.name === 'Profile') {
            return <Ionicons name="person-circle-outline" size={24} color={color} />
          } 
        },
        
      })}>
      <Tab.Screen name="Home" component={PoojaStack} />
      <Tab.Screen name="Profile" component={Profile} />

    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PoojaRequests"
        component={TabContent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
