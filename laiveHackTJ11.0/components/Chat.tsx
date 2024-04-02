import React, { useContext } from 'react';
import { Text, TextInput, View, StyleSheet, Pressable, ScrollView, SafeAreaView, Modal } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import SignIn from './GoogleSignIn';

import * as DocumentPicker from 'expo-document-picker';

import AppContext from './AppContext';

// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://cutpunqqrxhoyvgwaodk.supabase.co'
// const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY as string
// const supabase = createClient(supabaseUrl, supabaseKey)

export default function Chat() {
  const [messages, setMessages] = useState(["‎Welcome to Laive. What can I help you with?"]);
  const [currMessage, setCurrMessage] = useState("");

  const [uploaded, setUploaded] = useState(false);

  const scrollViewRef = React.useRef<ScrollView>(null);

  const handleItemPress = () => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }

  const [modalVisible, setModalVisible] = useState(false);
  const context = useContext(AppContext);
  const [signInModal, setSignInModal] = useState(context.isSignedIn);

  const uploadFile = () => {
    console.log(context.isSignedIn)
    if (context.isSignedIn) {
      setModalVisible(true);
      setSignInModal(false);
    } else {
      setModalVisible(false);
      setSignInModal(false);
      setSignInModal(true);
    }
  }

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    const endpoint = "https://laivehacktj-f736fedf6a43.herokuapp.com/upload_media";
    const uri = result.assets[0].uri;
    const type = result.assets[0].mimeType;
    const name = result.assets[0].name;
    
    // send file to server
    const formData = new FormData();
    formData.append("$test_user2", { uri, type, name });
    fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(response => response.text()).then(data => {
      setUploaded(true);
    })
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
      body: JSON.stringify({ user_id: context.email, query: currMessage }),
    })
    .then((response) => response.text())
    .then((data) => {

      if (data.includes("<title>Application Error</title>")) {
        setMessages([...messages, currMessage, "‎I'm sorry, I don't understand. Please try again later."]);
      } else {
        setMessages([...messages, currMessage, "‎" + data]);
      }
    })
    .catch((error) => {
      setMessages([...messages, currMessage, "‎I'm sorry, I don't understand."]);
      console.error("Error:", error);
    });
    setCurrMessage("");
  }

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={signInModal}
        onRequestClose={() => {
          setSignInModal(!signInModal)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Sign in to access Laive</Text>
            
            <Pressable
              style={styles.closeModal}
              onPress={() => setSignInModal(!signInModal)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Connect with Google or upload files straight from your device</Text>
            <SignIn />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={pickDocument}
            >
              <AntDesign name="file1" size={20} color="black" style={{ marginRight: 10 }} />
              <Text style={styles.textStyle}>Upload File</Text>
            </Pressable>
            {uploaded ? <Text style={styles.successfullUpload}>File uploaded successfully!</Text> : null}
            <Pressable
              style={styles.closeModal}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.sendChat}>
        <Pressable style={styles.uploadFile} onPress={uploadFile}>
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
    paddingHorizontal: 15,
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
  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "white",
    flexDirection: "row",
    marginTop: 10,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "white",
    borderWidth: 1,
  },
  textStyle: {
    color: "black",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  successfullUpload: {
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  closeModal: {
    borderRadius: 20,
    padding: 8,
    width: 80,
    backgroundColor: "#64B5F6",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});