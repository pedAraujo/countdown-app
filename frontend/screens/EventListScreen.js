import React, { useLayoutEffect } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import EventItem from "../components/EventItem";
import { useEvents } from "../context/EventContext";

const EventListScreen = ({ navigation }) => {
    const { events, deleteEvent, updateEvent } = useEvents();

    const sortEventsByDate = (eventA, eventB) => {
        const dateA = new Date(eventA.date);
        const dateB = new Date(eventB.date);

        return dateA - dateB;
    };

    const sortedEvents = [...events].sort(sortEventsByDate);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate("Settings")}
                    style={{ marginRight: 15 }}>
                    <Icon name="settings" size={28} color="#007AFF" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {sortedEvents.length > 0 ? (
                <FlatList
                    data={sortedEvents}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <EventItem
                            event={item}
                            onEdit={() =>
                                navigation.navigate("EditEvent", {
                                    event: item,
                                })
                            }
                            onDelete={deleteEvent}
                        />
                    )}
                />
            ) : (
                <Text style={styles.noEventsText}>Nenhum evento</Text>
            )}

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AddEvent")}>
                <Icon name="add" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    noEventsText: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 20,
    },
    addButton: {
        position: "absolute",
        right: 20,
        bottom: 30,
        backgroundColor: "#007AFF",
        borderRadius: 50,
        padding: 15,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
});

export default EventListScreen;
