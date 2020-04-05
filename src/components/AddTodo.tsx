import React, { useState} from "react"
import { View,  Keyboard, StyleSheet } from "react-native";
import { TodoContextType } from "../types";
import {Ionicons} from "@expo/vector-icons"
import { COLORS } from "../constants";
import { AppInputText } from "./AppInputText";

export const AddTodo: React.FC<{addTodo: TodoContextType["addTodo"]}> = ({addTodo}) => {
  const [text, setText] = useState("")
  const handleClick = ()=>{
    if(text.trim()){
      addTodo({id: `${Date.now()}`, text, isComplete: false})
      
    }
    Keyboard.dismiss()
    setText("")
  }
  return (
    <View style={styles.block}>
      <AppInputText value={text} style={styles.textInput} onChangeText={setText} onSubmitEditing={handleClick}/>
      <Ionicons.Button name="md-create" color={"#000"} backgroundColor={COLORS.PRIMARY} onPress={handleClick}>СОЗДАТЬ</Ionicons.Button>

    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "flex-end",
    
    
  },
  textInput: {
    paddingLeft: 5,
    marginRight: 10,
    flexGrow: 1,
  },
  button: {
    fontSize: 20
  },
});
