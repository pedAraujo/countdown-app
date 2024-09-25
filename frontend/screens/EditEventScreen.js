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

const EditEventScreen = ({ navigation, route }) => {
    const { event } = route.params;
    const [name, setName] = useState(event.name);
    const [date, setDate] = useState(event.date.split("T")[0]);
    const [time, setTime] = useState(new Date(event.date));
    const { updateEvent, deleteEvent } = useEvents();

    const handleSave = () => {
        if (name && date) {
            const eventDateTime = new Date(
                `${date}T${time.getHours()}:${time.getMinutes()}:00`
            );
            const updatedEvent = {
                ...event,
                name,
                date: eventDateTime.toISOString(),
            };
            updateEvent(updatedEvent);
            navigation.goBack();
        } else {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
        }
    };

    const handleDelete = () => {
        deleteEvent(event.id);
        navigation.goBack();
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
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}>
                    <Text style={styles.deleteButtonText}>Excluir Evento</Text>
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
        alignSelf: "center",
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
        marginBottom: 15,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
    deleteButton: {
        backgroundColor: "#FF6347",
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
    deleteButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default EditEventScreen;
