import { View, FlatList, StyleSheet, Text, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import DropDownPicker from 'react-native-dropdown-picker';
import QuestionnaireCard from '../../components/Home/QuestionnaireCard';
import Leaderboard from '../../components/Home/Leaderboard';
import DonutChart from '../../components/Home/DonutChart';

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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#3c3c3c' }}>
      <View style={styles.headerContainer}>
        <View style={styles.bubble}>
          <View style={styles.circle} />
          <View style={styles.textContainer}>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.userText}>{user?.fullName || ''}</Text>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <FlatList
          ListHeaderComponent={
            <>
              <QuestionnaireCard />
              <View style={{ zIndex: 5000, elevation: 1000 }}>
                <Leaderboard game='cashier' />
                <Leaderboard game='developer' />
                <Leaderboard game='specUrgMed' />
              </View>

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
                      zIndex={4000}
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
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#3c3c3c',
    padding: 20,
  },
  bubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000',
    marginRight: 12,
  },
  textContainer: { flexDirection: 'column' },
  welcomeText: { fontSize: 14, color: '#3c3c3c' },
  userText: { fontSize: 18, fontWeight: '600', color: '#000' },
  chartBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  dropdownContainer: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 150,
    zIndex: 4000,
    elevation: 1000,
  },
  dropdownBox: { height: 40 },
  dropdown: { backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10 },
  dropdownList: { backgroundColor: '#fff', borderRadius: 10, maxHeight: 250 },
  dropdownText: { fontSize: 16, color: "#111" },
});