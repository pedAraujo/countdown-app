import React, { useState, useTransition } from "react"
import { StyleSheet, View, FlatList, Pressable, Text } from "react-native"
import EventCard from "./componentes/EventCard"
import InputEvent from "./componentes/InputEvent"

export default function App() {
	const [modalIsVisible, setModalIsVisible] = useState(false)
	const [events, setEvents] = useState([])

	function showInputModal() {
		setModalIsVisible(true)
	}
	function closeInputModal() {
		setModalIsVisible(false)
	}

	function addEvent(eventName, selectedDate) {
		setEvents((currentEvents) => [
			...currentEvents,
			{
				name: eventName,
				date: selectedDate,
				id: eventName.toString() + Math.random().toString(),
			},
		])
		closeInputModal()
	}

	function deleteEvent(id) {
		setEvents((currentEvents) => {
			return currentEvents.filter((event) => event.id !== id)
		})
	}

	return (
		<View style={styles.appContainer}>
			<View style={styles.upTextView}>
				<Text style={styles.upText}>My events</Text>
			</View>
			<FlatList
				style={styles.listContainer}
				data={events}
				renderItem={(itemData) => {
					return (
						<EventCard
							name={itemData.item.name}
							date={itemData.item.date}
							id={itemData.item.id}
							onDeleteEvent={deleteEvent}
						/>
					)
				}}
				keyExtractor={(item, index) => item.id}
				alwaysBounceHorizontal={false}
			/>
			<View style={styles.addButtonContainer}>
				<Pressable
					style={styles.addButton}
					color="blue"
					onPress={showInputModal}
				>
					<Text style={styles.addButtonText}>+</Text>
				</Pressable>
			</View>
			<InputEvent
				visible={modalIsVisible}
				onAddEvent={addEvent}
				onCancel={closeInputModal}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		padding: 10,
		marginTop: 40,
		alignItems: "center",
	},
	upTextView: {
		backgroundColor: "green",
		width: "100%",
		padding: 8,
	},
	upText: {
		fontWeight: "bold",
		fontSize: 24,
	},
	listContainer: {
		flex: 1,
		backgroundColor: "green",
		width: "100%",
	},
	addButtonContainer: {
		width: "100%",
		backgroundColor: "orange",
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	addButton: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "red",
		borderRadius: 50,
		color: "white",
		width: 50,
		height: 50,
		marginVertical: 5,
		marginHorizontal: 10,
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
	},
})
