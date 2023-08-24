import React from 'react';

// Colors
import {Colors} from './../Components/Styles';
const {primary, tertiary} = Colors;

// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import Login from './../Screens/Login';
import Signup from './../Screens/Signup';
import Welcome from './../Screens/Welcome';

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions = {{
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
                initialRouteName = 'Login'
            >
                <Stack.Screen name = "Login" component = {Login} />
                <Stack.Screen name = "Signup" component = {Signup} />
                <Stack.Screen name = "Welcome" component = {Welcome} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootStack;