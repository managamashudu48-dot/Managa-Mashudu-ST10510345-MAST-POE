import { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useMenu, MenuItem } from '../context/MenuContext';

export default function MenuScreen() {
	 const { menuItems, deleteMenuItem } = useMenu();
	 const router = useRouter();

	 const [searchQuery, setSearchQuery] = useState('');
	 const [selectedCourse, setSelectedCourse] = useState('All');

	 const filteredItems = useMemo(() => {
			return menuItems.filter(item => {
				 const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
				 const matchesCourse = selectedCourse === 'All' || item.course === selectedCourse;
				 return matchesSearch && matchesCourse;
			});
	 }, [menuItems, searchQuery, selectedCourse]);

	 const stats = useMemo(() => {
			const total = menuItems.length;
			const totalSum = menuItems.reduce((sum, item) => sum + item.price, 0);
			const average = total > 0 ? (totalSum / total).toFixed(2) : '0.00';
			
			const courses = { Starter: 0, 'Main Course': 0, Dessert: 0 };
			menuItems.forEach(item => {
				 if (courses[item.course] !== undefined) {
						courses[item.course]++;
				 }
			});
			
			return { total, average, courses };
	 }, [menuItems]);

	 const renderItem = ({ item }: { item: MenuItem }) => {
			const dotColor = item.course === 'Dessert' ? '#EC4899' : '#F59E0B';

			return (
				 <View style={styles.card}>
						<View style={styles.cardHeader}>
							 <Text style={styles.dishName}>{item.name}</Text>
							 <View style={styles.actionButtons}>
									<TouchableOpacity onPress={() => router.push({ pathname: '/edit', params: { id: item.id } })}>
										 <Text style={styles.editText}>Edit</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => deleteMenuItem(item.id)}>
										 <Text style={styles.deleteText}>✕</Text>
									</TouchableOpacity>
							 </View>
						</View>
						<Text style={styles.courseTag}>
							 <Text style={{ color: dotColor }}>● </Text>
							 {item.course}
						</Text>
						<Text style={styles.description}>{item.description}</Text>
						<View style={styles.priceRow}>
							 <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
							 <View style={styles.badge}>
									<Text style={styles.badgeText}>Available</Text>
							 </View>
						</View>
				 </View>
			);
	 };

	 return (
			<View style={styles.container}>
				 {/* Header */}
				 <View style={styles.header}>
						<Text style={styles.headerTitle}>Restaurant Menu</Text>
						<Text style={styles.subHeader}>{filteredItems.length} of {menuItems.length} dishes match</Text>
				 </View>

				 {/* Search and Filter Section */}
				 <View style={styles.filterSection}>
						<View style={styles.searchBox}>
							 <Text style={styles.searchIcon}>🔍</Text>
							 <TextInput
									style={styles.searchInput}
									placeholder="Search menu items"
									placeholderTextColor="#888"
									value={searchQuery}
									onChangeText={setSearchQuery}
							 />
						</View>

						<View style={styles.pickerRow}>
							 <Text style={styles.pickerLabel}>Course:</Text>
							 <View style={styles.pickerWrapper}>
									<Picker
										 selectedValue={selectedCourse}
										 onValueChange={(itemValue) => setSelectedCourse(itemValue)}
										 style={styles.picker}
										 itemStyle={styles.pickerItemIOS}
									>
										 <Picker.Item label={`All (${menuItems.length})`} value="All" />
										 <Picker.Item label="Starter" value="Starter" />
										 <Picker.Item label="Main Course" value="Main Course" />
										 <Picker.Item label="Dessert" value="Dessert" />
									</Picker>
							 </View>
						</View>
				 </View>

				 {/* List */}
				 <FlatList
						data={filteredItems}
						keyExtractor={(item) => item.id}
						renderItem={renderItem}
						contentContainerStyle={styles.listContainer}
						showsVerticalScrollIndicator={false}
				 />

				 {/* Floating Add Button */}
				 <TouchableOpacity style={styles.fab} onPress={() => router.push('/add')}>
						<Text style={styles.fabText}>+ Add Dish</Text>
				 </TouchableOpacity>

				 {/* Bottom Stats Bar */}
				 <View style={styles.statsBar}>
						<View style={styles.statBox}>
							 <Text style={styles.statNumber}>{stats.total}</Text>
							 <Text style={styles.statLabel}>Total Items</Text>
						</View>
						<View style={styles.statBox}>
							 <Text style={styles.statNumber}>R{stats.average}</Text>
							 <Text style={styles.statLabel}>Avg Price</Text>
						</View>
						<View style={[styles.statBox, { borderRightWidth: 0 }]}>
							 <Text style={styles.statNumber}>
									S:{stats.courses.Starter} M:{stats.courses['Main Course']} D:{stats.courses.Dessert}
							 </Text>
							 <Text style={styles.statLabel}>By Course</Text>
						</View>
				 </View>
			</View>
	 );
}

