import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, StackNavigationProp, } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native";
import Counter from './src/components/Counter';
import Login from './src/components/Login';
import LoginSubmission from './src/components/LoginSubmission';
import Home from './src/components/Home';


export type RootStackParamsList = {
  Counter : undefined,
  Login : undefined,
  Home : undefined
}  

export type NavigationProps = StackNavigationProp<RootStackParamsList>

export const Stack = createStackNavigator<RootStackParamsList>()


export const SCREENS: Record<string, keyof RootStackParamsList> = {
  COUNTER: 'Counter',
  LOGIN : "Login",
  HOME: "Home"
};

const App = () => {
  return (
    <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerBackTestID: 'go-back-home-button',
            }}>
               <Stack.Screen name={SCREENS.COUNTER} component={Counter} />
               <Stack.Screen name={SCREENS.LOGIN} component={LoginSubmission} />
               <Stack.Screen name={SCREENS.HOME} component={Home} />

              </Stack.Navigator>
              </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({
  container : {
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})