// countdown-frontend/components/FloatingButton.js

import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FloatingButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#007BFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // Para adicionar sombra no Android
    },
    buttonText: {
        color: "#fff",
        fontSize: 30,
        lineHeight: 30,
    },
});

export default FloatingButton;
