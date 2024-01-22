import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BasicScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [ageInput, setAgeValue] = useState('');
  const [weightInput, setWeightValue] = useState('');
  const [heightInput, setHeightValue] = useState('');
  const [goalInput, setGoalValue] = useState('');
  const [selectedGender, setSelectedGender] = useState('male');
  const [selectedDietType, setSelectedDietType] = useState('vegetarian');

  useEffect(() => {
    loadData();
    handlegptsave();
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
  const [gptResponse, setGptResponse] = useState('');
  const handleSave = async () => {
    setLoading(true);
    const gpt35ApiUrl = 'https://api.openai.com/v1/completions';
    const prompt = `Act Like Diet Planner , now this is information of client ,Gender: ${selectedGender}, Age: ${ageInput}, Height: ${heightInput}, Weight: ${weightInput}, Diet Type: ${selectedDietType}, Weight Goal: ${goalInput}, now based on this define a weekly diet plan , properly formatted , add emojis make it attractive bold importat things provide proties calories count and all things that your think must be included.`;

    try {
      const response = await fetch(gpt35ApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ',
        },
        body: JSON.stringify({
          prompt: prompt,
          model: 'text-davinci-003',
          temperature: 0.7,
          max_tokens: 400,
        }),
      });

      if (!response.ok) {
        throw new Error(`GPT-3.5 API request failed: ${response.status}`);
      }

      const data = await response.json();
      const actualdata=data.choices[0].text
      console.log('GPT-3.5 Response:', actualdata);
      setGptResponse(actualdata);
      setLoading(false);

    } catch (error) {
      console.error('Error calling GPT-3.5 API:', error.message);
    }
  };
  const handlegptsave= async()=>{
    try {
      await AsyncStorage.setItem('Diet Plan', gptResponse);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  }

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
                onValueChange={itemValue => setSelectedGender(itemValue)}
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
                onChangeText={text => setAgeValue(text)}
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
                onChangeText={text => setHeightValue(text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.group2}>
              <Text style={styles.label}>Weight </Text>
              <TextInput
                style={styles.input3}
                value={weightInput}
                onChangeText={text => setWeightValue(text)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.diet}>
            <Text style={styles.label}>Diet Type</Text>
            <Picker
              selectedValue={selectedDietType}
              style={styles.picker}
              onValueChange={itemValue => setSelectedDietType(itemValue)}>
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
              onChangeText={text => setGoalValue(text)}
            />
          </View>

          {/* <Pressable style={styles.bookButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Generate Diet Plan</Text>
          </Pressable> */}
        </View>
        <View style={styles.buton}>
        <View style={styles.innerbutton}>
          <Pressable style={styles.generate} onPress={handleSave}>
            <Text style={styles.generateText}>Generate </Text>
          </Pressable>
          <Pressable style={styles.save} onPress={handlegptsave}>
            <Text style={styles.savePlanText}>Save Plan</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.textView}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            <Text style={styles.textCard}>{gptResponse}</Text>
          )}
        </View>
   
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  buton: {
    backgroundColor: '#2F4F4F',
    marginTop: 20,
    height: 45,
    width: '125%',
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:18
  },
  innerbutton: {
    flexDirection: 'row',
    padding: 10,
    flexGrow: 1
  },
  generateText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 16,
  },
  savePlanText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 2,
    fontSize: 16,
  },
  signout: {
    backgroundColor: 'red',
    height: 30,
    width: '42%',
    borderRadius: 10,
  },
  save: {
    backgroundColor: 'red',
    height: 30,
    width: '42%',
    marginLeft: 10,
    borderRadius: 10,
  },
  generate: {
    backgroundColor: 'black',
    height: 30,
    width: '42%',
    borderRadius: 10,
  },
  main: {
    backgroundColor: 'black',
    width: '80%',
  },
  form: {
    borderRadius: 8,
  },
  group: {
    marginBottom: 16,
    width: '70%',
  },
  diet: {
    marginBottom: 16,
    width: '125%',
    marginTop: 20,
  },
  weightGoal: {
    marginBottom: 16,
    width: '125%',
    marginTop: 10,
  },
  group1: {
    marginLeft: 15,
    width: '50%',
  },
  group2: {
    marginLeft: 15,
    width: '50%',
  },
  first1: {
    flexDirection: 'row',
    flex: 1,
  },
  sec: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
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
    paddingLeft: 15,
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
    width: '100%',
    paddingLeft: 15,
  },
  input2: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 4,
    color: '#fff',
    paddingLeft: 15,
  },
  input3: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 4,
    color: '#fff',
    paddingLeft: 15,
  },
  picker: {
    height: 40,
    borderWidth: 1,
    fontWeight: 'bold',
    color: 'black', 
    backgroundColor: 'white',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#9B0808',
    color: 'white',
    width: '130%',
    height: 61,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 27,
    marginLeft: 65,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 15,
  },
  textView: {
    backgroundColor: 'grey',
    width: '125%',
    padding: 10, 
    borderRadius:5,
  },
  textCard: {
    color: 'white',
    fontSize:15,
  }
});

export default BasicScreen;
