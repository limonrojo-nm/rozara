import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { PaperProvider, Text } from 'react-native-paper';
import UnoSiUnoNoScreen from './rzr-ritmo/screens/UnoSiUnoNoScreen';
import { theme } from './theme';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>

        <UnoSiUnoNoScreen />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0ff',
    width: '100%',
    height: '100%',
  },
});
