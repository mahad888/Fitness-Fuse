import React from 'react';
import {
  View,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Alert,
  Pressable,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  GoogleOneTapSignIn,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';


const SignupScreen = ({navigation}) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(true);


  const handle = async () => {
    if (password.length < 8) {
      Alert.alert('Password must be at least 8 characters long.');
      return;
    }
  
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;
  
      if (currentUser) {
        await firestore().collection('users').doc(currentUser.uid).set({
          name,
          email,
          password,
          phone,
        });
        navigation.navigate('SignIn'); 
  
        console.log('User created successfully');
        Alert.alert('Sign Up successful! Please login.');
  
        // await auth().signOut();
  
        // navigation.navigate('Gender');
      } else {
        console.error('Error creating user: Current user is null');
      }
    } catch (error) {
      console.error('Error creating user:', error.message);
    }
  };
  
  
  const handleSignUpLinkPress = () => {
    console.log('pressed')
    navigation.navigate('SignIn');
  };
  const handleGoogle1 = async () => {
    try {
      await GoogleSignin.configure();

      const {idToken, user} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      const currentUser = auth().currentUser;
      console.log('Firebase User:', currentUser);

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services Not Available');
      } else {
        console.error('Google Sign In Error:', error);
      }
    }
  };
  const handleGoogle = async () => {
    const navigation = useNavigation();

    try {
      await GoogleSignin.configure();

      const {idToken, user} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(googleCredential);

      const currentUser = auth().currentUser;
      console.log('Firebase User:', currentUser);

      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Google Sign In Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Google Sign In Progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Google Play Services Not Available');
      } else {
        console.error('Google Sign In Error:', error);
      }
    }
  };

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
              placeholder="Name"
              placeholderTextColor="#C0C0C0"
              style={{
                height: 50,
                borderColor: 'gray',
                borderBottomWidth: 1,
                borderRadius: 30,
                marginBottom: 5,
                paddingLeft: 20,
                color: 'white',
              }}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#C0C0C0"
              style={{
                height: 50,
                color: 'white',
                borderColor: 'gray',
                borderBottomWidth: 1,
                borderRadius: 30,
                marginBottom: 5,
                paddingLeft: 20,
              }}
              value={email}
              onChangeText={setEmail}
              
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#C0C0C0"
              style={{
                height: 50,
                color: 'white',
                borderColor: 'gray',
                borderBottomWidth: 1,
                borderRadius: 30,
                marginBottom: 5,
                paddingLeft: 20,
              }}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#C0C0C0"
              style={{
                height: 50,
                color: 'white',
                borderColor: 'gray',
                borderBottomWidth: 1,
                borderRadius: 30,
                marginBottom: 5,
                paddingLeft: 20,
              }}
              value={phone}
              onChangeText={setPhone}
            />
            <View style={styles.Links}>
              <Pressable onPress={handleSignUpLinkPress} style={styles.p1}>
                <Text style={styles.link}>Already have account?</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.signu}>
            <TouchableOpacity style={styles.login} onPress={handle}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  marginTop: 4,
                  color: 'white',
                }}>
                SignUp
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
    height: '45%',
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
    marginTop: 60,
    width: '87%',
  },
  link: {
    color: 'red',
    marginLeft: 149,
  },
  Links: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 6,
  },
  p1:{textAlign:'center',},
  socialLogo: {
    width: 35,
    height: 35,
  },
  la: {
    flexDirection: 'row',
    marginLeft: 0,
  },
  ganda: {
    marginLeft: 20,
  },
  login: {
    backgroundColor: 'red',
    height: 35,
    width: 120,
    borderRadius: 20,
    marginLeft: 140,
  },
  signu: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
});

export default SignupScreen;
