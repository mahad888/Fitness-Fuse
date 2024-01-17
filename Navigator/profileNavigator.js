
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GenderScreen from '../Screens/gender';
import AgeScreen from '../Screens/age';


const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Gender"
    >
      <Stack.Screen name="Gender" component={GenderScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Age" component={AgeScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
