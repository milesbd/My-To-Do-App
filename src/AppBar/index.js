import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import ActionMenu from "./actionMenu";

const TopNav = () => {
  return (
    <Appbar.Header style={styles.appBar}>
      <Appbar.Content title="My To Do List" />
      <ActionMenu />
    </Appbar.Header>
  );
};
const styles = StyleSheet.create({
  appBar: {
    marginTop: Constants.statusBarHeight,
  },
});

export default TopNav;
