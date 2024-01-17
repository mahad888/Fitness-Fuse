import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './beforeLogin';
import TabNavigator from './tabNavigator';
import { useAuth } from '../Config/auth';

const App1 = () => {
  const { isLoggedIn } = useAuth();
  if(isLoggedIn){
    console.log("loged in")
  }
  else{console.log("not loged in")}

  return (
    <NavigationContainer>
      {isLoggedIn ? <TabNavigator /> : <AppNavigator />}
    </NavigationContainer>
  );
};

export default App1;
