import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDiet } from '../Component/DietContext'
import BasicScreen from '../Component/Basic';
import AdvanceScreen from '../Component/Advance';

const DietScreen = () => {
  const { selectedDiet, chooseDiet } = useDiet();

  const diets = ['Basic', 'Advance'];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerLeftContainer}
          onPress={() => navigation.goBack()}>
          <Fontisto name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>AI Diet Planner</Text>
      </View>
      <View style={styles.categoriesContainer}>
        {diets.map((diet, index) => (
          <React.Fragment key={diet}>
            {index > 0 && <View style={styles.line} />}
            <TouchableOpacity
              onPress={() => chooseDiet(diet.toLowerCase())}
              style={[
                styles.categoryCard,
                selectedDiet === diet.toLowerCase() && styles.selectedCategory,
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  selectedDiet === diet.toLowerCase() &&
                    styles.selectedCategoryText,
                ]}>
                {diet}
              </Text>
            </TouchableOpacity>
          </React.Fragment>
        ))}
      </View>

      {selectedDiet === 'basic' && <BasicScreen />}
      {selectedDiet === 'advance' && <AdvanceScreen />}
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
    // marginTop:15,
  },
  headerLeftContainer: {
    marginRight: 35,
  },
  header: {
    fontSize: 20,
    color: 'white',
    marginLeft:40,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    backgroundColor: '#A9A9A9',
    marginTop:20, 
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
    fontSize:17,
    fontWeight:'bold',
  },
  selectedCategoryText: {
    color: 'white', // Change to your desired text color
  },
});

export default DietScreen;
