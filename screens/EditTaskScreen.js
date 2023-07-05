import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

import CustomDatePicker from "../components/CustomDatePicker";
import CustomTextInput from "../components/CustomTextInput";
import CustomModal from "../components/CustomModal";
import CustomButton from "../components/CustomButton";

const EditTaskScreen = ({ navigation, route }) => {
	const recievedObj = route.params.taskObj;
	const [taskName, setTaskName] = useState(recievedObj.taskName);
	const [taskDetails, setTaskDetails] = useState(recievedObj.taskDetails);
	const [startDate, setStartDate] = useState(recievedObj.startDate);
	const [dueDate, setDueDate] = useState(recievedObj.dueDate);
	const [showPriorityModal, setShowPriorityModal] = useState(false);
	const [showRecurrenceModal, setShowRecurrenceModal] = useState(false);
	const [priorityStatus, setPriorityStatus] = useState(
		recievedObj.priorityStatus
	);
	const [recurrenceStatus, setRecurrenceStatus] = useState(
		recievedObj.recurrenceStatus
	);
	const [isDisabled, setIsDisabled] = useState(true);

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

	const initialValues = {
		taskName: recievedObj.taskName,
		taskDetails: recievedObj.taskDetails,
		startDate: recievedObj.startDate,
		dueDate: recievedObj.dueDate,
		priorityStatus: recievedObj.priorityStatus,
		recurrenceStatus: recievedObj.recurrenceStatus,
	};
	console.log(initialValues);

	if (
		taskName == initialValues.taskName ||
		taskDetails == initialValues.taskDetails ||
		startDate == initialValues.startDate ||
		dueDate == initialValues.dueDate ||
		priorityStatus == initialValues.priorityStatus ||
		recurrenceStatus == initialValues.recurrenceStatus
	) {
		setIsDisabled(true);
	} else {
		setIsDisabled(false);
	}

	return (
		<View>
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
				value={priorityStatus}
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
				value={recurrenceStatus}
				onChange={setRecurrenceStatus}
			/>

			<CustomButton
				buttonText="Edit task"
				isdisabled={isDisabled}
				onPress={() => {
					navigation.navigate("Task Details", {
						taskName: taskName,
						taskDetails: taskDetails,
						priorityStatus: priorityStatus,
						startDate: startDate,
						dueDate: dueDate,
						recurrenceStatus: recurrenceStatus,
					});
				}}
			/>
		</View>
	);
};

export default EditTaskScreen;

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