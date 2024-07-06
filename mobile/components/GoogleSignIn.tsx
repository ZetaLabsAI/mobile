import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useContext } from "react";
import * as WebBrowser from "expo-web-browser";
import { useNavigation } from "@react-navigation/native";

import AppContext from "./AppContext";

const SignIn = () => {
  const YOUR_CLIENT_ID = "78467360708-q883c862hm9omjbhjkd9ctjdjtll2eam.apps.googleusercontent.com"
  const YOUR_REDIRECT_URI = "https://zeta-labs-backend-5ba732d1aabf.herokuapp.com/google_redirect"

  const context = useContext(AppContext);
   
  const handlePress = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/drive&access_type=offline&state=${context.email}&prompt=consent`,
      YOUR_REDIRECT_URI
    )
  }

  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
      onPress={handlePress}
      >
        <View style={styles.circle}>
          <Image style={styles.googleLogo} source={require("../assets/images/google.png")} />
          <Text style={styles.text}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  circle: {
    width: 200,
    height: 40,
    borderRadius: 50 / 2,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 15,
  },
  googleLogo: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});

// import * as React from 'react';
// import { Button, View } from 'react-native';
// import * as AuthSession from 'expo-auth-session';

// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
//   tokenEndpoint: 'https://accounts.google.com/o/oauth2/token',
// };

// const SignIn = () => {
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//     {
//       redirectUri: AuthSession.makeRedirectUri(),
//       clientId: '706719693983-312cmccc3faeobtajbpv7260rq268d52.apps.googleusercontent.com',
//       scopes: ['openid', 'profile', 'email'],
//     },
//     discovery
//   );

//   React.useEffect(() => {
//     if (response) {
//       console.log(response);
//       // Handle the response here
//     }
//   }, [response]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Button
//         title="Sign in with Google"
//         onPress={() => {
//           promptAsync();
//         }}
//       />
//     </View>
//   );
// };

// export default SignIn;