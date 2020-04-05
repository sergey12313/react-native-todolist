import React, { useCallback } from "react"
import {ScrollView , Text, StyleSheet, View, Switch } from "react-native"
import { TodoItems , TodoStateType, TodoContextType } from "../types";
import {Todo} from "./Todo"

interface TodoListProps {
    state: TodoStateType; 
    toggleTodo: TodoContextType["toggleTodo"];
    setActive: (arg: string)=>void;

}


export const TodoList: React.FC<TodoListProps> = ({state, toggleTodo, setActive}) => {
    return (
      <ScrollView  style={styles.container}>
          {state.todos.map((el)=>(
              <Todo key={el.id} setActive={setActive}  item={el} toggleTodo={toggleTodo}/>
          ))}
      </ScrollView >
    );
  }

  
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginBottom:10
    },

    
  });
  