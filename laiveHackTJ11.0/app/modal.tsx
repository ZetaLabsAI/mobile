import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Help</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>What is Laive?</Text>
      <Text style={styles.answer}>
      Laive allows users to connect a wide range of softwares to a single reservoir, allowing for easy access to relevant information. Rather than looking through and interpreting out of reach information from each source, users can perform one easy search across all linked softwares for practically anything. 
      </Text>
      <Text style={styles.title}>How does it work?</Text>
      <Text style={styles.answer}>
        You can ask questions and get help from others. You can also help others by answering their questions.
      </Text>
      <Text style={styles.title}>How do I get started?</Text>
      <Text style={styles.answer}>
        Just sign up and you can start asking and answering questions.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
    width: "100%",
    height: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    marginLeft: "10%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 30,
    width: "80%",
  },
  answer: {
    fontSize: 15,
    marginBottom: 10,
    marginLeft: 30,
    width: "80%",
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
});
