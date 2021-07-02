import * as React from "react";
import { Checkbox, IconButton } from "react-native-paper";
import { Animated, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

const CustomListItem = React.memo((props) => {
  const { checked, content, completeItem, createTime, deleteItem } = props;

  const renderRightActions = (progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
    });
    return (
      <View>
        <Animated.View
          style={{
            ...styles.rightAction,
            ...{
              transform: [{ translateX: trans }],
              width: 64,
              backgroundColor: "#dd2c00",
            },
          }}
        >
          <IconButton
            icon="delete"
            onPress={() => deleteItem(createTime)}
            accessibilityLabel="Delete List Item"
          />
        </Animated.View>
      </View>
    );
  };
  return (
    <Swipeable
      key={`complete${createTime}`}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}
      renderLeftActions={false}
      renderRightActions={renderRightActions}
    >
      <View>
        <Checkbox.Item
          labelStyle={checked ? styles.completedListText : styles.listText}
          position="leading"
          label={content}
          status={checked ? "checked" : "unchecked"}
          onPress={() => completeItem(createTime)}
          mode="android"
        />
      </View>
    </Swipeable>
  );
});

const styles = StyleSheet.create({
  rightAction: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listText: {
    textAlign: "left",
    marginLeft: 5,
  },
  completedListText: {
    textAlign: "left",
    marginLeft: 5,
    textDecorationLine: "line-through",
  },
});

export default CustomListItem;
