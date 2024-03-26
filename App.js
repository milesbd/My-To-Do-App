import * as React from "react";
import { AppRegistry } from "react-native";
import { PreferencesContext } from "./src/PreferencesContext";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  MD3DarkTheme as DarkTheme,
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { name: appName } = "./app.json";
import App from "./src/App";

const Main = ()=> {
  const [darkMode, setDarkMode] = React.useState(false);

  React.useEffect(() => {
    const setInitial = async () => {
      const darkUnparsed = await AsyncStorage.getItem("darkMode");
      const dark =
        darkUnparsed !== null && typeof darkUnparsed !== undefined
          ? JSON.parse(darkUnparsed)
          : false;
      setDarkMode(dark);
    };
    setInitial();
  }, [darkMode, setDarkMode]);

  const theme = darkMode
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: "#9C2444",
          accent: "#873849",
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: "#9C2444",
          accent: "#873849",
        },
      };

  const toggleDark = React.useCallback(async () => {
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(!darkMode));
      return setDarkMode(!darkMode);
    } catch (e) {
      console.error(e);
      return setDarkMode(!darkMode);
    }
  }, [darkMode]);

  const preferences = React.useMemo(
    () => ({
      toggleDark,
      darkMode,
    }),
    [toggleDark, darkMode]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme} >
        <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
        </GestureHandlerRootView>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
export default Main;

AppRegistry.registerComponent(appName, () => Main);
