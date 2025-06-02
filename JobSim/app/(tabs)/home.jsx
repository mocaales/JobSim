import { View, FlatList, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Home/Header';
import QuestionnaireCard from '../../components/Home/QuestionnaireCard';
import Leaderboard from '../../components/Home/Leaderboard';
import DonutChart from '../../components/Home/DonutChart';
import { useUser } from '@clerk/clerk-expo';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Home() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  const [selectedJob, setSelectedJob] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [jobOptions, setJobOptions] = useState([
    { label: 'All', value: 'all' },
    { label: 'Chef', value: 'Chef' },
    { label: 'Cashier', value: 'Cashier' },
    { label: 'Dispatcher', value: 'Dispatcher' },
    { label: 'Junior Developer', value: 'Junior Developer' },
    { label: 'Emergency Medicine Specialist', value: 'Emergency Medicine Specialist' },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <QuestionnaireCard />
            <Leaderboard game='cashier' />

            {email && (
              <View style={styles.chartBox}>
                <View style={styles.dropdownContainer}>
                  <DropDownPicker
                    open={dropdownOpen}
                    value={selectedJob}
                    items={jobOptions}
                    setOpen={setDropdownOpen}
                    setValue={setSelectedJob}
                    setItems={setJobOptions}
                    placeholder="Select Job"
                    containerStyle={styles.dropdownBox}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownList}
                    textStyle={styles.dropdownText}
                    maxHeight={250}
                    zIndex={3000}
                    zIndexInverse={1000}
                  />
                </View>
                <DonutChart email={email} selectedJob={selectedJob} />
              </View>
            )}

            <View style={{ height: 20 }} />
          </>
        }
        data={[]}
        renderItem={null}
        style={{ zIndex: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative', 
    zIndex: 0,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 150,
    zIndex: 3000,
    elevation: 1000,
  },
  dropdownBox: { height: 40 },
  dropdown: { backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10 },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 250,
    zIndex: 3000,
  },
  dropdownText: { fontSize: 16, color: "#111" },
});