import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://cutpunqqrxhoyvgwaodk.supabase.co'
// const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string
// const supabase = createClient(supabaseUrl, supabaseKey)

import Chat from '@/components/Chat';
import React from 'react';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
