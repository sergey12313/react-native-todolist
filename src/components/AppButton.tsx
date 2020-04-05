import  React from "react"
import  {View, StyleSheet, TouchableNativeFeedbackProps, TouchableNativeFeedback} from "react-native"

export const AppButton: React.FC<TouchableNativeFeedbackProps> = (props)=>{
    const {style} = props;
    return (
      <TouchableNativeFeedback  {...props}>
        <View style={[styles.button, style]}>
           {props.children}  
        </View>
      </TouchableNativeFeedback>
    )
  } 
  
  const styles = StyleSheet.create({
      button: {
        backgroundColor: "#3E50B4",
        borderColor: "#3E50B4",
        padding: 10,
        flexDirection: "row",
        borderRadius: 3,
        justifyContent: "center"
  
      },
  
  })