const styles = StyleSheet.create({
	 container: { flex: 1, backgroundColor: '#FAF8F5' },
	 header: { paddingTop: 50, paddingBottom: 10, alignItems: 'center' },
	 headerTitle: { fontSize: 22, fontWeight: 'bold', fontFamily: 'serif', color: '#111' },
	 subHeader: { fontSize: 12, color: '#666', marginTop: 4 },

	 filterSection: { paddingHorizontal: 20, paddingBottom: 10 },
	 searchBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EAEAEA', borderRadius: 8, paddingHorizontal: 12, marginBottom: 12 },
	 searchIcon: { fontSize: 16, marginRight: 8, color: '#888' },
	 searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: '#111' },

	 pickerRow: { flexDirection: 'row', alignItems: 'center' },
	 pickerLabel: { fontSize: 14, color: '#666', marginRight: 8 },
	 pickerWrapper: { 
			flex: 1, 
			borderWidth: 1, 
			borderColor: '#EAEAEA', 
			borderRadius: 8, 
			backgroundColor: '#FFF', 
			justifyContent: 'center',
			height: Platform.OS === 'ios' ? 140 : 40, 
			overflow: 'hidden' 
	 },
	 picker: { height: 40, color: '#111', width: '100%' },
	 pickerItemIOS: { fontSize: 14, height: 140, color: '#111' },

	 listContainer: { padding: 20, paddingBottom: 100 },
	 card: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#EAEAEA', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 4, elevation: 1 },
	 cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	 dishName: { fontSize: 16, fontWeight: 'bold', fontFamily: 'serif', color: '#111', flex: 1 },
	 actionButtons: { flexDirection: 'row', alignItems: 'center', gap: 15 },
	 editText: { color: '#B45309', fontSize: 14, fontWeight: 'bold' },
	 deleteText: { color: '#999', fontSize: 16, fontWeight: 'bold' },
	 courseTag: { fontSize: 12, color: '#666', marginTop: 4, marginBottom: 8 },
	 description: { fontSize: 13, color: '#666', lineHeight: 18, marginBottom: 12 },

	 priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	 price: { fontSize: 16, fontWeight: 'bold', color: '#B45309' },
	 badge: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 4, paddingVertical: 2, paddingHorizontal: 6 },
	 badgeText: { fontSize: 10, color: '#6B7280' },

	 statsBar: { flexDirection: 'row', backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#EAEAEA', paddingVertical: 12, paddingBottom: 24 },
	 statBox: { flex: 1, alignItems: 'center', borderRightWidth: 1, borderRightColor: '#EAEAEA' },
	 statNumber: { fontSize: 14, fontWeight: 'bold', color: '#111' },
	 statLabel: { fontSize: 11, color: '#666', marginTop: 4, textTransform: 'uppercase' },

	 fab: { position: 'absolute', bottom: 90, right: 20, backgroundColor: '#111', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24, elevation: 4, zIndex: 10 },
	 fabText: { color: '#FFF', fontWeight: 'bold' }
});
