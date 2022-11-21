import React, { useState } from "react"
import { StyleSheet, View, FlatList, Pressable, Text } from "react-native"
import EventCard from "./components/EventCard"
import InputEvent from "./components/InputEvent"

export default function App() {
	const TODAY = new Date().toDateString()
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

	const AddButton = () => {
		return (
			<Pressable style={styles.addButton} color="blue" onPress={showInputModal}>
				<Text style={styles.addButtonText}>Add new event</Text>
			</Pressable>
		)
	}

	return (
		<View style={styles.appContainer}>
			<View style={styles.upTextView}>
				<Text style={styles.upText}>My events</Text>
				<Text style={styles.upDate}>{TODAY}</Text>
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
				contentContainerStyle={styles.contentContainerStyle}
			/>
			<View style={styles.addButtonContainer}>
				<AddButton />
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
		paddingTop: 10,
		marginTop: 40,
		alignItems: "center",
	},
	upTextView: {
		width: "90%",
		padding: 8,
	},
	upText: {
		fontWeight: "bold",
		marginTop: 10,
		fontSize: 30,
	},
	upDate: {
		color: "#bebebe",
		fontWeight: "bold",
		marginTop: 10,
		fontSize: 15,
	},
	listContainer: {
		padding: 10,
		paddingTop: 20,
		flex: 1,
		width: "100%",
	},
	contentContainerStyle: {
		alignItems: "center",
	},
	addButtonContainer: {
		width: "100%",
	},
	addButton: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0a64ff",
		borderRadius: 50,
		color: "white",
		width: "100%",
		height: 80,
	},
	addButtonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
})
