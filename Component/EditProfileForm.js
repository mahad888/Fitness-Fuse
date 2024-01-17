import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const EditProfileForm = ({navigation}) => {
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    weight:'',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth().currentUser.uid;
      try {
        const userDoc = await firestore().collection('users').doc(userId).get();

        if (userDoc.exists) {
          const data = userDoc.data();
          setEditedUserData({
            name: data.name,
            email: data.email,
            password: data.password,
            phone: data.phone,
            weight: data.weight,
          });
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const userId = auth().currentUser.uid;
    console.log(editedUserData.email, '   ', editedUserData.name);

    try {
      await firestore().collection('users').doc(userId).update(editedUserData);
      navigation.goBack();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={editedUserData.name}
        onChangeText={value =>
          setEditedUserData(prevData => ({...prevData, name: value}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={editedUserData.email}
        onChangeText={value =>
          setEditedUserData(prevData => ({...prevData, email: value}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={editedUserData.phone}
        onChangeText={value =>
          setEditedUserData(prevData => ({...prevData, phone: value}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={editedUserData.password}
        onChangeText={value =>
          setEditedUserData(prevData => ({...prevData, password: value}))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Weight"
        value={editedUserData.weight}
        onChangeText={value =>
          setEditedUserData(prevData => ({...prevData, weight: value}))
        }
      />

      <Pressable onPress={handleSave} style={styles.saveButton}>
        <Text>Save</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
    alignItems: 'center',
  },
});

export default EditProfileForm;
