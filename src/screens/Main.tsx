import React, { useContext } from "react";
import { AddTodo } from "../components/AddTodo";
import { TodoList } from "../components/TodoList";
import { Image, View, StyleSheet, Text, ActivityIndicator } from "react-native";
import {TodoContext} from "../context/todo/todoContext"
import {ActiveItemContext} from "../context/activeItem/activeItemContext"
import { TodoContextType } from "../types";


export const Main: React.FC<{}> = () => {
  const  {state, toggleTodo, addTodo} = useContext<TodoContextType>(TodoContext)
  const {setActive} = useContext(ActiveItemContext)
  
  const content = (
    <TodoList state={state} toggleTodo={toggleTodo} setActive={setActive}></TodoList>
  );
  const loading = (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )

  const noItems = (

    <View style={styles.wrapper}>
    <Image
      style={styles.image}
      source={require("../../assets/no-items.png")}
    ></Image>
    <Text  style={styles.text}>Пусто!!!</Text>
    </View>
  );
  return (
    <React.Fragment>
      <AddTodo addTodo={addTodo}></AddTodo>
      {state.isLoading ? loading : !!state.todos.length ? content : noItems}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "contain"
    
  },
  text: {
    marginTop: 0,
    fontSize: 25,
    color: "white"
  }
})