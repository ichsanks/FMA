import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const Logo = () => (
  <Image
    resizeMode="contain"
    style={styles.logo}
    source={require("./FMA.jpeg")}
  />
);

const imageWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  logo: {
    width: imageWidth / 2,
    height: 150,
    alignSelf: "center"
  },
  text: {
    fontSize: 28,
    marginTop: 15
  }
});

export default Logo;
