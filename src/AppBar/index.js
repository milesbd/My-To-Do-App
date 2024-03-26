import * as React from "react";
import { Appbar, useTheme } from "react-native-paper";
import Constants from "expo-constants";
import { PreferencesContext } from "../PreferencesContext";
import ActionMenu from "./actionMenu";

const TopNav = () => {
  const theme = useTheme();
  const { darkMode } = React.useContext(PreferencesContext);
  return (
    <Appbar.Header
      style={darkMode ? {} : { backgroundColor: theme.colors.primary }}
      safeAreaInsets={Constants.statusBarHeight}
    >
      <Appbar.Content title="My To Do List" />
      <ActionMenu />
    </Appbar.Header>
  );
};

export default TopNav;
