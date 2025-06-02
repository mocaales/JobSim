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
                    setValue={(callback) => setSelectedJob(callback(selectedJob))}
                    setItems={setJobOptions}
                    placeholder="Select Job"
                    containerStyle={styles.dropdownBox}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownList}
                    textStyle={styles.dropdownText}
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
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    width: 150,
    zIndex: 10, 
  },
  dropdownBox: { height: 40 },
  dropdown: { backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10 },
  dropdownList: { backgroundColor: '#fff', borderRadius: 10 },
  dropdownText: { fontSize: 16, color: "#111" },
});