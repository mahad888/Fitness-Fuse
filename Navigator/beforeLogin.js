import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Loading from '../Screens/Loading';
import SignInScreen from '../Screens/Login';
import SignupScreen from '../Screens/signup';
import GenderScreen from '../Screens/gender';
import AgeScreen from '../Screens/age';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Loading">
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{headerShown: false}}
      />
      <Stack.Screen name="SignUp" component={SignupScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
}
