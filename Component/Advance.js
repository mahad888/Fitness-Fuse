import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdvanceScreen = ({ navigation }) => {
  const [ageInput, setAgeValue] = useState('');
  const [weightInput, setWeightValue] = useState('');
  const [heightInput, setHeightValue] = useState('');
  const [goalInput, setGoalValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedDietType, setSelectedDietType] = useState('vegetarian');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const storedAge = await AsyncStorage.getItem('age');
      const storedWeight = await AsyncStorage.getItem('weight');
      const storedHeight = await AsyncStorage.getItem('height');
      const storedGender = await AsyncStorage.getItem('gender');
      const storedDietType = await AsyncStorage.getItem('dietType');

      if (storedAge) setAgeValue(storedAge);
      if (storedWeight) setWeightValue(storedWeight);
      if (storedHeight) setHeightValue(storedHeight);
      if (storedGender) setSelectedGender(storedGender);
      if (storedDietType) setSelectedDietType(storedDietType);
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Save data to AsyncStorage
      await AsyncStorage.setItem('age', ageInput);
      await AsyncStorage.setItem('weight', weightInput);
      await AsyncStorage.setItem('height', heightInput);
      await AsyncStorage.setItem('gender', selectedGender);
      await AsyncStorage.setItem('dietType', selectedDietType);

      // Rest of your code for handling GPT-3.5 API request
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} vertical={true}>
      <View style={styles.main}>
        <View style={styles.form}>
          <View style={styles.first1}>
            <View style={styles.group}>
              <Text style={styles.label}>Gender</Text>
              <Picker
                selectedValue={selectedGender}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedGender(itemValue)}
                dropdownIconColor="black"
                dropdownIconRippleColor="black">
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
            <View style={styles.group1}>
              <Text style={styles.label1}>Age </Text>
              <TextInput
                style={styles.input1}
                value={ageInput}
                onChangeText={(text) => setAgeValue(text)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.sec}>
            <View style={styles.height}>
              <Text style={styles.label}>Height </Text>
              <TextInput
                style={styles.input2}
                value={heightInput}
                onChangeText={(text) => setHeightValue(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.group2}>
              <Text style={styles.label}>Weight </Text>
              <TextInput
                style={styles.input3}
                value={weightInput}
                onChangeText={(text) => setWeightValue(text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.diet}>
            <Text style={styles.label}>Diet Type</Text>
            <Picker
              selectedValue={selectedDietType}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedDietType(itemValue)}>
              <Picker.Item label="Vegetarian" value="vegetarian" />
              <Picker.Item label="Vegan" value="vegan" />
              <Picker.Item label="Keto" value="keto" />
              <Picker.Item label="Non-Vegetarian" value="non-vegetarian" />
            </Picker>
          </View>
          <View style={styles.weightGoal}>
            <Text style={styles.label}>Weight Goal </Text>
            <TextInput
              style={styles.input}
              value={goalInput}
              onChangeText={(text) => setGoalValue(text)}
            />
          </View>

          <Pressable style={styles.bookButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Check Diet Plan</Text>
        </Pressable>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 16,
  },
  main: {
    backgroundColor: 'black',
    width: '80%',
  },
  form: {
    padding: 16,
    borderRadius: 8,
  },
  group: {
    marginBottom: 16,
    width: '70%',
    // marginTop: 25
  },
  diet: {
    marginBottom: 16,
    width: '130%',
    marginTop: 20
  },
  weightGoal: {
    marginBottom: 16,
    width: '130%',
    marginTop: 10
  },
  group1: {
    marginLeft: 20,
  },
  group2: {
    marginLeft: 20,
  },
  first1: {
    flexDirection: 'row',
  },
  sec: {
    flexDirection: 'row',
    marginTop: 10,
  },
  label: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  label1: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 40,
    width: 260,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 4,
    color: '#fff',
    width: '100%',
    paddingLeft: 15

  },
  height: {
    width: '70%',
  },
  input1: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 4,
    color: '#fff',
    width: 105,
    paddingLeft: 15
  },
  input2: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 4,
    color: '#fff',
    paddingLeft: 15

  },
  input3: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 4,
    color: '#fff',
    width: 105,
    paddingLeft: 15

  },
  picker: {
    height: 40,
    borderWidth: 1,
    color: 'black', // Set the text color to white
    backgroundColor: 'white',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#9B0808',
    color: 'white',
    width: '130%',
    height: 61,
    borderRadius: 15,
    alignSelf :'center',
    marginTop: 27,
    marginLeft: 65
  },
  buttonText: {
    color: '#fff', 
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 15
  }
});

export default AdvanceScreen;
