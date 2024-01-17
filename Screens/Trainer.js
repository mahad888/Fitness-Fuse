import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  Touchable,
} from 'react-native';

const TrainersDetails = ({navigation}) => {
  const handlepress=()=>{
    navigation.navigate('Details')
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.intro}>
        <View style={styles.introText}>
          <TouchableOpacity style={styles.backButton}>
            <Image
              source={require('../Assets/back-button.png')}
              style={styles.backButtonStyle}
            />
          </TouchableOpacity>
          <Text style={styles.textStyle}>Fitness Trainers</Text>
        </View>
      </View>

      {/* Trainer's card */}
      <TouchableOpacity style={styles.trainerCard}>
        <Image
          source={require('../Assets/Richard.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Richard Will</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.8</Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>High intensity Training</Text>
          <Text style={styles.trainerExperience}>5 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.trainerCard} onPress={handlepress}>
        <Image
          source={require('../Assets/Jennifier.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Jennifier James</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.6 </Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>Functional Strength</Text>
          <Text style={styles.trainerExperience}>4 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.trainerCard}>
        <Image
          source={require('../Assets/Brian.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Brian Edwards</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.9</Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>Strength Training</Text>
          <Text style={styles.trainerExperience}>6 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.trainerCard}>
        <Image
          source={require('../Assets/Emily.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Emily Kevin</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.2</Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>High intensity Training</Text>
          <Text style={styles.trainerExperience}>2 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.trainerCard}>
        <Image
          source={require('../Assets/Rebacca.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Rebacca Smith</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.8</Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>Functional Strength</Text>
          <Text style={styles.trainerExperience}>5 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.trainerCard}>
        <Image
          source={require('../Assets/Ronald.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Ronald Jason</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.5 </Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>High intensity Training</Text>
          <Text style={styles.trainerExperience}>6 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.trainerCard}>
        <Image
          source={require('../Assets/Nick.png')}
          style={styles.trainersImg}
        />
        <View style={styles.trainersIntro}>
          <View style={styles.trainersInfo}>
            <Text style={styles.trainerName}>Nick Germaine</Text>
            <View style={styles.review}>
              <Text style={styles.reviewScore}> 4.3</Text>
            </View>
          </View>

          <Text style={styles.trainerDescription}>Wait loss Training</Text>
          <Text style={styles.trainerExperience}>5 years Experience</Text>
        </View>
        <Image
          source={require('../Assets/forward-button.png')}
          style={styles.forwardButtonStyle}
        />
      </TouchableOpacity>
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
    padding: 20,
    marginLeft: 15,
    marginVertical: 10,
  },
  introText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#2C2C2E',
    borderRadius: 50,
    width: 32,
    height: 32,
    paddingTop: 8,
    paddingRight: 3,
  },
  backButtonStyle: {
    alignSelf: 'center',
    width: 8,
    height: 16,
  },
  forwardButtonStyle: {
    alignSelf: 'center',
    width: 7,
    height: 14,
    padding: 15,
  },
  textStyle: {
    marginLeft: 64,
    color: '#fff',
    fontSize: 24,
    paddingBottom: 5,
  },
  trainerCard: {
    backgroundColor: '#2C2C2E',
    borderRadius: 15,
    width: '85%',
    height: 95,
    marginHorizontal: '8%',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 15,
  },
  trainersIntro: {
    paddingLeft: 15,
    // backgroundColor: 'blue',
    width: '65%',
  },
  trainersInfo: {
    flexDirection: 'row',
  },
  review: {
    backgroundColor: '#9B0808',
    width: 37,
    height: 18,
    textAlign: 'center',
    color: 'white',
    marginLeft: 10,
    marginTop: 3,
  },
  reviewScore: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  trainersImg: {
    width: 64,
    height: 64,
  },

  trainerName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    paddingBottom: 2,
  },
  trainerDescription: {
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  trainerExperience: {
    fontSize: 12,
    fontWeight: '500',
    paddingTop: 6,
    color: '#fff',
  },
});

export default TrainersDetails;
