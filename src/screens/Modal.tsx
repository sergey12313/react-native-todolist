import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, Modal, Alert } from "react-native";
import { AppInputText } from "../components/AppInputText";
import { COLORS } from "../constants";
import { AppButton } from "../components/AppButton";
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { TodoContextType } from "../types";

export interface AppModalProps {
  modalVisible: boolean;
  value: string,
  id: string,
  isComplete: boolean
  setVisible: (arg: boolean)=> void,
  editTodo: TodoContextType["editTodo"]
}

export const AppModal: React.FC<AppModalProps> = ({ modalVisible, setVisible, value, id, isComplete, editTodo }) => {
  const [text, setText] = useState(value)
  const handleBack = useCallback(()=>{
      setText(value)
      setVisible(false)
  },[value])
  const handleSave = useCallback(()=>{
      editTodo(id, text, isComplete)
      setVisible(false)
  },[text])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleBack}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Изменить дело?</Text>
        <AppInputText style={styles.textInput} value={text} onChangeText={setText}></AppInputText>
        <View style={styles.buttonGroup}>
          <AppButton style={[styles.button]} onPress={handleBack} >
            <Entypo color="white" name="back" size={24} />
          </AppButton>
          <AppButton style={[styles.button]} onPress={handleSave} >
            <AntDesign color="white" name="save" size={24} />
          </AppButton>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.MAIN_LAYOUT,
    justifyContent: "center",
    paddingHorizontal: 20,
    flex: 1,

  },
  textInput: {
    width: "100%",
  },
  title:{
      color: COLORS.LARGE_TEXT,
      fontSize: 25
  },
  buttonGroup: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  },
  button :{
    flexBasis: "40%"
  }
});
