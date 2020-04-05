import React, { useCallback } from "react"
import { TodoItem, Actions, Types, TodoContextType } from "../types";
import { TouchableOpacity, View, Switch, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback } from "react-native";
import { COLORS } from "../constants";



interface TodoProps {
   item: TodoItem
   setActive: (arg: string)=>void;
   toggleTodo: TodoContextType["toggleTodo"]
}



export const Todo: React.FC<TodoProps> = ({item: {isComplete, id, text}, toggleTodo, setActive}) => {

    return (
            <TouchableNativeFeedback  onPress={()=>setActive(id)}>
              <View style={styles.card} >
                  <Text style={styles.text}> {text}  </Text>
                  <Switch
                    trackColor={{ false: "#000", true:" #664B86"}}
                    thumbColor={isComplete ?  COLORS.PRIMARY : "#664B86"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>toggleTodo(id)}
                    value={isComplete}
                 />
              </View>
              </TouchableNativeFeedback>
    
    );
  }


  const styles = StyleSheet.create({
    card: {
        elevation: 1,
        backgroundColor: COLORS.SURFACE,
        flexDirection: "row",
        marginBottom: 10,
        padding: 10,
        justifyContent: "space-between",
    },
    text:{
        fontSize: 20,
        color: "white",
    }
    
  });
  