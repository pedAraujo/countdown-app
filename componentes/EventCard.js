import { StyleSheet, Text, View, Pressable } from "react-native"

const MILISECONDSINADAY = 3600 * 1000 * 24

function showRemainingDays(selectedDate) {
	let today = new Date()
	let endDate = new Date(selectedDate)
	let milisecondsBetween = endDate - today
	let remainingDays = Math.ceil(milisecondsBetween / MILISECONDSINADAY)
	return remainingDays
}

function EventCard(props) {
	let formatedDate = new Date(props.date).toLocaleDateString()

	return (
		<View style={styles.eventItem}>
			<View style={styles.leftContainer}>
				<View style={styles.eventNameView}>
					<Text style={styles.eventItemText}>{props.name}</Text>
				</View>
				<View style={styles.eventDateView}>
					<Text style={styles.eventItemText}>{formatedDate}</Text>
				</View>
			</View>

			<View style={styles.rightContainer}>
				<Text style={styles.eventItemText}>
					{showRemainingDays(props.date)}
				</Text>
			</View>
			<Pressable onPress={props.onDeleteEvent.bind(this, props.id)}>
				<View style={styles.deleteButton}></View>
			</Pressable>
		</View>
	)
}

export default EventCard

const styles = StyleSheet.create({
	eventItem: {
		width: "100%",
		aspectRatio: 4 / 1,
		marginBottom: 15,
		borderRadius: 10,
		backgroundColor: "blue",
		padding: 8,
		flexDirection: "row",
	},
	leftContainer: {
		borderColor: "black",
		borderWidth: 2,
		width: "70%",
		justifyContent: "center",
	},
	rightContainer: {
		borderColor: "black",
		borderWidth: 2,
		width: "25%",
		justifyContent: "center",
		alignItems: "center",
	},

	eventItemText: {
		color: "white",
	},
	eventNameView: {
		width: "90%",
		height: "40%",
		marginHorizontal: 10,
		marginBottom: 8,
		borderWidth: 2,
		borderColor: "black",
		justifyContent: "center",
	},
	remainingDaysView: {
		width: 10,
		height: 10,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
	},
	eventDateView: {
		width: "90%",
		height: "30%",
		marginHorizontal: 10,
		borderWidth: 2,
		borderColor: "black",
	},
	deleteButton: { width: 10, height: 10, backgroundColor: "cyan", margin: 10 },
})
