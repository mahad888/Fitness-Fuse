// TabNavigator.js
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/Home';
import CategoriesScreen from '../Screens/Categories';
import TrainerScreen from '../Screens/Trainer';
import DietScreen from '../Screens/Diet';
import ProfileScreen from '../Screens/Profile';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {CategoryProvider} from '../Screens/CategoryContext';
import EditProfileForm from '../Component/EditProfileForm';
import TrainersDetail from '../Screens/TrainersDetails'; 
import { DietProvider } from '../Component/DietContext';
import ExerciseDetailsScreen from '../Screens/Workout';
import GenderScreen from '../Screens/gender';
import AgeScreen from '../Screens/age';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <CategoryProvider>
      <DietProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#9B0808',
            tabBarInactiveTintColor: '#fff',
            tabBarActiveBackgroundColor: '#141414',
            tabBarInactiveBackgroundColor: '#141414'
          }}>
          
          <Tab.Screen
            name="Age"
            component={AgeScreen}
            options={{tabBarButton: () => null, tabBarVisible: false,headerShown: false,
            }}
          />
          <Tab.Screen
            name="Gender"
            component={GenderScreen}
            options={{tabBarButton: () => null, tabBarVisible: false,headerShown: false,
            }}
          />
          
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({color, size}) => (
                <Fontisto name="home" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />

          <Tab.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Fontisto name="delicious" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Trainer"
            component={TrainerScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Fontisto name="persons" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Diet"
            component={DietScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Fontisto name="shopping-basket" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({color, size}) => (
                <Fontisto name="person" size={size} color={color} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="EditProfileForm"
            component={EditProfileForm}
            options={{tabBarButton: () => null, tabBarVisible: false}}
          />
          <Tab.Screen
            name="Details"
            component={TrainersDetail}
            options={{tabBarButton: () => null, tabBarVisible: false}}
          />
           <Tab.Screen
            name="ExerciseDetailsScreen"
            component={ExerciseDetailsScreen}
            options={{tabBarButton: () => null, tabBarVisible: false,headerShown: false,
            }}
          />
          
          
          
        </Tab.Navigator>
      </DietProvider>
    </CategoryProvider>
  );
}
