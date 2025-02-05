import { StyleSheet, Text, View,Pressable } from 'react-native'
import React, { useState } from 'react'
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Counter = () => {

    const [count, setCount] = useState(0)
    const decrement = ()=> setCount(count =>count-1)
    const increment = ()=>setCount(count=> count+1)
  return (
    <View style={styles.body}>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Current count: {count}</Text>
        <Pressable style={styles.button} onPress={decrement}>
          <Text>Decrement</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={increment}>
          <Text>Increment</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
      },
      sectionContainer: {
        padding: 24,
        alignItems: 'center',
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
      },
      button: {
        borderRadius: 12,
        padding: 6,
        margin: 6,
        backgroundColor: '#9e9ef8',
        justifyContent: 'center',
        alignItems: 'center',
      },
})