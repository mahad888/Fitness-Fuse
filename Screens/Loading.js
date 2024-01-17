import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log('Login pressed');
    navigation.navigate('SignIn'); 
  };

  const handleSignup = () => {
    console.log('Signup pressed');
    navigation.navigate('SignUp'); 
  };

  return (
    <ImageBackground
      source={require('../Assets/first.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.text}>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: 'white' }}>
            Fitness
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 40,
              marginTop: -10,
              color: 'white',
            }}
          >
            Fuse
          </Text>
          <Text style={{ fontSize: 15, color: '#F5F5F5' }}>
            Empower yourself to make the changes you need to make.
          </Text>
        </View>
        <View style={styles.buton}>
          <View style={styles.innerbutton}>
            <Pressable style={styles.signup} onPress={handleSignup}>
              <Text style={styles.signuptext}>Signup</Text>
            </Pressable>
            <Pressable style={styles.login} onPress={handleLogin}>
              <Text style={styles.logintext}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
  },
  container: {
    marginTop: '130%',
    marginLeft: '12%',
  },
  buton: {
    backgroundColor: '#2F4F4F',
    marginTop: 30,
    height: 45,
    width: '85%',
    borderRadius: 20,
  },
  innerbutton: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center',
  },
  signup: {
    backgroundColor: 'black',
    height: 30,
    width: '42%',
    borderRadius: 10,
  },
  login: {
    backgroundColor: 'red',
    height: 30,
    width: '42%',
    marginLeft: 10,
    borderRadius: 10,
  },
  signuptext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 17,
  },
  logintext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 17,
  },
});

export default Loading;
