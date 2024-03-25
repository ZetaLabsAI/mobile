import { TextInput, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import React, { useState, useContext } from 'react';
import AppContext from "./AppContext";

export default function LaiveSignIn() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const context = useContext(AppContext);

  const doesHaveAccount = () => {
    // const endpoint = "https://laivehacktj-f736fedf6a43.herokuapp.com/sign_in";
    // fetch(endpoint, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ user_id: email, password: password }),
    // }).then(response => response.text()).then(data => {
    //   if (data === "NO") {
    //     const endpoint2 = "https://laivehacktj-f736fedf6a43.herokuapp.com/create_user";
    //     fetch(endpoint2, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ user_id: email, password: password }),
    //     })
    //   }
    // })
    context.setIsSignedIn(true);
    context.setPassword(password);
    context.setEmail(email);
  }

  const signOut = () => {
    context.setIsSignedIn(false)
    context.setPassword("");
    context.setEmail("");
  }

  return (
    <View style={styles.container}>
      {context.isSignedIn ? (
        <View style={{ backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, padding: 20, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>You are signed in</Text>
          <Text>If you're new here, check your email to confirm your account. If you're a Laive veteran, we're glad to have you back.</Text>
          <Pressable style={styles.signUpButton} onPress={signOut}>
              <Text style={{ color: "#fff" }}>Sign Out</Text>
            </Pressable>
        </View>
      ) : (
        <View>
          <View style={{ backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.signInTitle}>Access Laive</Text>
            <TextInput style={styles.input} placeholder="Email" ref={input => { var text = input }} onChangeText={text => setEmail(text)} value={email}/>
            <TextInput style={styles.input} placeholder="Password" ref={input => { var text = input }} onChangeText={text => setPassword(text)} value={password}/>
            <Pressable style={styles.signUpButton} onPress={doesHaveAccount}>
              <Text style={{ color: "#fff" }}>Sign In</Text>
            </Pressable>
            <Pressable style={{ marginTop: 20, padding: 20 }}>
              <Text style={{ color: "#fff" }}>If you don't have an account with us, this page will sign you up as well!</Text>
            </Pressable>
          </View>
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
