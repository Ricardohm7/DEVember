import { FlatList, StyleSheet, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { AmaticSC_400Regular, AmaticSC_700Bold } from '@expo-google-fonts/amatic-sc'
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import DayListItem from '../components/core/DayListItem';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const days = Array.from({ length: 24 }, (_, i) => i + 1);

export default function HomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    Inter: Inter_900Black,
    Amatic: AmaticSC_400Regular,
    AmaticBold: AmaticSC_700Bold
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }

  }, [fontsLoaded, fontError])

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatList}
        columnWrapperStyle={styles.column}
        data={days}
        renderItem={({ item }: { item: number }) => <DayListItem day={item} />}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    gap: 10,
    padding: 10
  },
  column: {
    gap: 10,
  },
});
