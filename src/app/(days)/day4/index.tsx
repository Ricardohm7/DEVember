import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const DayDetailsScreen = () => {
  return (
    <View>
      <Stack.Screen options={{ title: 'Day 4: SplashScreen' }} />
      <Text>DayDetailsScreen</Text>
      <Link href="/day4/animation" asChild>
        <Button title="Go to animation" />
      </Link>
      <Link href="/day4/splash" asChild>
        <Button title="Splash screen animation" />
      </Link>
    </View>
  )
}

export default DayDetailsScreen

const styles = StyleSheet.create({})