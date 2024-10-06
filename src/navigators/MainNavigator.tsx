import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistroScreen } from '../screens/RegistroScreen';
import { HomeScreen } from '../screens/HomeScreen';


const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name='Registro' component={RegistroScreen} />
            <Stack.Screen name='MyTabs' component={MyTabs} />

        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={HomeScreen} />
        </Tab.Navigator>
    )
}


export const MainNavigator = () => {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}
