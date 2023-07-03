/** Here New task adding UI & logic is implemented. */

// import necessary libraries & packages
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

// import components & files
import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextInput from "../components/CustomTextInput";
import CustomModal from "../components/CustomModal";
import CustomButton from "../components/CustomButton";

const NewTask = ({ navigation }) => {
	// state variabless to handle value change
	const [taskName, setTaskName] = useState("");
	const [taskDetails, setTaskDetails] = useState("");
	const [startDate, setStartDate] = useState(new Date().toDateString());
	const [dueDate, setDueDate] = useState(new Date().toDateString());
	const [showPriorityModal, setShowPriorityModal] = useState(false);
	const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
	const [priorityStatus, setPriorityStatus] = useState("High");
	const [recurrenceStatus, setRecurrenceStatus] = useState("No");

	const priorityStatusList = [
		{ text: "High" },
		{ text: "Low" },
		{ text: "Normal" },
		{ text: "Special" },
	];

	const recurrenceStatusList = [
		{ text: "No" },
		{ text: "Everyday" },
		{ text: "Every Week" },
		{ text: "Every Month" },
		{ text: "Every Year" },
	];

	// render the screen
	return (
		<View style={styles.container}>
			{/* Input field to recieve task name */}
			<CustomTextInput
				label="Task Name"
				value={taskName}
				onChangeText={(text) => setTaskName(text)}
			/>
			{/* Input field to recieve task details */}
			<CustomTextInput
				label="Task Details"
				value={taskDetails}
				onChangeText={(text) => setTaskDetails(text)}
			/>

			{/* View to set priority status of a task. OnPressing the text, it'll render a modal */}
			<View style={styles.itemConatiner}>
				<Text style={styles.itemLabel}>Priority : </Text>
				<TouchableOpacity
					onPress={() => setShowPriorityModal(true)}
					style={styles.itemBackground}
				>
					<Text style={{ fontSize: 16 }}>
						{priorityStatus} Priority
					</Text>
				</TouchableOpacity>
			</View>
			{/* Custom modal renderer */}
			<CustomModal
				title="Choose Priority"
				confirmText="Set Priority"
				showAlert={showPriorityModal}
				closeAlert={setShowPriorityModal}
				optionData={priorityStatusList}
				value="High"
				onChange={setPriorityStatus}
			/>

			{/* Custom date picker component used to render & store start date */}
			<CustomDatePicker
				label="Start Date"
				placeHolder={startDate}
				onDateChange={setStartDate}
			/>
			{/* Custom date picker component used to render & store due date */}
			<CustomDatePicker
				label="Due Date"
				placeHolder={dueDate}
				onDateChange={setDueDate}
			/>

			{/* View to set reccurring frequency of a task. OnPressing the text, it'll render a modal */}
			<View style={styles.itemConatiner}>
				<Text style={styles.itemLabel}>Recurring : </Text>
				<TouchableOpacity
					onPress={() => setShowRecurrenceModal(true)}
					style={styles.itemBackground}
				>
					<Text style={{ fontSize: 16 }}>{recurrenceStatus}</Text>
				</TouchableOpacity>
			</View>
			{/* Custom modal renderer */}
			<CustomModal
				title="Recurrence Frequency"
				confirmText="Set Recurrence"
				showAlert={showRecurrenceModal}
				closeAlert={setShowRecurrenceModal}
				optionData={recurrenceStatusList}
				value="No"
				onChange={setRecurrenceStatus}
			/>
			<CustomButton buttonText="Add task" onPress={() => {navigation.navigate("Task Details", {
				taskName: taskName,
				taskDetails : taskDetails,
				priorityStatus: priorityStatus,
				startDate: startDate,
				dueDate: dueDate,
				recurrenceStatus: recurrenceStatus
			})}}/>
		</View>
	);
};

export default NewTask;

const styles = StyleSheet.create({
	itemConatiner: {
		flexDirection: "row",
		margin: 10,
	},
	itemLabel: {
		fontWeight: "bold",
		fontSize: 18,
		marginHorizontal: 5,
		paddingHorizontal: 5,
		flex: 1.5,
	},
	itemBackground: {
		flex: 2.5,
		marginHorizontal: 5,
		paddingHorizontal: 8,
		alignItems: "flex-start",
		borderBottomWidth: 1,
	},
});
