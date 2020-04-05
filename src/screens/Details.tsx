import React, {  useContext, ReactElement, useState } from "react";
import { Types, TodoContextType } from "../types";
import { FontAwesome,  Entypo, AntDesign } from '@expo/vector-icons';
import { Button, Text, Alert, View, StyleSheet, ViewStyle, TouchableNativeFeedback, TouchableNativeFeedbackProps, Modal, TouchableHighlight } from "react-native";
import {ActiveItemContext} from "../context/activeItem/activeItemContext"
import {TodoContext} from "../context/todo/todoContext"
import { AppInputText } from "../components/AppInputText";
import { COLORS } from "../constants";
import { AppModal } from "./Modal";



export const Details: React.FC<{}> = () => {
  const {active: id, clearActive} = useContext(ActiveItemContext)
  const {getById, editTodo,  removeTodo} = useContext<TodoContextType>(TodoContext)
  const [modalVisible, setModalVisible] = useState(false);

  const item = getById(id)

  if(!item) {
    clearActive()
  }
 
 const handleRemove = () =>{
   clearActive()
    removeTodo(item!.id)
 }


 const showAlert = () =>
    Alert.alert(
      "Подтверддите удаление",
       item!.text,
      [
        {
          text: "Отмена",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Удалить", onPress: handleRemove }
      ],
      { cancelable: false }
    );

  return (
    <>
    <AppModal modalVisible={modalVisible} value={item!.text} id={item!.id} editTodo={editTodo} isComplete={item!.isComplete} setVisible={setModalVisible}/>
    <View style={styles.card}>
      <View style={styles.edit}>
        <Text style={styles.text}>{ item!.text} </Text>
        <AppButton onPress={() => setModalVisible(true) }>
            <FontAwesome color="white" name="edit" size={24} />
        </AppButton>
      
      </View>
      <View style={styles.buttonGroup}>
        <AppButton onPress={clearActive} style={[styles.button, styles.back]}>
            <Entypo color="white" name="back" size={24} />
        </AppButton>
        <AppButton  onPress={showAlert}   style={[styles.button, styles.remove]}>
            <AntDesign color="white" name="delete" size={24} />
        </AppButton>
      
      </View>
    </View>
    </>
  );
};


const AppButton: React.FC<TouchableNativeFeedbackProps> = (props)=>{
  const {style} = props;
  return (
    <TouchableNativeFeedback  {...props}>
      <View style={[styles1.button, style]}>
         {props.children}  
      </View>
    </TouchableNativeFeedback>
  )
} 

const styles1 = StyleSheet.create({
    button: {
      backgroundColor: "#3E50B4",
      borderColor: "#3E50B4",
      padding: 10,
      flexDirection: "row",
      borderRadius: 3,
      justifyContent: "center"

    },

})


const styles =StyleSheet.create({
  card: {
    elevation: 3,
    backgroundColor: "#424242",
    marginBottom: 10,
    marginTop: 20,
    padding: 10,
  },
  edit: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center"
  },
  text: {
    flexGrow: 1,
    color: "white",
    fontSize: 25
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    flexBasis: "40%"
  },
  remove: {
    backgroundColor: "#ff3f80"
  },
  back: {
    backgroundColor: "#767577"
  },
  modalContainer: {
    backgroundColor: COLORS.MAIN_LAYOUT,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flex: 1
  },
  textInput: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row"
  }
})