import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { calculateTimeRemaining } from "../utils/TimeUtils";

const EventItem = ({ event, onEdit, onDelete }) => {
    const [timeRemaining, setTimeRemaining] = useState(
        calculateTimeRemaining(event.date)
    );

    const eventPassed = timeRemaining === "Evento já passou";

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(event.date));
        }, 1000);

        return () => clearInterval(interval);
    }, [event.date]);

    const eventDate = new Date(event.date);
    const formattedDate = `${eventDate.toLocaleDateString()} às ${eventDate.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
    )}`;

    return (
        <View
            style={[styles.container, eventPassed && styles.disabledContainer]}>
            <View style={styles.content}>
                {eventPassed ? (
                    <TouchableOpacity
                        onPress={() => onDelete(event.id)}
                        style={styles.iconButtonDelete}>
                        <Icon name="delete" size={18} color="#F44336" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        onPress={() => onEdit(event)}
                        style={styles.iconButtonEdit}>
                        <Icon name="edit" size={18} color="#bbb" />
                    </TouchableOpacity>
                )}

                <View style={styles.detailsContainer}>
                    <Text
                        style={[
                            styles.name,
                            eventPassed && styles.disabledText,
                        ]}>
                        {event.name}
                    </Text>
                    <Text
                        style={[
                            styles.date,
                            eventPassed && styles.disabledText,
                        ]}>
                        {formattedDate}
                    </Text>
                </View>

                <View style={styles.timeRemainingContainer}>
                    <Text
                        style={[
                            styles.remainingTime,
                            eventPassed && styles.disabledText,
                        ]}>
                        {timeRemaining}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 10,
    },
    disabledContainer: {
        backgroundColor: "#e0e0e0",
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconButtonEdit: {
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#bbb",
    },
    iconButtonDelete: {
        padding: 5,
        backgroundColor: "#e0e0e0",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "#F44336",
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "center",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        fontSize: 12,
        color: "#666",
        marginTop: 2,
    },
    timeRemainingContainer: {
        alignItems: "flex-end",
        justifyContent: "center",
    },
    remainingTime: {
        fontSize: 14,
        color: "#007BFF",
        fontWeight: "bold",
    },
    disabledText: {
        color: "#bbb",
    },
});

export default EventItem;
