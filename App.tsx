import { FlatList, StyleSheet, Text, View } from 'react-native';
import DayListItem from './src/components/core/DayListItem';

const days = Array.from({ length: 24 }, (_, i) => i + 1);

export default function App() {
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
