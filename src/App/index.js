import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { todoHook } from "../Hooks";
import { PreferencesContext } from "../PreferencesContext";

import TopNav from "../AppBar";
import ListItems from "../ListItem";

const App = () => {
  const { list } = todoHook();
  const { darkMode } = React.useContext(PreferencesContext);

  return (
    <View
      style={{
        ...styles.container,
        ...{ backgroundColor: darkMode ? "#000" : "#FaFaFa" },
      }}
    >
      <TopNav />
      <ListItems list={list} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
