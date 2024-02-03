import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useAuth} from '../Config/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const handlePress = () => {
    console.log('1 pressed');
    navigation.navigate('Profile');
  };
  const categoriesPressHandler = () => {
    navigation.navigate('Categories');
  };
  const dietsPressHandler = () => {
    navigation.navigate('Diet');
  };
  const trainersPressHandler = () => {
    console.log('4 pressed');
    navigation.navigate('Trainer');
  };
  const [userData, setUserData] = useState({
    name: '',
    imageUrl:
      'https://images.unsplash.com/photo-1611603640928-0a26c496f47e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJvZHlidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D',
  });

  // Storing Fetched image in this state to display
  const [profileImage, setProfileImage] = useState(
    require('../Assets/default-img.jpg'),
  );

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
              imageUrl: data.imageUrl,
            });
          } else {
            console.log('User document does not exist');
          }

          //Fetching image stored on AsyncStorage while creating profile
          const storedProfileImage = await AsyncStorage.getItem('profileImage');
          if (storedProfileImage) {
            setProfileImage({uri: storedProfileImage});
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.intro}>
        <View style={styles.introText}>
          <Text style={styles.headingStyle}>Hello, {userData.name}</Text>
          <Text style={styles.textStyle}>Let's start your day</Text>
        </View>
        <Image source={profileImage} style={styles.homeImg} />
      </View>

      {/* Plans container */}
      <Text style={styles.planHead}>Warmup Exercises</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.plansContainer}>
          <View style={styles.plans}>
            <View style={styles.card}>
              <TouchableOpacity onPress={handlePress}>
                <ImageBackground
                  source={require('../Assets/jogging.png')}
                  resizeMode="cover"
                  style={styles.planImg}>
                  <Text style={styles.plansText}>Jogging</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>

            <View style={styles.card}>
              <ImageBackground
                source={require('../Assets/pushup.png')}
                resizeMode="cover"
                style={styles.planImg}>
                <Text style={styles.plansText}>Push-Up</Text>
              </ImageBackground>
            </View>

            <View style={styles.card}>
              <ImageBackground
                source={require('../Assets/cycling.png')}
                resizeMode="cover"
                style={styles.planImg}>
                <Text style={styles.plansText}>Cycling</Text>
              </ImageBackground>
            </View>

            <View style={styles.card}>
              <ImageBackground
                source={require('../Assets/battle-rope.png')}
                resizeMode="cover"
                style={styles.planImg}>
                <Text style={styles.plansText}>Battle Roap</Text>
              </ImageBackground>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Categories container */}
      <View style={styles.intros}>
        <Text style={styles.heading1}>Categories</Text>
        <TouchableOpacity onPress={categoriesPressHandler}>
          <Text style={styles.heading2}>See All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categories}>
          <View style={styles.categoriesCard}>
            <ImageBackground
              source={require('../Assets/gym.png')}
              style={styles.categoriesImg}>
              <Text style={styles.categoriesText}>Gym</Text>
            </ImageBackground>
          </View>

          <View style={styles.categoriesCard}>
            <ImageBackground
              source={require('../Assets/yoga.png')}
              style={styles.categoriesImg}>
              <Text style={styles.categoriesText}>Push-Up</Text>
            </ImageBackground>
          </View>

          <View style={styles.categoriesCard}>
            <ImageBackground
              source={require('../Assets/fitness.png')}
              style={styles.categoriesImg}>
              <Text style={styles.categoriesText}>Fitness</Text>
            </ImageBackground>
          </View>

          <View style={styles.categoriesCard}>
            <ImageBackground
              source={require('../Assets/aerobics.png')}
              style={styles.categoriesImg}>
              <Text style={styles.categoriesText}>Aerobics</Text>
            </ImageBackground>
          </View>

          <View style={styles.categoriesCard}>
            <ImageBackground
              source={require('../Assets/back.png')}
              style={styles.categoriesImg}>
              <Text style={styles.categoriesText}>Back</Text>
            </ImageBackground>
          </View>
        </View>
      </ScrollView>

      <View style={styles.intros}>
        <Text style={styles.heading1}>Trainer</Text>
        <TouchableOpacity onPress={trainersPressHandler}>
          <Text style={styles.heading2}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Trainers Container */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.trainersContainer}>
          <View style={styles.trainersCard}>
            <Image
              source={require('../Assets/Richard.png')}
              style={styles.trainersImg}
            />
            <Text style={styles.trainersName}>Richard</Text>
          </View>
          <View style={styles.trainersCard}>
            <Image
              source={require('../Assets/Jennifier.png')}
              style={styles.trainersImg}
            />
            <Text style={styles.trainersName}>Jennifier</Text>
          </View>
          <View style={styles.trainersCard}>
            <Image
              source={require('../Assets/Brian.png')}
              style={styles.trainersImg}
            />
            <Text style={styles.trainersName}>Brian</Text>
          </View>
          <View style={styles.trainersCard}>
            <Image
              source={require('../Assets/Rebacca.png')}
              style={styles.trainersImg}
            />
            <Text style={styles.trainersName}>Rebacca</Text>
          </View>
          <View style={styles.trainersCard}>
            <Image
              source={require('../Assets/Emily.png')}
              style={styles.trainersImg}
            />
            <Text style={styles.trainersName}>Emily</Text>
          </View>
          <View style={styles.trainersCard}>
            <Image
              source={require('../Assets/Ronald.png')}
              style={styles.trainersImg}
            />
            <Text style={styles.trainersName}>Ronald</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.intros}>
        <Text style={styles.heading1}>Diet Plans</Text>
        <TouchableOpacity onPress={dietsPressHandler}>
          <Text style={styles.heading2}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Diet plans container */}
      <View style={styles.dietsSection}>
        <View style={styles.dietsCard}>
          <ImageBackground
            source={require('../Assets/Oatmeal.png')}
            style={styles.dietsImg}>
            <Text style={styles.dietsText}>Oatmeal</Text>
          </ImageBackground>
        </View>

        <View style={styles.dietsCard}>
          <ImageBackground
            source={require('../Assets/Waffles.png')}
            style={styles.dietsImg}>
            <Text style={styles.dietsText}>Waffles</Text>
          </ImageBackground>
        </View>
      </View>

      <View style={styles.dietsSection}>
        <View style={styles.dietsCard}>
          <ImageBackground
            source={require('../Assets/Cornflakes.png')}
            style={styles.dietsImg}>
            <Text style={styles.dietsText}>Cornflakes</Text>
          </ImageBackground>
        </View>

        <View style={styles.dietsCard}>
          <ImageBackground
            source={require('../Assets/Fruits-Salad.png')}
            style={styles.dietsImg}>
            <Text style={styles.dietsText}>Fruits Salad</Text>
          </ImageBackground>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    color: 'white',
  },
  intro: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    marginVertical: 10,
  },
  headingStyle: {
    color: '#fff',
    fontSize: 16,
  },
  textStyle: {
    color: '#fff',
    fontSize: 24,
  },
  homeImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: 5,
  },

  planHead: {
    color: '#fff',
    fontSize: 16,
    marginLeft: '4%'
  },
  plans: {
    flexDirection: 'row',
    marginRight: 15,
    borderRadius: 50,
  },

  planImg: {
    marginLeft: 15,
    marginTop: 10,
    width: 148,
    height: 169,
    borderRadius: 50,
  },
  plansText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 120,
  },
  intros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 5,
  },

  categories: {
    flexDirection: 'row',
    marginRight: 15,
  },

  heading1: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    marginLeft: '4%',
  },
  heading2: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    marginRight: '4%',
  },

  categoriesImg: {
    marginLeft: 15,
    marginTop: 10,
    width: 77,
    height: 104,
    borderRadius: 50,
  },
  categoriesText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 70,
  },

  trainersContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    marginRight: 15,
  },
  trainersCard: {
    paddingTop: 5,
  },
  trainersImg: {
    marginLeft: 18,
    width: 55,
    height: 55,
  },

  trainersName: {
    color: '#fff',
    fontSize: 11,
    paddingTop: 8,
    textAlign: 'center',
    marginLeft: 23,
  },

  dietsSection: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  dietsCard: {
    flex: 1,
    marginLeft: 15,
    marginTop: 15,
  },

  dietsImg: {
    width: 160,
    height: 215,
    borderRadius: 50,
  },
  dietsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 170,
  },
});

export default Home;
