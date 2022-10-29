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
				<View>
					<Button
						style={styles.addButton}
						title="Add Event"
						onPress={addEvent}
					/>
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
	dateTimePicker: {
		width: 300,
		padding: 30,
	},
})
