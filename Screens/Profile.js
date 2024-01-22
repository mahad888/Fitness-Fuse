import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../Config/auth';
import EditProfileForm from '../Component/EditProfileForm';

const ProfileScreen = ({navigation}) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    height: '',
    weight: '',
    imageUrl: 'https://images.unsplash.com/photo-1611603640928-0a26c496f47e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvZHlidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  });
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const {isLoggedIn} = useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn) {
        const userId = auth().currentUser.uid;
        try {
          const userDoc = await firestore()
            .collection('users')
            .doc(userId)
            .get();

          if (userDoc.exists) {
            const data = userDoc.data();
            setUserData({
              name: data.name,
              email: data.email,
              password: data.password,
              phone: data.phone,
              height: data.height,
              weight: data.weight,
              imageUrl: data.imageUrl,
            });
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  const handleEdit = () => {
    console.log('edit done');
    navigation.navigate('EditProfileForm');
  };

  const handleDelete = async () => {
    console.log('delete done');
    try {
      const user = auth().currentUser;
      const userId = user.uid;

      await AsyncStorage.removeItem(userId);
      await user.delete();
      await firestore().collection('users').doc(userId).delete();

      Alert.alert('Success', 'Your profile has been deleted successfully.');
      navigation.navigate('LoadingScreen');
      
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('LoadingScreen');
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };
  const handlechange=()=>{
    navigation.navigate('Age')
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerLeftContainer}
          onPress={() => navigation.goBack()}>
          <Fontisto name="arrow-left" size={24} color="white" />
        </TouchableOpacity >

      </View>
      <View style={styles.PimageView}>
        <Image source={{uri: userData.imageUrl}} style={styles.image} />
        <Text style={styles.userName}>{userData.name}</Text>
      </View>
      <View style={styles.inner}>
        <View style={styles.email}>
          <Text style={{color: 'white', fontSize: 18}}>Email:</Text>
          <Text style={styles.textput}>{userData.email}</Text>
        </View>
        <View style={styles.pas}>
          <Text style={{color: 'white', fontSize: 18}}>Password:</Text>
          <Text style={styles.textput}>{userData.password}</Text>
        </View>
        <View style={styles.pho}>
          <Text style={{color: 'white', fontSize: 18}}>Phone:</Text>
          <Text style={styles.textput}>{userData.phone}</Text>
        </View>
        <View style={styles.height}>
          <Text style={{color: 'white', fontSize: 18}}>Height:</Text>
          <Text style={styles.textput}>{userData.height}</Text>
        </View>
        <View style={styles.weight}>
          <Text style={{color: 'white', fontSize: 18}}>Weight:</Text>
          <Text style={styles.textput}>{userData.weight}</Text>
        </View>
      </View>
    
      <View style={styles.buton}>
        <View style={styles.innerbutton}>
          <Pressable style={styles.signup} onPress={handleEdit}>
            <Text style={styles.signuptext}>Edit Profile</Text>
          </Pressable>
          <Pressable style={styles.login} onPress={handleDelete}>
            <Text style={styles.logintext}>Delete Profile</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.buton2}>
        <View style={styles.innerbutton2}>
          <Pressable style={styles.signout} onPress={handleLogout}>
            <Text style={styles.signuptext}>SignOut</Text>
          </Pressable>
          <Pressable style={styles.chn} onPress={handlechange}>
            <Text style={styles.logintext}>Complete Profile</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop:5
  },
  change: {
    marginRight: 50,
    backgroundColor:'red', width:170 , borderRadius:10
  },
  headerchange: {
    fontSize: 20,
    color: 'white',
    textAlign:'center',
  },
  headersign: {marginLeft: 10, backgroundColor:'red', width:90 , borderRadius:10},
  PimageView: {
    margintop: 50,
    marginBottom: 20,
    marginTop: 30,
  },
  logout:{
    fontSize: 20,
    textAlign:'center',
    color: 'white'
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    borderRadius: 60,
    borderWidth: 2,
  },
  userName: {
    fontSize: 20,
    margin: 14,
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  inner: {
    marginLeft: 20,
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
  },
  email: {
    flexDirection: 'row',
  },
  pas: {
    flexDirection: 'row',
  },
  pho: {
    flexDirection: 'row',
  },
  height: {
    flexDirection: 'row',
  },
  weight: {
    flexDirection: 'row',
  },
  textput: {
    // backgroundColor:'gray',
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
  },
  subhead: {
    fontSize: 18,
    margin: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  butt: {
    flexDirection: 'row',
    marginTop: 30,
    backgroundColor: 'yellow',
  },
  edit: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  delete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 100,
  },
  signup: {
    backgroundColor: 'black',
    height: 30,
    width: '42%',
    borderRadius: 10,
  },
  signout: {
    backgroundColor: 'red',
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
  chn: {
    backgroundColor: 'black',
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
    fontSize: 16,
  },
  logintext: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 16,
  },
  buton: {
    backgroundColor: '#2F4F4F',
    marginTop: 50,
    height: 45,
    width: '100%',
    borderRadius: 20,
  },
  buton2: {
    backgroundColor: '#2F4F4F',
    marginTop: 20,
    height: 45,
    width: '100%',
    borderRadius: 20,
  },
  innerbutton: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center',
  },
  innerbutton2: {
    flexDirection: 'row',
    padding: 10,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
