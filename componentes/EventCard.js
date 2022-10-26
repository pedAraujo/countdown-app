import { StyleSheet, Text, View, Pressable } from "react-native"

function EventCard(props) {
	return (
		<Pressable onPress={props.onDeleteEvent.bind(this, props.id)}>
			<View style={styles.eventItem}>
				<Text style={styles.eventItemText}>{props.name}</Text>
			</View>
		</Pressable>
	)
}

export default EventCard

const styles = StyleSheet.create({
	eventItem: {
		margin: 8,
		borderRadius: 6,
		backgroundColor: "blue",
		padding: 8,
	},
	eventItemText: {
		color: "white",
	},
})
