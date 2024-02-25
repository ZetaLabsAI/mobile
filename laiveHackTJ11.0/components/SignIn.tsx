// create google auth login with expo-auth-session

import React from 'react';
import { View, Text, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

export default function SignIn() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest
  ({
    clientId: 'YOUR_CLIENT',
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log(id_token);
    }
  }, [response]);

  return (
    <View>
      <Button
        disabled={!request}
        title="Login with Google"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}