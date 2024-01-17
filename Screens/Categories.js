import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useCategory } from './CategoryContext';
import Fontisto from 'react-native-vector-icons/Fontisto';
import ExerciseCard from '../Component/ExerciseCard';
import firestore from '@react-native-firebase/firestore';

const CategoriesScreen = ({ navigation }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = ['Beginner', 'Intermediate', 'Advanced'];

  const handleCategoryPress = category => {
    setSelectedCategory(category.toLowerCase());
  };

  const handleExercisePress = (exercise, category) => {
    setSelectedExercise({ exercise, category });
    navigation.navigate('ExerciseDetailsScreen', {
      exercise,
      category,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerLeftContainer}
          onPress={() => navigation.goBack()}>
          <Fontisto name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>Workout Categories</Text>
      </View>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <React.Fragment key={category}>
            {index > 0 && <View style={styles.line} />}
            <TouchableOpacity
              onPress={() => handleCategoryPress(category)}
              style={[
                styles.categoryCard,
                selectedCategory === category.toLowerCase() &&
                  styles.selectedCategory,
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.toLowerCase() &&
                    styles.selectedCategoryText,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>

      {selectedCategory === 'beginner' && (
        <BeginnerExercises onPress={handleExercisePress} />
      )}
      {selectedCategory === 'intermediate' && (
        <IntermediateExercises onPress={handleExercisePress} />
      )}
      {selectedCategory === 'advanced' && (
        <AdvancedExercises onPress={handleExercisePress} />
      )}
    </View>
  );
};

CategoriesScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'Workout Categories',
  headerLeft: () => (
    <TouchableOpacity
      style={styles.headerLeftContainer}
      onPress={() => navigation.goBack()}>
      <Fontisto name="arrow-left" size={24} color="black" />
    </TouchableOpacity>
  ),
});

const BeginnerExercises = ({ onPress }) => {
  const [beginnerExercises, setBeginnerExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBeginnerExercises = async () => {
      try {
        const snapshot = await firestore().collection('beginner').get();

        const exercisesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Title,
            image: data.urll,
            des: data.des,
          };
        });

        setBeginnerExercises(exercisesData);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching beginner exercises:', error);
        setLoading(false); 
      }
    };
    fetchBeginnerExercises();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#9B0808" />
        </View>
      ) : (
        beginnerExercises.map(exercise => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onPress={onPress}
            category="Beginner"
          />
        ))
      )}
    </ScrollView>
  );
};

const IntermediateExercises = ({onPress}) => {
  const [intermediateExercises, setIntermediateExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntermediateExercises = async () => {
      try {
        const snapshot = await firestore().collection('inter').get();

        const exercisesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Title,
            image: data.urll,
            des: data.des,
          };
        });

        setIntermediateExercises(exercisesData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching intermediate exercises:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Call the function to fetch data
    fetchIntermediateExercises();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? (
        // Render a loading indicator while data is being fetched
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#9B0808" />
        </View>
      ) : (
        // Render the exercise cards once data is loaded
        intermediateExercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise} 
          onPress={onPress}
          category="inter" />
        ))
      )}
    </ScrollView>
  );
};

const AdvancedExercises = ({onPress}) => {
  const [advanceExercises, setAdvanceExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdvanceExercises = async () => {
      try {
        const snapshot = await firestore().collection('advance').get();

        const exercisesData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.Title,
            image: data.urll,
            des: data.des,
          };
        });

        setAdvanceExercises(exercisesData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching advanced exercises:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    // Call the function to fetch data
    fetchAdvanceExercises();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {loading ? (
        // Render a loading indicator while data is being fetched
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#9B0808" />
        </View>
      ) : (
        // Render the exercise cards once data is loaded
        advanceExercises.map(exercise => (
          <ExerciseCard key={exercise.id} exercise={exercise}
          onPress={onPress}
          category="advance"/>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerLeftContainer: {
    marginRight: 30,
  },
  header: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: 'white',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#A9A9A9',
    marginTop:12, 
    borderRadius: 15, 
    overflow: 'hidden', 
  },
  line: {
    height: '100%',
    width: 2,
    backgroundColor: '#A9A9A9', 
  },
  categoryCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
   
  },
  selectedCategory: {
    backgroundColor: 'red', // Change to your desired highlight color
  },
  categoryText: {
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: 'white', // Change to your desired text color
  },
  exerciseCategory: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default CategoriesScreen;
