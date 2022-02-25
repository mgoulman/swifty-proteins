import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

const Signin = ({navigation}) => {

  const onTouchID = async () => {
    try {
      const isCompatible = await LocalAuthentication.hasHardwareAsync();
      if (!isCompatible) {
        throw new Error(
          "Your device is not compatible, you must have TouchID to signIN"
        );
      }
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        throw new Error("Your device is not Enrolled");
      }
      const worked = await LocalAuthentication.authenticateAsync();
      if (worked){
          navigation.navigate('Home');
      alert("you're logged in");
    }
    } catch (error) {
      alert("an Error has occured, please try again, or maybe later");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Press The Butto to Sign IN</Text>
      <Button title="signin" onPress={onTouchID} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Signin;
