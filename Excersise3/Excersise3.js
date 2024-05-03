import React, { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { Appbar, Button, TextInput } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import Todo from "./todo";

const Excersise3 = () => {
  const ref = firestore().collection("todos");
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);

  async function addTodo() {
    await ref.add({
      title: todo,
      complete: false,
    });
    setTodo("");
  }

  useEffect(() => {
    return ref.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const { title, complete } = doc.data();
        list.push({
          id: doc.id,
          title,
          complete,
        });
      });
      setTodos(list);
      if (loading) {
        setLoading(false);
      }
    });
  });
  if (loading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar style={{backgroundColor: 'skyblue'}}>
        <Appbar.Content
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          title={"TODOs List"}
        />
      </Appbar>
      <FlatList
        style={{
          flex: 1,
        }}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Todo {...item} />}
      />
      <TextInput
        label={"New Todo"}
        value={todo}
        onChangeText={(text) => setTodo(text)}
      />
      <Button onPress={addTodo}>Add TODO</Button>
    </View>
  );
};
export default Excersise3;
