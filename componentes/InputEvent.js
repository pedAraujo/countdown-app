import React, { useState } from "react"
import { View, Button, TextInput, StyleSheet, Text, Modal } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

function InputEvent(props) {
	const [date, setDate] = useState(new Date())
	const [show, setShow] = useState(false)
	const onChange = (event, selectedDate) => {
		setShow(false)
		setDate(selectedDate)
	}
	const showDatepicker = () => {
		setShow(true)
	}

	const [eventName, setEventName] = useState("")

	function handleInput(eventName) {
		setEventName(eventName)
	}

	function addEvent() {
		props.onAddEvent(eventName)
		setEventName("")
	}

	return (
		<Modal visible={props.visible} animationType="slide">
			<View style={styles.inputContainer}>
				<TextInput
					placeholder="Event Name"
					style={styles.inputText}
					onChangeText={handleInput}
					value={eventName}
				/>
				<DateTimePicker
					style={styles.dateTimePicker}
					testID="dateTimePicker"
					value={date}
					is24Hour={true}
					onChange={onChange}
				/>
				<View>
					<Button
						style={styles.addButton}
						title="Add Event"
						onPress={addEvent}
					/>
					<Button title="Cancel" onPress={props.onCancel} />
				</View>
				<Text>selected: {date.toLocaleDateString()}</Text>
			</View>
		</Modal>
	)
}

export default InputEvent

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		borderRadius: 6,
		backgroundColor: "yellow",
	},
	inputText: {
		width: "80%",
		borderWidth: 1,
		borderColor: "#cccccc",
		backgroundColor: "white",
		marginRight: 8,
		paddingLeft: 8,
	},
	addButton: {
		padding: 10,
	},
	buttonContainer: {},
	dateTimePicker: {
		width: 100,
		padding: 30,
	},
})
