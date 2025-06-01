import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Cashier from '../../components/Explore/Cashier';
import Dispatcher from '../../components/Explore/Dispatcher';
import Developer from '../../components/Explore/Developer';
import SpecUrgMed from '../../components/Explore/SpecUrgMed';
import Chef from '../../components/Explore/Chef';

export default function Explore() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const allJobs = [
  {
    name: 'Cashier',
    component: <Cashier />,
    category: 'Business & Administration',
    keywords: ['cashier', 'register', 'sales', 'money', 'store', 'checkout', 'shop', 'retail', 'payment', 'POS']
  },
  {
    name: 'Dispatcher',
    component: <Dispatcher />,
    category: 'Coordination',
    keywords: ['dispatcher', 'radio', 'logistics', 'communication', 'route', 'emergency', 'coordination', 'operator', 'calls', 'control']
  },
  {
    name: 'Junior Developer',
    component: <Developer />,
    category: 'IT & Tech',
    keywords: ['developer', 'programming', 'code', 'software', 'javascript', 'frontend', 'engineer', 'web', 'react', 'junior']
  },
  {
    name: 'Chef',
    component: <Chef />,
    category: 'Hospitality & Tourism',
    keywords: ['chef', 'cook', 'kitchen', 'food', 'culinary', 'restaurant', 'menu', 'meal', 'bake', 'chop']
  },
  {
    name: 'Emergency Medicine Specialist',
    component: <SpecUrgMed />,
    category: 'Healthcare & Social Work',
    keywords: ['emergency', 'medicine', 'ER', 'trauma', 'urgent', 'resuscitation', 'doctor', 'hospital', 'care', 'acute']
  }
];


  const filteredJobs = allJobs.filter(job =>
  (filter === 'all' || job.category === filter) &&
  (
    job.name.toLowerCase().includes(search.toLowerCase()) ||
    job.keywords.some(kw => kw.toLowerCase().includes(search.toLowerCase()))
  )
);


  return (
    <View style={styles.container}>
      {/* Search Bar */}
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

      {/* Horizontal Scrollable Filters */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
          {['all', 'IT & Tech', 'Hospitality & Tourism', 'Healthcare & Social Work', 'Business & Administration'
          ].map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterButton,
                filter === category && styles.activeFilter
              ]}
              onPress={() => setFilter(category)}
              activeOpacity={0.7} // da se ohrani velikost na klik
            >
              <Text style={[
                styles.filterText,
                filter === category && styles.activeFilterText
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

  filterWrapper: {
    marginBottom: 10,
  },
  filterContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginHorizontal: 5,
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
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 20,
  },
});