import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useMenu } from '../context/MenuContext';

export default function EditMenuScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const { menuItems, updateMenuItem } = useMenu();

    const itemToEdit = menuItems.find(item => item.id === id);

    const [name, setName] = useState(itemToEdit?.name || '');
    const [description, setDescription] = useState(itemToEdit?.description || '');
    const [course, setCourse] = useState(itemToEdit?.course || 'Starter');
    const [price, setPrice] = useState(itemToEdit?.price.toString() || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!itemToEdit) {
            Alert.alert("Error", "Menu item not found.");
            router.back();
        }
    }, [itemToEdit]);

    const handleSave = () => {
        if (!name.trim() || !description.trim() || !price.trim()) {
            setError('Please fill out all fields.');
            return;
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            setError('Please enter a valid price greater than 0.');
            return;
        }

        updateMenuItem(id, {
            name: name.trim(),
            description: description.trim(),
            course: course as 'Starter' | 'Main Course' | 'Dessert',
            price: numericPrice,
        });

        router.back();
    };

    if (!itemToEdit) return null;

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Edit Dish</Text>
            </View>

            <ScrollView contentContainerStyle={styles.form}>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <Text style={styles.label}>Dish Name</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Description</Text>
                <TextInput style={[styles.input, styles.textArea]} value={description} onChangeText={setDescription} multiline />

                <Text style={styles.label}>Course</Text>
                <View style={styles.pickerWrapper}>
                    <Picker selectedValue={course} onValueChange={(val) => setCourse(val)} style={styles.picker} itemStyle={styles.pickerItemIOS}>
                        <Picker.Item label="Starter" value="Starter" />
                        <Picker.Item label="Main Course" value="Main Course" />
                        <Picker.Item label="Dessert" value="Dessert" />
                    </Picker>
                </View>

                <Text style={styles.label}>Price (R)</Text>
                <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />

                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAF8F5' },
    header: { paddingTop: 50, paddingBottom: 10, alignItems: 'center' },
    headerTitle: { fontSize: 22, fontWeight: 'bold', fontFamily: 'serif', color: '#111' },
    form: { padding: 20 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#111', marginBottom: 8, marginTop: 12 },
    input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, padding: 12, fontSize: 14, color: '#111' },
    textArea: { minHeight: 80, textAlignVertical: 'top' },
    pickerWrapper: { borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, backgroundColor: '#FFF', overflow: 'hidden', height: Platform.OS === 'ios' ? 140 : 50, justifyContent: 'center' },
    picker: { width: '100%' },
    pickerItemIOS: { height: 140, fontSize: 14 },
    errorText: { color: '#DC2626', backgroundColor: '#FEE2E2', padding: 10, borderRadius: 8, marginBottom: 10, textAlign: 'center', fontWeight: 'bold' },
    saveButton: { backgroundColor: '#111', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 30 },
    saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    cancelButton: { padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
    cancelButtonText: { color: '#666', fontWeight: 'bold', fontSize: 16 },
});
