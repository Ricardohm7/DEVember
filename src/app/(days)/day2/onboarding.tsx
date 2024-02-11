import { Stack, router } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Directions, Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut, SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const onboardingSteps = [
  {
    title: 'Welcome #DEVember',
    description: 'Monitoring your spending and contribution, ensuring every penny aligns with your family\'s aspiration',
    icon: 'snowflake'
  },
  {
    title: 'Learn an grow together',
    description: 'Learn an build 24 projects in 24 with React Native and Expo',
    icon: 'people-arrows'
  },
  {
    title: 'Education for Children',
    description: 'Constribute to the fundraiser to help children in need',
    icon: 'book-reader'
  },
]

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);

  const data = onboardingSteps[currentStep];

  const onContinue = () => {
    const isLastStep = currentStep === onboardingSteps.length - 1;
    if (isLastStep) {
      endOnboarding();
      // navigate to the next screen
    } else { setCurrentStep(currentStep + 1); }
  }
  const onBack = () => {
    const isFirstStep = currentStep === 0;
    if (isFirstStep) {
      endOnboarding();
    } else {
      setCurrentStep(currentStep - 1);
    }
  }

  const endOnboarding = () => {
    setCurrentStep(0);
    router.back();
  }
  const swipeForward = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(onContinue);
  const swipeBack = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(onBack);

  const swipes = Gesture.Simultaneous(swipeBack, swipeForward);

  return (
    <SafeAreaView
      style={[styles.page, { paddingTop: Constants.statusBarHeight }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar style="light" />
      <View style={styles.stepIndicatorContainer}>
        {
          onboardingSteps.map((_, index) => (
            <View key={index} style={[styles.stepIndicator, { backgroundColor: index === currentStep ? '#cef202' : 'gray' }]} />
          ))
        }
      </View>

      <GestureDetector gesture={swipes}>
        <View style={styles.pageContent} key={currentStep}>
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <FontAwesome5 style={styles.image} name={data.icon} size={150} color="#cef202" />
          </Animated.View>
          <View style={styles.footer}>
            <Animated.Text
              entering={SlideInRight}
              exiting={SlideOutLeft}
              style={styles.title}>
              {data.title}
            </Animated.Text>
            <Animated.Text
              entering={SlideInRight.delay(50)}
              exiting={SlideOutLeft}
              style={styles.description}>
              {data.description}
            </Animated.Text>
            <View style={styles.buttonsRow}>
              <Text onPress={endOnboarding} style={styles.buttonText}>Skip</Text>

              <Pressable onPress={onContinue} style={styles.button}>
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </GestureDetector>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15141A',

  },
  pageContent: {
    padding: 20,
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    margin: 20,
    marginTop: 70
  },
  title: {
    color: '#fdfdfd',
    fontSize: 50,
    fontFamily: 'InterBlack',
    letterSpacing: 1.3,
    marginVertical: 10,
  },
  description: {
    color: 'gray',
    fontSize: 20,
    fontFamily: 'Inter',
    lineHeight: 28
  },
  footer: {
    marginTop: 'auto'
  },

  buttonsRow: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  button: {
    backgroundColor: '#302e38',
    borderRadius: 50,
    flex: 1,
  },
  buttonText: {
    color: '#fdfdfd',
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    textAlign: 'center',

    padding: 15,
    paddingHorizontal: 25
  },

  //steps
  stepIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 15,
  },
  stepIndicator: {
    flex: 1,
    height: 3,
    backgroundColor: 'gray',
    borderRadius: 10,
  }
})