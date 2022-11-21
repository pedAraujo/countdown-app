import React, { useState } from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

function EventCard(props) {
	const MILISECONDSINADAY = 3600 * 1000 * 24

	function showRemainingDays(selectedDate) {
		let today = new Date()
		let endDate = new Date(selectedDate)
		let milisecondsBetween = endDate - today
		let remainingDays = Math.ceil(milisecondsBetween / MILISECONDSINADAY)
		return remainingDays
	}

	let formatedDate = new Date(props.date).toLocaleDateString()
	let remainingDays = showRemainingDays(props.date)

	return (
		<View style={styles.eventItem}>
			<View style={styles.leftContainer}>
				<View style={styles.eventNameView}>
					<Text style={styles.eventItemText} adjustsFontSizeToFit={true}>
						{props.name}
					</Text>
				</View>
				<View style={styles.eventDateView}>
					<Text style={styles.dateText}>{formatedDate}</Text>
				</View>
			</View>

			<View
				style={
					remainingDays <= 0
						? { ...styles.rightContainer, backgroundColor: "#ee6b6e" }
						: { ...styles.rightContainer, backgroundColor: "#4e82d8" }
				}
				adjustsFontSizeToFit={true}
			>
				<Text style={styles.remainingDaysText}>{remainingDays}</Text>
			</View>
			<Pressable onPress={props.onDeleteEvent.bind(this, props.id)}>
				<MaterialCommunityIcons
					name="dots-vertical"
					size={24}
					color="#c7c7cc"
				/>
			</Pressable>
		</View>
	)
}

export default EventCard

const styles = StyleSheet.create({
	eventItem: {
		width: "80%",
		height: 85,
		aspectRatio: 4 / 1,
		marginBottom: 15,
		borderRadius: 10,
		padding: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 5,
		backgroundColor: "white",
	},
	leftContainer: {
		width: "60%",
		marginLeft: 3,
		justifyContent: "center",
	},
	rightContainer: {
		//backgroundColor: "#6F8AB7",
		borderRadius: 18,
		width: 80,
		height: "85%",
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: 6,
	},

	eventItemText: {
		color: "#0D324D",
		fontSize: 18,
		fontWeight: "bold",
	},
	remainingDaysText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	dateText: { color: "gray", fontSize: 12, fontWeight: "bold" },
	eventNameView: {
		width: "90%",
		height: "40%",
		marginHorizontal: 10,
		marginBottom: 8,
		justifyContent: "center",
	},
	remainingDaysView: {
		width: 10,
		height: 10,
		backgroundColor: "red",
		justifyContent: "center",
		alignItems: "center",
		minimumFontScale: 0.7,
	},
	eventDateView: {
		width: "90%",
		height: "30%",
		marginHorizontal: 10,
	},
})
