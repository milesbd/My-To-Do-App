import * as React from "react";
import _ from "lodash";
import { List } from "react-native-paper";
import { View } from "react-native";
import { AddListItem, AddListItemButton } from "./addListItem";
import { todoHook } from "../Hooks";
import CustomListItem from "./customListItem";

const ListItems = React.memo(() => {
  const { list, completeItem, deleteItem, addItem } = todoHook();
  const [visible, setVisible] = React.useState(false);

  const todoList = _.sortBy(
    list.filter((l) => l.checked === !true),
    ["createTime"]
  );
  const completedList = _.sortBy(
    list.filter((l) => l.checked === true),
    ["createTime"]
  );

  return (
    <View>
      <AddListItem visible={visible} setVisible={setVisible} addItem={addItem} />
      <List.Section>
        <List.Subheader>To Dos</List.Subheader>
        {todoList.length > 0 &&
          todoList.map((li, i) => {
            return (
              <CustomListItem
                {...li}
                key={`incomplete${li.createTime}`}
                completeItem={(li) => completeItem(li)}
                deleteItem={(li)=>deleteItem(li)}
              />
            );
          })}
        <AddListItemButton setVisible={setVisible} />
      </List.Section>
      {completedList.length > 0 && (
        <List.Section>
          <List.Subheader>Completed Tasks</List.Subheader>
          {completedList.map((li, i) => {
            return (
              <CustomListItem
                {...li}
                customStyling={{textDecorationLine:"line-through"}}
                key={`incomplete${li.createTime}`}
                completeItem={(li) => completeItem(li)}
                deleteItem={(li)=>deleteItem(li)}
              />
            );
          })}
        </List.Section>
      )}
    </View>
  );
});

export default ListItems;
