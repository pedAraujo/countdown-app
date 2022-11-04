import React, { useState } from "react"
import {
	View,
	Button,
	TextInput,
	StyleSheet,
	Text,
	Modal,
	YellowBox,
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"

function InputEvent(props) {
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
			setDate(new Date())
		}
	}

	return (
		<Modal visible={props.visible} animationType="slide" transparent={true}>
			<View style={styles.inputContainer}>
				<View style={styles.modalCard}>
					<View style={styles.upTextView}>
						<Text style={styles.upText}>New event</Text>
					</View>
					<TextInput
						placeholder="Event Name"
						placeholderTextColor={showNoNameWarning ? "#FF8A8A" : ""}
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
								setDate(new Date())
							}}
						/>
					</View>
				</View>
			</View>
		</Modal>
	)
}

export default InputEvent

const styles = StyleSheet.create({
	inputContainer: {
		flex: 1,
		justifyContent: "flex-end",
		alignItems: "center",
	},
	inputText: {
		width: "80%",
		height: 35,
		maxWidth: "60%",
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
		padding: 10,
	},
	dateTimePicker: {
		width: 250,
		padding: 30,
	},
	upTextView: {
		justifyContent: "flex-end",
		padding: 8,
	},
	upText: {
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 20,
	},
	modalCard: {
		width: "100%",
		height: "60%",
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
	},
})
