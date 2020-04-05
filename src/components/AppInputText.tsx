import React from 'react'
import { TextInput, TextInputProps,StyleSheet } from 'react-native'
import { COLORS } from '../constants'


export const AppInputText: React.FC<TextInputProps> = (props)=>{
 const {style, ...oserProps } = props
 return   (<TextInput style={[styles.textInput, style]}  {...oserProps}/>)
} 


const styles = StyleSheet.create({
    textInput: {
        
      borderBottomColor: COLORS.PRIMARY,
      borderStyle: "solid",
      borderBottomWidth: 2,
      fontSize: 20,
      paddingVertical: 10,
      color: "white",

    }
  });
  