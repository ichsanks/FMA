import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export const Textbox = ({
  editable,
  secureTextEntry,
  autoCapitalize,
  label,
  multiline,
  onChangeText,
  value
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={styles.input}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      spellCheck={false}
      underlineColorAndroid="transparent"
      autoCorrect={false}
      multiline={multiline}
      editable={editable}
      value={value}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#e0e0e0"
  },
  input: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16
  },
  label: {
    position: "absolute",
    left: 10,
    top: 5,
    color: "grey"
  }
});
