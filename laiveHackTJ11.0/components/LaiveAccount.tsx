import { TextInput, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import React, { useState, useContext } from 'react';
import AppContext from "./AppContext";

import LogIn from './LogIn';
import SignUp from './SignUp';
import Account from './Account';

export default function LaiveAccount() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const context = useContext(AppContext);

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
        })
      }
    })
    context.setIsSignedIn(true);
    context.setPassword(password);
    context.setEmail(email);
  }

  const signOut = () => {
    context.setIsSignedIn(false)
    context.setPassword("");
    context.setEmail("");
  }

  const swapSignUp = () => {
    setIsSigningUp(!isSigningUp);
  }

  return (
    <View style={styles.container}>
      {context.isSignedIn ? (
        <Account />
      ) : (
        <View>
          {isSigningUp ? (
            <SignUp />
          ) : (
            <LogIn />
          )}
          <Pressable style={{ marginTop: 20, padding: 20, backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR }} onPress={swapSignUp}>
            {isSigningUp ? (
              <Text style={{ color: "#fff" }}>Click here if you already have an account.</Text>
            ) : (
              <Text style={{ color: "#fff" }}>If you don't have an account with us, click here.</Text>
            )  
            }
          </Pressable>
        </View>
      )}
    </View>
  )
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
  },
  signInTitle: {
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
    // backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOutButton: {
    // backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    height: 45,
    width: 250,
    borderRadius: 20,
    backgroundColor: '#64B5F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
