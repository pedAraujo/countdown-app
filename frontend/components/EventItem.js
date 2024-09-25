// countdown-frontend/components/EventItem.js

import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Importando os ícones
import { calculateTimeRemaining } from "../utils/TimeUtils";

const EventItem = ({ event, onEdit, onDelete }) => {
    // Estado para armazenar o tempo restante
    const [timeRemaining, setTimeRemaining] = useState(
        calculateTimeRemaining(event.date)
    );

    // Verifica se o evento já passou
    const eventPassed = timeRemaining === "Evento já passou";

    // Atualiza o tempo restante a cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(event.date));
        }, 1000); // Atualiza a cada 1 segundo

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, [event.date]);

    // Formatar a data e hora para exibir no formato desejado
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
                        style={styles.iconButtonDelete} // Estilo para o botão de excluir
                    >
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
        backgroundColor: "#e0e0e0", // Cor de fundo para o evento desativado
    },
    content: {
        flexDirection: "row",
        alignItems: "center", // Alinha os componentes verticalmente
        justifyContent: "space-between", // Distribui espaço entre os componentes
    },
    iconButtonEdit: {
        padding: 5, // Botão de editar menor
        backgroundColor: "#fff",
        borderRadius: 50, // Deixa o ícone com aparência circular
        borderWidth: 1,
        borderColor: "#bbb",
    },
    iconButtonDelete: {
        padding: 5, // Botão de excluir
        backgroundColor: "#e0e0e0",
        borderRadius: 50, // Deixa o ícone com aparência circular
        borderWidth: 1,
        borderColor: "#F44336",
    },
    detailsContainer: {
        flex: 1, // Ocupar o espaço disponível entre o ícone e o tempo restante
        marginLeft: 10, // Espaço entre o ícone e o texto
        justifyContent: "center", // Centraliza verticalmente o texto do título e da data/hora
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    date: {
        fontSize: 12, // Tamanho de fonte menor para a data e hora
        color: "#666",
        marginTop: 2,
    },
    timeRemainingContainer: {
        alignItems: "flex-end", // Alinha o texto de tempo restante à direita
        justifyContent: "center", // Centraliza verticalmente o tempo restante
    },
    remainingTime: {
        fontSize: 14,
        color: "#007BFF",
        fontWeight: "bold",
    },
    // Estilos para eventos "desativados" (quando já passaram)
    disabledText: {
        color: "#bbb", // Cor do texto cinza claro
    },
});

export default EventItem;
