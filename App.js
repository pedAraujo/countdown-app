import React, { useState, useTransition } from "react"
import { StyleSheet, View, FlatList, Button } from "react-native"
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

	function addEvent(eventName) {
		setEvents((currentEvents) => [
			...currentEvents,
			{ name: eventName, id: eventName.toString() + Math.random().toString() },
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
			<Button title="Add New Event" color="blue" onPress={showInputModal} />
			<InputEvent
				visible={modalIsVisible}
				onAddEvent={addEvent}
				onCancel={closeInputModal}
			/>
			<FlatList
				data={events}
				renderItem={(itemData) => {
					return (
						<EventCard
							name={itemData.item.name}
							id={itemData.item.id}
							onDeleteEvent={deleteEvent}
						/>
					)
				}}
				keyExtractor={(item, index) => item.id}
				alwaysBounceHorizontal={false}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		padding: 30,
		marginTop: 20,
	},

	listContainer: {
		flex: 1,
	},
})
