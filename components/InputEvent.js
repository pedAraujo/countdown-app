import React, { useState } from "react"
import {
	View,
	TextInput,
	StyleSheet,
	Text,
	Modal,
	Pressable,
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
						placeholder={showNoNameWarning ? "Enter event name!" : "Event Name"}
						placeholderTextColor={showNoNameWarning ? "#FF8A8A" : "#b5b5d2"}
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
						textColor="white"
					/>
					<View style={styles.addButton}>
						<Pressable title="Add Event" onPress={addEvent}>
							<Text style={styles.addButtonText}>Add event</Text>
						</Pressable>
					</View>
					<View style={styles.cancelButton}>
						<Pressable
							onPress={() => {
								props.onCancel()
								setShowNoNameWarning(false)
								setEventName("")
								setDate(new Date())
							}}
							style={styles.cancelButton}
						>
							<Text style={styles.cancelButtonText}>Cancel</Text>
						</Pressable>
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
		color: "white",
		fontWeight: "bold",
		width: "70%",
		height: 60,
		borderWidth: 1,
		borderColor: "#f2f2f7",
		borderWidth: 2,
		borderRadius: 8,
		marginRight: 8,
		paddingLeft: 10,
	},
	addButton: {
		justifyContent: "center",
		alignItems: "center",
		width: 110,
		height: 55,
		backgroundColor: "white",
		borderRadius: 10,
		padding: 10,
	},
	addButtonText: {
		fontWeight: "bold",
		fontSize: 17,
	},
	cancelButton: {
		marginTop: 10,
		justifyContent: "center",
		alignItems: "center",
		width: 110,
		height: 55,
		color: "white",
		padding: 10,
	},
	cancelButtonText: {
		fontWeight: "bold",
		fontSize: 17,
		color: "white",
	},
	dateTimePicker: {
		width: 250,
		padding: 30,
		marginBottom: 5,
	},
	upTextView: {
		justifyContent: "flex-end",
		padding: 8,
	},
	upText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 24,
		marginBottom: 20,
	},
	modalCard: {
		width: "100%",
		height: "60%",
		backgroundColor: "#0a64ff",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
		shadowColor: "#000",
		shadowOffset: { width: -3, height: -3 },
		shadowOpacity: 0.3,
		shadowRadius: 10,
		elevation: 5,
	},
})
