import React from "react";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ActiveItemState } from "./src/context/activeItem/ActiveItemState";
import { View, Text } from "react-native";

export default function App() {
  return (
    <TodoState>
      <ActiveItemState>
        <MainLayout />
      </ActiveItemState>
    </TodoState>


  );
}
