import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";
import { Navdar } from "./components/Navbar";
import { Main } from "./screens/Main";
import { Details } from "./screens/Details";
import { ActiveItemContext } from "./context/activeItem/activeItemContext";
import { COLORS } from "./constants";
import { TodoContext } from "./context/todo/todoContext";
import { TodoContextType } from "./types";

export const MainLayout: React.FC<{}> = () => {
  const { active } = useContext(ActiveItemContext);
  const { state: {error} } = useContext<TodoContextType>(TodoContext);
  useEffect(()=>{
    if(error) {
      ToastAndroid.show(error.message, ToastAndroid.LONG);
    }

  },[error])

  return (
    <View style={styles.app}>
      <Navdar title="Todo App"></Navdar>
      <View style={styles.main}>{active ? <Details /> : <Main />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: COLORS.MAIN_LAYOUT,
  },
  main: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
