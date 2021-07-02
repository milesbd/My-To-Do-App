import * as React from "react";
import { View, StyleSheet, Linking, ScrollView } from "react-native";
import {
  Menu,
  Appbar,
  Switch,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Subheading,
  List,
  Divider,
  IconButton,
} from "react-native-paper";
import Constants from "expo-constants";
import { todoHook } from "../Hooks";
import PrivacyPolicy from "./PrivacyPolicy";
import { PreferencesContext } from "../PreferencesContext";

const ActionMenu = () => {
  const { deleteCompletedItems } = todoHook();
  const { toggleDark, darkMode } = React.useContext(PreferencesContext);

  // State and functions to control the menu
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // State and functions to control the Delete all Completed Items dialog
  const [dialog, setDialog] = React.useState(false);
  const showDialog = () => {
    closeMenu();
    setDialog(true);
  };
  const hideDialog = () => setDialog(false);
  const confirmDelete = () => {
    deleteCompletedItems();
    hideDialog();
  };

  // State and functions to control the about dialog
  const [about, setAbout] = React.useState(false);
  const showAbout = () => {
    closeMenu();
    setAbout(true);
  };
  const hideAbout = () => setAbout(false);

  // State and functions to control the privacy dialog
  const [privacy, setPrivacy] = React.useState(false);
  const showPrivacy = () => {
    closeMenu();
    setPrivacy(true);
  };
  const hidePrivacy = () => setPrivacy(false);

  const MORE =
    typeof Platform === "undefined"
      ? "dots-vertical"
      : Platform.OS === "ios"
      ? "dots-horizontal"
      : "dots-vertical";

  const goToURL = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Unable to open this URL: " + url);
      }
    });
  };

  return (
    <View style={styles.menuView}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        statusBarHeight={Constants.statusBarHeight}
        overlayAccessibilityLabel="Close Application Menu"
        anchor={
          <Appbar.Action
            icon={MORE}
            onPress={openMenu}
            color={"white"}
            accessibilityLabel="Open Application Menu"
          />
        }
      >
        <Menu.Item
          onPress={() => toggleDark()}
          title={`Dark Mode ${darkMode ? "On" : "Off"}`}
          icon={() => (
            <Switch value={darkMode} onValueChange={() => toggleDark()} />
          )}
        />
        <Menu.Item onPress={showDialog} title="Delete Completed" />
        <Menu.Item onPress={showAbout} title="About" />
        <Menu.Item onPress={showPrivacy} title="Privacy" />
      </Menu>
      <Portal>
        <Dialog visible={dialog} onDismiss={hideDialog}>
          <Dialog.Title>Delete All Completed To Dos?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              This action will delete all the completed To Dos. This action
              cannot be undone.
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={confirmDelete}>Delete All</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={about} onDismiss={hideAbout}>
          <Dialog.Title>About</Dialog.Title>
          <Dialog.Content>
            <Subheading style={styles.subHeading}>
              What Will You do Today?
            </Subheading>
            <Divider style={styles.hiddenDivider} />
            <Paragraph>
              Welcome to the "My To Do" app. It was conceived to be a simple,
              single-list To Do app to allow you to increase productivity while
              keeping things simple.
            </Paragraph>
            <Paragraph>
              The app stores your To Do list solely on your phone, no
              cross-device support, no online backups, just you and your list of
              things to do.
            </Paragraph>
            <Divider style={styles.divider} />
            <List.Accordion title="Using the App" titleStyle={styles.bold}>
              <List.AccordionGroup>
                <List.Accordion
                  title="Adding Items"
                  id="Adding Items"
                  titleStyle={styles.indent}
                >
                  <Paragraph style={styles.accordionContent}>
                    To create To Do items, press the "Add Item" button, and type
                    in the task.
                  </Paragraph>
                </List.Accordion>
                <List.Accordion
                  title="Completing Items"
                  id="Completing Items"
                  titleStyle={styles.indent}
                >
                  <Paragraph style={styles.accordionContent}>
                    Tasks can be completed by clicking the box or entire row
                  </Paragraph>
                </List.Accordion>
                <List.Accordion
                  title="Deleting Items"
                  id="Deleting Items"
                  titleStyle={styles.indent}
                >
                  <Paragraph style={styles.accordionContent}>
                    Tasks can be deleted by swiping right to left on the row,
                    and clicking the trash can icon.
                  </Paragraph>
                </List.Accordion>
              </List.AccordionGroup>
            </List.Accordion>
            <Divider style={styles.divider} />
            <Subheading>Connect with us!</Subheading>
            <View style={styles.socialRow}>
              <IconButton
                icon="instagram"
                size={32}
                accessibilityLabel="Follow us on Instagram"
                onPress={() =>
                  goToURL("https://www.instagram.com/milesbd_consulting/")
                }
              />
              <IconButton
                icon="email-outline"
                size={32}
                accessibilityLabel="Email us"
                onPress={() =>
                  goToURL(
                    "mailto:help@milesbd.ca?subject=Issue with 'My To Do' app"
                  )
                }
              />
              <IconButton
                icon="github-circle"
                size={32}
                accessibilityLabel="Connect with us on Github"
                onPress={() => goToURL("https://github.com/milesbd")}
              />
            </View>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideAbout}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={privacy}
          onDismiss={hidePrivacy}
          style={styles.privacy}
        >
          <Dialog.Title>Privacy Policy</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={styles.scrollArea}>
              <PrivacyPolicy />
            </ScrollView>
          </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hidePrivacy}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  indent: {
    marginLeft: 10,
  },
  accordionContent: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
    opacity: 0,
  },
  hiddenDivider: {
    marginTop: 10,
    marginBottom: 10,
    opacity: 0,
  },
  subHeading: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  socialRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  privacy: { marginVertical: "30%" },
  scrollArea: { paddingHorizontal: 24 },
  bold: { fontWeight: "bold" },
  menuView:{ flexDirection: "row", justifyContent: "center" }
});

export default ActionMenu;
