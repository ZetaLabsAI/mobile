import { Button, StyleSheet, TextInput, Pressable, ToastAndroid } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import SignIn from '@/components/SignIn';

import { ToastProvider } from 'react-native-toast-notifications'
import { useToast } from "react-native-toast-notifications";

export default function TabTwoScreen() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const doesHaveAccount = () => {
    const endpoint = "https://laivehacktj-f736fedf6a43.herokuapp.com/sign_in";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: email, password: password }),
    }).then(response => response.text()).then(data => {
      if (data === "NO") {
        const endpoint2 = "https://laivehacktj-f736fedf6a43.herokuapp.com/create_user";
        fetch(endpoint2, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: email, password: password }),
        }).then(response => response.text()).then(data => {
          console.log(data);
          const toast = useToast();
          toast.show("Check your email to confirm your account!", { type: "success" })
        })
      }
    })
    setIsSignedIn(true);
  }

  const SignIn = () => {
    setIsSignedIn(true);
    const endpoint = "https://laivehacktj-f736fedf6a43.herokuapp.com/create_user";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: email, password: password }),
    })
  };
  return (
    <ToastProvider>
    <View style={styles.container}>
      {isSignedIn ? (
        <View style={{ backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, padding: 20, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>You are signed in</Text>
          <Text>If you're new here, check your email to confirm your account. If you're a Laive veteran we're glad to have you back :)</Text>
        </View>
      ) : (
        <View>
          <View style={{ backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder="Email" ref={input => { var text = input }} onChangeText={text => setEmail(text)} value={email}/>
            <TextInput style={styles.input} placeholder="Password" ref={input => { var text = input }} onChangeText={text => setPassword(text)} value={password}/>
            <Pressable style={styles.signUpButton} onPress={doesHaveAccount}>
              <Text style={{ color: "#fff" }}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={doesHaveAccount} style={{ marginTop: 20 }}>
              <Text style={{ color: "#fff" }}>Already have an account? Sign up</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
    height: "100%",
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    backgroundColor: "#fff",
    color: process.env.EXPO_PUBLIC_TERTIARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    paddingLeft: 10,
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
