import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

export default function AddMenuScreen() {
	 const router = useRouter();

	 const { addMenuItem } = useMenu();

	 const [name, setName] = useState('');
	 const [course, setCourse] = useState<'Starter' | 'Main Course' | 'Dessert'>('Starter');
	 const [price, setPrice] = useState('');
	 const [description, setDescription] = useState('');

	 const handleSave = () => {
			if (!name || !price || !description) {
				 Alert.alert('Missing Information', 'Please fill in all the details for the dish.');
				 return;
			}

			const priceNumber = parseFloat(price);
			if (isNaN(priceNumber)) {
				 Alert.alert('Invalid Price', 'Please enter a valid number for the price.');
				 return;
			}

			addMenuItem({
				 name,
				 course,
				 price: priceNumber,
				 description
			});

			Alert.alert('Success', 'Menu item added successfully!');
			router.back();
	 };

	 return (
			<ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
				 <View style={styles.header}>
						<TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
							 <Text style={styles.backArrow}>←</Text>
						</TouchableOpacity>
						<Text style={styles.headerTitle}>Add Menu Item</Text>
						<TouchableOpacity onPress={handleSave}>
							 <Text style={styles.saveText}>Save</Text>
						</TouchableOpacity>
				 </View>

				 <View style={styles.formContainer}>
						{/* Item Name Input */}
						<Text style={styles.label}>Item Name</Text>
						<TextInput
							 style={styles.input}
							 placeholder="e.g. Grilled Lemon Herb Salmon"
							 value={name}
							 onChangeText={setName}
						/>

						{/* Course Category Picker */}
						<Text style={styles.label}>Course Category</Text>
						<View style={styles.pickerContainer}>
							 <Picker
									selectedValue={course}
									onValueChange={(itemValue) => setCourse(itemValue as 'Starter' | 'Main Course' | 'Dessert')}
									mode="dropdown"
									style={styles.picker}
									dropdownIconColor="#888"
							 >
									<Picker.Item label="Starter" value="Starter" />
									<Picker.Item label="Main Course" value="Main Course" />
									<Picker.Item label="Dessert" value="Dessert" />
							 </Picker>
						</View>

						{/* Price Input */}
						<Text style={styles.label}>Price (R)</Text>
						<TextInput
							 style={styles.input}
							 placeholder="0.00"
							 keyboardType="numeric"
							 value={price}
							 onChangeText={setPrice}
						/>

						{/* Description Input */}
						<Text style={styles.label}>Description</Text>
						<TextInput
							 style={[styles.input, styles.textArea]}
							 placeholder="Describe the ingredients and preparation..."
							 multiline
							 numberOfLines={3}
							 value={description}
							 onChangeText={setDescription}
						/>

						{/* Save Button */}
						<TouchableOpacity style={styles.submitButton} onPress={handleSave}>
							 <Text style={styles.submitButtonText}>Add Menu Item</Text>
						</TouchableOpacity>
				 </View>
			</ScrollView>
	 );
}

const styles = StyleSheet.create({
	 container: {
			flex: 1,
			backgroundColor: '#FAF8F5',
	 },
	 header: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			paddingTop: 60,
			paddingBottom: 20,
			paddingHorizontal: 20,
			backgroundColor: '#FFF',
			borderBottomWidth: 1,
			borderBottomColor: '#EAEAEA',
	 },
	 iconButton: {
			padding: 8,
			borderWidth: 1,
			borderColor: '#059669',
			borderRadius: 8,
	 },
	 backArrow: {
			fontSize: 18,
			color: '#059669',
	 },
	 headerTitle: {
			fontSize: 20,
			fontWeight: 'bold',
			color: '#1A1A1A',
	 },
	 saveText: {
			fontSize: 16,
			color: '#666',
	 },
	 formContainer: {
			padding: 20,
	 },
	 label: {
			fontSize: 14,
			fontWeight: '600',
			color: '#666',
			marginBottom: 8,
			textAlign: 'center',
	 },
	 input: {
			backgroundColor: '#FFF',
			borderWidth: 1,
			borderColor: '#EAEAEA',
			borderRadius: 8,
			padding: 12,
			fontSize: 16,
			marginBottom: 24,
	 },
	 textArea: {
			minHeight: 80,
			textAlignVertical: 'top',
	 },
	 pickerContainer: {
			backgroundColor: '#FFF',
			borderWidth: 1,
			borderColor: '#EAEAEA',
			borderRadius: 8,
			marginBottom: 24,
			height: 52,
			justifyContent: 'center',
			overflow: 'hidden',
	 },
	 picker: {
			color: '#111',
			height: 52,
			width: '100%',
	 },
	 submitButton: {
			backgroundColor: '#1A1A1A',
			padding: 16,
			borderRadius: 8,
			alignItems: 'center',
			marginTop: 20,
	 },
	 submitButtonText: {
			color: '#FFF',
			fontWeight: 'bold',
			fontSize: 16,
	 }
});
