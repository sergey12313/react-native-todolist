import React from "react"
import { View, Text, StyleSheet } from "react-native"

import {COLORS} from "../constants"

export const Navdar: React.FC<{title: string}> = ({title}) => {

    return (<View style={styles.navbar}> 
        <Text  style={styles.text}>{title}</Text>
    </View>)
}


const styles = StyleSheet.create({
    navbar: {
        height: 70,
        elevation: 4,
        backgroundColor: COLORS.NAVBAR,
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: 10
    },
    text: {
        color: COLORS.LARGE_TEXT,
        fontSize: 20,
        fontWeight: "600"
    }
})