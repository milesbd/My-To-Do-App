import * as React from "react";
import { Button, Modal, TextInput, Portal } from "react-native-paper";
import { StyleSheet, View, } from "react-native";
import { PreferencesContext } from "../PreferencesContext";

const AddListItem = React.memo((props) => {
  const { visible, setVisible, addItem } = props;
  const [text, setText] = React.useState("");
  const { darkMode } = React.useContext(PreferencesContext);

  const hideModal = () => setVisible(false);
  const addListItem = () => {
    setVisible(false);
    addItem(text);
    setText("");
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          ...styles.container,
          ...{ backgroundColor: darkMode ? "#303030" : "#FaFaFa" },
        }}
      >
        <TextInput
          label="Add To Do Item"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <View style={styles.buttonRow}>
          <Button
            icon="cancel"
            mode="outlined"
            onPress={hideModal}
            accessibilityLabel="Cancel Addition of new List Item"
          >
            Cancel
          </Button>
          <Button
            icon="plus-circle-outline"
            mode="contained"
            style={styles.button}
            onPress={addListItem}
            accessibilityLabel="Confirm Addition of new List Item"
          >
            Add
          </Button>
        </View>
      </Modal>
    </Portal>
  );
});

const AddListItemButton = React.memo((props) => {
  const { setVisible } = props;
  const showModal = () => setVisible(true);
  return (
    <Button
      icon="plus"
      onPress={showModal}
      accessibilityLabel="Add New List Item"
    >
      Add Item
    </Button>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 25,
    marginLeft: 20,
    marginRight: 20,
    minHeight: "20%",
  },
  buttonRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginLeft: 8,
  },
});

export { AddListItemButton, AddListItem };
