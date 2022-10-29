import React, { useState } from "react"
import { View, Button, TextInput, StyleSheet, Text, Modal } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

function InputEvent(props) {
	let eventNameCount = 0

	const [date, setDate] = useState(new Date())
	const [show, setShow] = useState(false)
	const [eventName, setEventName] = useState("")
	const [showNoNameWarning, setShowNoNameWarning] = useState(false)

	const onChange = (event, selectedDate) => {
		setShow(false)
		setDate(selectedDate)
	}

	function handleInput(eventName) {
		setEventName(eventName)
	}

	function addEvent() {
		if (eventName == "") {
			setShowNoNameWarning(true)
		} else {
			props.onAddEvent(eventName, date)
			setEventName("")
			setShowNoNameWarning(false)
		}
	}

	return (
		<Modal visible={props.visible} animationType="slide">
			<View style={styles.inputContainer}>
				<View style={styles.upTextView}>
					<Text style={styles.upText}>Add event</Text>
				</View>
				<TextInput
					placeholder="Event Name"
					placeholderTextColor={showNoNameWarning ? "red" : ""}
					style={styles.inputText}
					onChangeText={handleInput}
					value={eventName}
				/>
				<DateTimePicker
					style={styles.dateTimePicker}
					minimumDate={new Date()}
					testID="dateTimePicker"
					value={date}
					is24Hour={true}
					onChange={onChange}
					display="spinner"
				/>
				<View style={styles.addButton}>
					<Button title="Add Event" onPress={addEvent} />
				</View>
				<View style={styles.cancelButton}>
					<Button
						title="Cancel"
						onPress={() => {
							props.onCancel()
							setShowNoNameWarning(false)
							setEventName("")
						}}
					/>
				</View>
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
	},
	inputText: {
		width: "70%",
		height: 35,
		maxWidth: "80%",
		borderWidth: 1,
		borderColor: "#cccccc",
		backgroundColor: "white",
		marginRight: 8,
		paddingLeft: 8,
	},
	addButton: {
		padding: 10,
	},
	cancelButton: {
		marginTop: 100,
		padding: 10,
	},
	dateTimePicker: {
		width: 250,
		padding: 30,
	},
	upTextView: {
		justifyContent: "flex-end",
		height: 300,
		padding: 8,
	},
	upText: {
		fontWeight: "bold",
		fontSize: 24,
	},
})
