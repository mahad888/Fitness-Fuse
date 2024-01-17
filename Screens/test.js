import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';

const Test=({navigation})=>{
    const[name,setName]=React.useState()
    const[email,setEmail]=React.useState()
    const[pass,setPass]=React.useState()

    const handleAccount= async()=>{
        try {
            await AsyncStorage.setItem('name',name)
            name={
                password:pass,
                email:email
            }
            var value=JSON.stringify(name)
            await AsyncStorage.setItem(name,value)
            const respone=await fetch('ure',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,pass}),
                
            });
            if(respone.ok){
                navigation.navigate('Login',{name,pass})

            }
        } catch (error) {
            
        }

    }

    return(
        <View>
            <View>
                <TextInput placeholder='Enter name' placeholderTextColor='Yellow' onChangeText={setName} value={name}></TextInput>
                <TextInput placeholder='Enter Email' placeholderTextColor='Yellow' keybordType='email-address' onChangeText={setEmail} value={email}></TextInput>
                <TextInput placeholder='Enter password' placeholderTextColor='Yellow' secureTextEntry={true} onChangeText={setPass} value={pass}></TextInput>
                <View>
                    <Pressable style={{backgroundColor:'green'}} onPress={handleAccount}></Pressable>
                </View>
            </View>
        </View>

    )
}