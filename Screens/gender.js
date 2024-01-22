import React, {useState,useEffect} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {AntDesign} from 'react-native-vector-icons';
import {useAuth} from '../Config/auth';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GenderScreen = ({navigation}) => {
  const [weight, setWeight] = useState(75);
  const [selectedGender, setSelectedGender] = useState(null);
  const [gender, setGender] = useState('');
 

  const onGenderPress = gender => {
    setSelectedGender(gender);
  };
  const increaseWeight = () => {
    setWeight(weight + 1);
  };

  const decreaseWeight = () => {
    if (weight > 0) {
      setWeight(weight - 1);
    }
  };
  const onWeightChange = value => {
    setWeight(value);
  };
  const {isLoggedIn} = useAuth();

  const onNextPress = async () => {
    saveDataToStorage();
    console.log('Selected Gender:', selectedGender);
    console.log('Weight:', weight);
    if (weight !== '' && selectedGender !== '') {
      if (isLoggedIn) {
        const userId = auth().currentUser.uid;
        try {
          await firestore().collection('users').doc(userId).update({
            selectedGender,
            weight,
          });
          console.log('added data successfully');
          navigation.navigate('Home');
        } catch (error) {
          console.error('Error updating user data:', error.message);
        }
      }
    } else {
      console.log('Kindly select all data')
      Alert.alert('Fill all fields');
    }
  };
  const onPress = (selectedGender) => {
    setGender(selectedGender);
  };

  const saveDataToStorage = async () => {
    try {
      await AsyncStorage.setItem('gender', gender);
      await AsyncStorage.setItem('weight', weight.toString());
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Fitness Fuse</Text>
        <Text style={styles.subHeading}>Complete your Profile</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Choose your gender</Text>
        <TouchableOpacity onPress={() => onPress('male')}>
          <View style={styles.buttonContainer}>
            <Icon name="man" size={24} color="white" />
            <Text style={styles.btext}> Man </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onPress('female')}>
          <View style={styles.buttonContainer}>
            <Icon name="woman" size={24} color="white" />
            <Text style={styles.btext}> Woman </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.weightContainer}>
          <Text style={styles.text}>Select your weight</Text>
          <View style={styles.BarContainer}>
            <View style={styles.weightLabelContainer}>
              <View style={styles.barimage}>
                <Image
                  source={require('../Assets/Vector.png')}
                  style={styles.image}
                />
              </View>
              <View style={styles.weightkg}>
                <Text style={styles.numberText}>{weight}</Text>
                <Text style={styles.kgLabel}>kg</Text>
              </View>
              <View style={styles.tbButtons}>
                <TouchableOpacity onPress={increaseWeight}>
                  <Icon
                    name="caretup"
                    size={24}
                    color="rgba(155, 8, 8, 1)"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={decreaseWeight}>
                  <Icon
                    name="caretdown"
                    size={24}
                    color="rgba(255, 255, 255, 0.15)"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          height: 200,
          width: 320,
          marginTop: 0,
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={onNextPress}
          style={styles.nextButtonContainer}>
          <View style={styles.buttonContent}>
            <Text style={styles.nextButtonText}>Next</Text>
            <Icon name="caretright" size={14} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  header: {
    marginVertical: 30,
    marginTop: 50,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subHeading: {
    color: 'white',
    fontSize: 18,
    marginBottom: 50,
  },
  content: {
    alignItems: 'left',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },  
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  btext: {
    color: 'white',
    fontSize: 16,
  },
  weightContainer: {
    marginTop: 20,
    alignItems: 'left',
  },
  weightLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weightkg: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  kgLabel: {
    color: 'white',
    fontSize: 13,
    marginLeft: 5,
  },
  numberText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  BarContainer: {
    width: '100%',
    padding: 10,
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.15)',
    opacity: 15,
    color: 'white',
  },
  barimage: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 35,
    height: 35,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  tbButtons: {
    alignItems: 'center',
    justifyContent: 'flex-end', 
  },
  nextButtonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#9B0808',
    width: 100,
    padding: 10,
    gap: 12,
    borderRadius: 30,
    marginRight: 15,
    marginTop: 60,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default GenderScreen
