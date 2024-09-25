import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useEvents } from "../context/EventContext";

const AddEventScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState(new Date());
    const { addEvent } = useEvents();

    const handleSave = () => {
        if (name && date) {
            const eventDateTime = new Date(
                `${date}T${time.getHours()}:${time.getMinutes()}:00`
            );
            const newEvent = {
                id: Date.now().toString(),
                name,
                date: eventDateTime.toISOString(),
            };
            addEvent(newEvent);
            navigation.goBack();
        } else {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
        }
    };

    const onTimeChange = (event, selectedTime) => {
        if (selectedTime) {
            setTime(selectedTime);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome do Evento</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Digite o nome do evento"
                placeholderTextColor="#aaa"
            />

            <Text style={styles.label}>Data do Evento</Text>
            <Calendar
                onDayPress={(day) => setDate(day.dateString)}
                markedDates={{
                    [date]: {
                        selected: true,
                        marked: true,
                        selectedColor: "#007AFF",
                    },
                }}
                theme={{
                    todayTextColor: "#FF6347",
                    arrowColor: "#007AFF",
                    selectedDayBackgroundColor: "#007AFF",
                    borderRadius: 5,
                }}
            />
            <View style={styles.timePicker}>
                <Text style={styles.label}>Horário do Evento</Text>
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="default"
                    is24Hour={true}
                    onChange={onTimeChange}
                    style={styles.timePicker}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Salvar Evento</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f7f7f7",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    timePicker: {
        marginVertical: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonContainer: {
        alignItems: "center",
    },
    saveButton: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 5,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default AddEventScreen;
