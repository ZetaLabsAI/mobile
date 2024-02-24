import React from 'react';
import { Text, TextInput, View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://cutpunqqrxhoyvgwaodk.supabase.co'
// const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string
// const supabase = createClient(supabaseUrl, supabaseKey)

export default function Chat() {
  const [messages, setMessages] = useState(["‎Welcome to Laive. What can I help you with?"]);
  const [currMessage, setCurrMessage] = useState("");

  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleItemPress = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }

  const sendMessage = () => {
    handleItemPress();
    setMessages([...messages, currMessage]);

    const endpoint = "https://laivehacktj-f736fedf6a43.herokuapp.com/query";
    fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: 'test_user2', query: currMessage }),
    })
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      setMessages([...messages, currMessage, "‎" + data]);
    })
    .catch((error) => {
      setMessages([...messages, currMessage, "‎I'm sorry, I don't understand."]);
      console.error("Error:", error);
    });

    // const xhr = new XMLHttpRequest();
    // xhr.open("POST", "https://laivehacktj-f736fedf6a43.herokuapp.com/query");
    // xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    // const body = JSON.stringify({
    //   user_id: "test_user2",
    //   query: currMessage,
    // });
    // xhr.onload = () => {
    //   if (xhr.readyState == 4 && xhr.status == 201) {
    //     console.log(JSON.parse(xhr.responseText));
    //     setMessages([...messages, "‎" + JSON.parse(xhr.responseText)["response"]]);
    //   } else {
    //     console.log(`Error: ${xhr.status}`);
    //   }
    // };
    // xhr.send(body);

    setCurrMessage("");
  }

  // const uploadFile = () = {
  //   console.log("uploading file");
  // }
 
  return (
    <View style={styles.container}>
      <ScrollView style={styles.messages}
        ref={scrollViewRef}
      >
        {messages.map((message) => (
          <View>
            {/* check if message starts with I'm */}
            {message.startsWith("‎") ? <Text style={styles.messageSender}>Laive</Text> : <Text style={styles.messageSender}>You</Text>}
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.sendChat}>
        <Pressable style={styles.uploadFile}>
          <AntDesign name="file1" size={20} color="black" />
        </Pressable>
        <TextInput style={styles.chatInput}
          ref={input => { var text = input }}
          onChangeText={text => setCurrMessage(text)}
          value={currMessage}
        />
        <Pressable style={styles.sendChatButton} onPress={sendMessage}>
          <Ionicons name="send" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messages: {
    overflow: 'scroll',
    marginBottom: 5,
  },
  container: {
    backgroundColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR,
  },
  chat: {
    color: process.env.EXPO_PUBLIC_TERTIARY_COLOR,
  },
  chatInput: {
    backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    color: process.env.EXPO_PUBLIC_TERTIARY_COLOR,
    height: 45,
    width: "70%",
    borderRadius: 20,
    paddingLeft: 10,
  },
  sendChat: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
  },
  sendChatButton: {
    backgroundColor: process.env.EXPO_PUBLIC_SECONDARY_COLOR,
    height: 45,
    width: 45,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadFile: {
    backgroundColor: "#fff",
    height: 45,
    width: 45,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageSender: {
    color: process.env.EXPO_PUBLIC_TEXT_PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 18,
  },
  messageText: {
    color: process.env.EXPO_PUBLIC_TEXT_PRIMARY_COLOR,
    fontSize: 18,
  },
});