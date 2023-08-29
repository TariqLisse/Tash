import React from 'react';

// Colors
import { Colors } from './../Components/Styles';
const { primary, tertiary } = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from './../Screens/Login';
import Signup from './../Screens/Signup';
import Welcome from './../Screens/Welcome';

// Create a navigation stack using createNativeStackNavigator
const Stack = createNativeStackNavigator();

// RootStack component responsible for defining the navigation stack
const RootStack = () => {
  return (
    <NavigationContainer>
      {/* Navigation stack definition */}
      <Stack.Navigator
        screenOptions={{
          // Customize header styles
          headerStyle: {
            backgroundColor: 'transparent'
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20
          }
        }}
        initialRouteName='Login' // Set the initial route
      >
        {/* Screens within the stack */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
