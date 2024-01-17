import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '../Config/auth';

const ExerciseDetailsScreen = ({navigation,route}) => {
    const { exercise, category } = route.params;
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        height: '',
        weight: '',
        imageUrl: '', 
      });
    const [userExData, setUserExData] = useState({
        title: '',
        des: '',
        imageUrl: '', 
      });


    const { isLoggedIn } = useAuth();
    useEffect(() => {
      const fetchUserData = async () => {
        if (isLoggedIn) {
          const userId = auth().currentUser.uid;
          try {
            const userDoc = await firestore().collection('users').doc(userId).get();
  
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
    //   const fetchUserExData = async () => {
    //     if (isLoggedIn) {
    //       const userId = auth().currentUser.uid;
    //       try {
    //         console.log("this is category:", category);
    //         console.log("this is excercise:", exercise);
    //         const titleToFetch = exercise;
      
    //         const userDoc = await firestore()
    //           .collection(category)
    //           .where('Title', '==', titleToFetch)
    //           .get();
      
    //         if (!userDoc.empty) {
    //           // Assuming there is only one document with the specified title
    //           const data = userDoc.docs[0].data();
      
    //           setUserData({
    //             title: data.Title,
    //             des: data.des,
    //             imageUrl: data.urll,
    //           });
    //         } else {
    //           console.log('User document does not exist');
    //         }
    //       } catch (error) {
    //         console.error('Error fetching user data:', error);
    //       }
    //     }
    //   };
      
  
      fetchUserData();
    //   fetchUserExData();
    }, [isLoggedIn]);
  
  return (
    <ScrollView style={styles.container}>
      
      <Image source={{ uri: userData.imageUrl }} style={styles.homeImg} />
      <View style={styles.intro}>
        <View style={styles.introText}>
          <Text style={styles.headingStyle}>Welcome, {userData.name}</Text>
          <Text style={styles.textStyle}>
            Empower yourself to make the changes you need to make.
          </Text>
        </View>

        <View style={styles.daySection}>
          <View style={styles.day}>
            <Text style={styles.dayText}> Sat</Text>
          </View>
          <Text style={styles.textSection}>Time to workout</Text>
        </View>
      </View>

      <View style={{marginTop: 10}}>
        <Text style={{color: '#fff', fontSize: 12, marginLeft: 15}}>
          GUIDED TRAINING
        </Text>
        <View style={styles.horizontalLine} />
      </View>

      <View>
        <ImageBackground
          source={{ uri: exercise.image }}
          style={styles.workoutImg}>
          <Text style={styles.workoutText1}>{exercise.name}</Text>
          <View style={styles.workoutText2}>
            <Text style={styles.workoutText}> Recommended</Text>
          </View>
          <Text style={styles.workoutText3}>{exercise.des}</Text>
        </ImageBackground>
      </View>

      <View style={{marginTop: 10}}>
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            marginLeft: 15,
            marginBottom: 15,
          }}>
          NEXT EXERCISE
        </Text>
      </View>

      <View style={styles.number}>
        <Text style={styles.numberText}> 1 </Text>
      </View>
      <View>
        <View style={styles.exercise}>
          <View style={styles.verticalLine} />
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseHead}>Incline dumble flyes</Text>
            <Text style={styles.exerciseText}>
              It works your upper and outer pecs to build a broader chest.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.number}>
        <Text style={styles.numberText}> 2 </Text>
      </View>
      <View>
        <View style={styles.exercise}>
          <View style={styles.verticalLine} />
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseHead}>
              Cable rope overhead extension
            </Text>
            <Text style={styles.exerciseText}>
              This move works your triceps through a full range of motion, and
              the cable forces your muscles to work hard.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.number}>
        <Text style={styles.numberText}> 3 </Text>
      </View>
      <View>
        <View style={styles.exercise}>
          <View style={styles.verticalLine} />
          <View style={styles.exerciseCard}>
            <Text style={styles.exerciseHead}>Incline dumble flyes</Text>
            <Text style={styles.exerciseText}>
              It works your upper and outer pecs to build a broader chest.
            </Text>
          </View>
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
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeftContainer: {
    marginRight: 30,
  },
  headingStyle: {
    color: '#fff',
    fontSize: 16,
  },
  textStyle: {
    color: '#959595',
    fontSize: 12,
    paddingTop: 2,
  },
  homeImg: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginLeft: 15,
    marginTop: 25,
  },
  daySection: {
    flexDirection: 'row',
    backgroundColor: '#3A3A3C',
    width: 189,
    height: 33,
    borderRadius: 50,
    paddingLeft: 5,
    marginTop: 13,
    marginLeft: 5,
  },
  day: {
    backgroundColor: '#9B0808',
    width: 50,
    height: 27,
    marginTop: 3,
    borderRadius: 50,
  },
  dayText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 3,
    fontWeight: 'bold',
    fontSize: 14,
  },
  textSection: {
    fontSize: 14,
    paddingTop: 5,
    paddingLeft: 10,
    color: '#fff',
  },
  horizontalLine: {
    borderBottomColor: '#fff',
    borderBottomWidth: 0.5,
    marginLeft: '28%',
  },
  workoutImg: {
    marginLeft: 10,
    marginTop: 10,
    width: 375,
    height: 220,
    borderRadius: 50,
  },
  workoutText1: {
    paddingLeft: 20,
    paddingTop: '27%',
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  workoutText2: {
    backgroundColor: '#9B0808',
    width: 130,
    height: 29,
    marginLeft: 20,
    textAlign: 'center',
    borderRadius: 50,
    marginVertical: 3,
  },
  workoutText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 3,
    fontSize: 16,
  },
  workoutText3: {
    color: '#fff',
    paddingLeft: 20,
    fontSize: 14,
  },
  number: {
    backgroundColor: '#9B0808',
    width: 25,
    height: 25,
    borderRadius: 50,
    marginLeft: 15,
  },
  numberText: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 2,
  },
  exercise: {
    flexDirection: 'row',
    width: '85%',
    height: 90,
    marginLeft: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  exerciseCard: {
    flexDirection: 'column',
    backgroundColor: '#3A3A3C',
    width: '90%',
    marginLeft: 15,
    paddingLeft: 15,
    paddingTop: 10,
    marginBottom: 5,
    borderWidth: 0.2,
    borderRadius: 5,
    borderColor: '#fff',
  },
  exerciseHead: {
    color: 'white',
    fontSize: 15,
  },
  exerciseText: {
    color: 'white',
    fontSize: 13,
  },
  verticalLine: {
    borderLeftColor: '#fff',
    borderLeftWidth: 1,
    // marginTop: 25,
    // height: 80,
    // marginLeft: 5
  },
});

export default ExerciseDetailsScreen;
