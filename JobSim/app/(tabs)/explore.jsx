import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Cashier from '../../components/Explore/Cashier';
import Dispatcher from '../../components/Explore/Dispatcher';
import Developer from '../../components/Explore/Developer';
import Chef from '../../components/Explore/Chef';

export default function Explore() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const allJobs = [
    { name: 'Cashier', component: <Cashier />, category: 'Service' },
    { name: 'Dispatcher', component: <Dispatcher />, category: 'People Skills' },
    { name: 'Junior Developer', component: <Developer />, category: 'Tech' },
    { name: 'Chef', component: <Chef />, category: 'Service' },
    // lejko je se npr za creative, logistics, healthcare
  ];

  const filteredJobs = allJobs.filter(job =>
    (filter === 'all' || job.category === filter) &&
    job.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar with Icon and Clear Button */}
      <View style={styles.searchBarContainer}>
        <FontAwesome name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search jobs..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <FontAwesome name="times-circle" size={20} color="gray" style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['all', 'Tech', 'People Skills', 'Service'].map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              filter === category && styles.activeFilter
            ]}
            onPress={() => setFilter(category)}
          >
            <Text style={[
              styles.filterText,
              filter === category && styles.activeFilterText
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Job List */}
      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.name}
        renderItem={({ item }) => item.component}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 60 : 20, 
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 99,
    paddingHorizontal: 10,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  searchIcon: { marginRight: 8 },
  clearIcon: { marginLeft: 8 },
  searchBar: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    margin: 5,
  },
  activeFilter: {
    backgroundColor: '#111',
  },
  filterText: {
    color: '#333',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20, 
  },
});