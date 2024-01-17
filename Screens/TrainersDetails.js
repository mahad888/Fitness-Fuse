import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  Touchable,
} from 'react-native';

const TrainersDetail = ({navigation}) => {
  return (
    <ScrollView style={styles.container}>
      <Image source={require('../Assets/Jennifier-details.png')} />
      <View style={styles.intro}>
        <View style={styles.introText}>
          <Text style={styles.textStyle}>Jennifier James</Text>
          <Text style={styles.bioStyle}>Functional Strength</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.experience}>
            <Text style={styles.number}>6</Text>
            <Text style={styles.desc}>Experience</Text>
          </View>
          <View style={styles.experience}>
            <Text style={styles.number}>46</Text>
            <Text style={styles.desc}>Completed</Text>
          </View>
          <View style={styles.experience}>
            <Text style={styles.number}>25</Text>
            <Text style={styles.desc}>Active Clients</Text>
          </View>
        </View>
        <View style={styles.intros}>
          <Text style={styles.heading1}>Reviews</Text>
          <Text style={styles.heading2}>4.6 / 5.0</Text>
        </View>

        {/* Reviews container */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: 15}}>
          <View style={styles.reviewsCard}>
            <View style={styles.reviewerDetails}>
              <Image source={require('../Assets/sharom.png')} />
              <Text style={styles.reviewerName}>Sharom Jem</Text>
              <View style={styles.review}>
                <Text style={styles.reviewScore}> 4.9</Text>
              </View>
            </View>
            <View>
              <Text style={{color: 'white', paddingTop: 13, fontSize: 13}}>
                Had such an amazing session with Jenni. She instantly picked up
                on the level of my fitness and adjusted the workout to suit me
                whilst also pushing me to my limits.
              </Text>
            </View>
          </View>
          <View style={styles.reviewsCard}>
            <View style={styles.reviewerDetails}>
              <Image source={require('../Assets/sharom.png')} />
              <Text style={styles.reviewerName}>Sharom Jem</Text>
              <View style={styles.review}>
                <Text style={styles.reviewScore}> 4.9</Text>
              </View>
            </View>
            <View>
              <Text style={{color: 'white', paddingTop: 13, fontSize: 13}}>
                Had such an amazing session with Jenni. She instantly picked up
                on the level of my fitness and adjusted the workout to suit me
                whilst also pushing me to my limits.
              </Text>
            </View>
          </View>
          <View style={styles.reviewsCard}>
            <View style={styles.reviewerDetails}>
              <Image source={require('../Assets/sharom.png')} />
              <Text style={styles.reviewerName}>Sharom Jem</Text>
              <View style={styles.review}>
                <Text style={styles.reviewScore}> 4.9</Text>
              </View>
            </View>
            <View>
              <Text style={{color: 'white', paddingTop: 13, fontSize: 13}}>
                Had such an amazing session with Jenni. She instantly picked up
                on the level of my fitness and adjusted the workout to suit me
                whilst also pushing me to my limits.
              </Text>
            </View>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.buttonText}>Book an Appointment</Text>
        </TouchableOpacity>
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    color: 'white',
    flexDirection: 'column',
  },
  intro: {
    // minHeight: '85%',
    marginBottom: 10,
  },
  introText: {
    padding: 20,
    marginLeft: 10,
    flexDirection: 'column',
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
    paddingBottom: 5,
  },
  bioStyle: {
    color: '#fff',
    fontSize: 13,
    paddingBottom: 5,
  },
  card: {
    flexDirection: 'row',
    width: '84%',
    height: 90,
    padding: 15,
    backgroundColor: '#3A3A3C',
    marginHorizontal: '8%',
    borderRadius: 15,
  },
  experience: {
    flexDirection: 'column',
    width: '33%',
  },

  number: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    paddingBottom: 4,
  },
  desc: {
    textAlign: 'center',
    fontSize: 13,
    color: 'white',
  },
  intros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    paddingTop: 5,
  },

  heading1: {
    color: '#fff',
    fontSize: 16,
    paddingTop: 10,
    marginLeft: 10,
    paddingLeft: 20,
  },
  heading2: {
    color: '#fff',
    fontWeight: '400',
    fontSize: 16,
    paddingTop: 10,
    marginRight: 8,
    paddingRight: 15,
  },
  reviewsCard: {
    width: 320,
    height: 145,
    marginHorizontal: 10,
    paddingLeft: 20,
    padding: 15,
    marginTop: 20,
    backgroundColor: '#3A3A3C',
    borderRadius: 15,
  },
  reviewerDetails: {
    flexDirection: 'row',
    paddingLeft: 5,
  },
  reviewerName: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '500',
    color: 'white',
    paddingBottom: 4,
    paddingLeft: 15,
    paddingVertical: 5,
    paddingRight: 70,
  },
  review: {
    backgroundColor: '#9B0808',
    width: 40,
    paddingTop: 2,
    height: 22,
    textAlign: 'center',
    color: 'white',
    marginLeft: 25,
    marginTop: 3,
    paddingRight: 2,
  },
  reviewScore: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bookButton: {
    backgroundColor: '#9B0808',
    color: 'white',
    width: 274,
    height: 61,
    borderRadius: 15,
    alignSelf :'center',
    marginTop: 27
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    paddingTop: 18
  }
});

export default TrainersDetail;
