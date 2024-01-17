import React from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({navigation}) => {
  const [inputE, setInputE] = React.useState('');
  const [inputP, setInputP] = React.useState('');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const handle = async () => {
    try {
      const userQuerySnapshot = await firestore()
        .collection('users')
        .where('email', '==', inputE)
        .get();

      if (userQuerySnapshot.size === 0) {
        Alert.alert('User not found!');
        return;
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data();

      await auth().signInWithEmailAndPassword(inputE, inputP);

      const currentUser = auth().currentUser;
      if (currentUser) {
        console.log('Login successful!');
        navigation.navigate('Home');
      } else {
        console.error('Authentication failed.');
        Alert.alert('Authentication failed.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      Alert.alert('Error logging in:', error.message);
    }
  };

  const handleLinkPress = () => {
    console.log('Link pressed!');
  };
  const handleSignUpLinkPress = () => {
    navigation.navigate('SignUp');
  };
  const handleFacebookLogin =()=>{
    console.log("facebook login done.")
  }
  const handleGoogleLogin =()=>{
    console.log("Google login done.")
  }

  return (
    <View style={styles.container}>
      <View style={styles.pic}>
        <ImageBackground
          source={require('../Assets/firstv1.png')}
          style={styles.backgroundImage}>
          <View style={styles.texts}>
            <Text style={styles.fir}>Fitness Fuse</Text>
            <Text style={styles.sec}>LogIn to your account</Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.main}>
        <View style={styles.actualContent}>
          <View style={styles.inner}>
            <TextInput
              placeholder="Enter your email here"
              placeholderTextColor="#C0C0C0"
              style={{
                height: 50,
                borderColor: 'gray',
                borderBottomWidth: 1,
                borderRadius: 30,
                marginBottom: 20,
                paddingLeft: 20,
                color: 'white',
              }}
              value={inputE}
              onChangeText={setInputE}
            />
            <TextInput
              placeholder="Enter your password here"
              placeholderTextColor="#C0C0C0"
              style={{
                height: 50,
                color: 'white',
                borderColor: 'gray',
                borderBottomWidth: 1,
                borderRadius: 30,
                marginBottom: 10,
                paddingLeft: 20,
              }}
              value={inputP}
              onChangeText={setInputP}
              secureTextEntry
            />
            <View style={styles.Links}>
              <View onPress={handleLinkPress}>
                <Text style={styles.link}>Forgot password</Text>
              </View>
            </View>
          </View>
          <View style={styles.signu}>
            <View style={styles.la}>
            <TouchableOpacity onPress={handleFacebookLogin} >
              <Image
                source={require('../Assets/facebook.png.png')} 
                style={styles.socialLogo}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleGoogleLogin} style={styles.ganda}>
              <Image
                source={require('../Assets/google.png.png')} 
                style={styles.socialLogo}
              />
            </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.login} onPress={handle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  marginTop: 4,
                  color: 'white',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  pic: {
    height: '48%',
    borderBottomLeftRadius: 30,
  },
  backgroundImage: {
    height: '110%',
    borderBottomLeftRadius: 30,
  },
  texts: {
    marginTop: 220,
    marginLeft: 30,
  },
  fir: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: -10,
    color: 'white',
  },
  sec: {
    fontSize: 15,
    color: '#F5F5F5',
  },
  main: {
    backgroundColor: 'black',
    height: '90%',
    borderTopLeftRadius: 150,
  },
  actualContent: {
    alignSelf: 'center',
    marginTop: 90,
    width: '87%',
  },
  link: {
    color: 'red',
    marginLeft: 185,
  },
  Links: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop:6,
  },
  socialLogo: {
    width: 35,
    height: 35,
    
  },
  la:{
    flexDirection:'row',
    marginLeft:0,
  },
  ganda:{
    marginLeft:20,
  },
  login: {
    backgroundColor: 'red',
    height: 35,
    width:100,
    borderRadius: 20,
    marginLeft:70,
  },
  signu: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default SignInScreen;
