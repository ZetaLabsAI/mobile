import { TextInput, Pressable, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import React, { useState, useContext } from 'react';
import AppContext from "./AppContext";

export default function Account() {
  const context = useContext(AppContext);
  
  const signOut = () => {
    context.setIsSignedIn(false)
    context.setPassword("");
    context.setEmail("");
  }

  return (
    <View style={{ backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR, padding: 20, flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
      <Text style={styles.title}>You are signed in</Text>
      <Text>If you're new here, check your email to confirm your account. If you're a Laive veteran, we're glad to have you back.</Text>
      <Pressable style={styles.signUpButton} onPress={signOut}>
        <Text style={{ color: "#fff" }}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  signUpButton: {
    backgroundColor: '#64B5F6',
    height: 45,
    width: 200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signInTitle: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 10,
  },
});