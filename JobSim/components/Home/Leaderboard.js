import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from '../../constants/Colors';

const availableGames = [
  { label: 'Cashier', value: 'cashier' },
  { label: 'OtherGame1', value: 'x' },
  { label: 'OtherGame2', value: 'y' }
];

const difficulties = [
  { label: 'All', value: '' },
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' }
];

export default function Leaderboard({ game = 'cashier' }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedGame, setSelectedGame] = useState(game);
  const [difficulty, setDifficulty] = useState('');

  const [gameOpen, setGameOpen] = useState(false);
  const [diffOpen, setDiffOpen] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGame, difficulty]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/${selectedGame}/leaderboard${difficulty ? `?difficulty=${difficulty}` : ''}`);
      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  const renderHeaderRow = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.rankCell]}>#</Text>
      <Text style={[styles.cell, styles.emailCell]}>Email</Text>
      <Text style={[styles.cell, styles.timeCell]}>Time</Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.rankCell]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.emailCell]}>{item.email}</Text>
      <Text style={[styles.cell, styles.timeCell]}>{item.time}s ({item.difficulty})</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Games Leaderboard 🏆 </Text>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          open={gameOpen}
          value={selectedGame}
          items={availableGames}
          setOpen={setGameOpen}
          setValue={setSelectedGame}
          placeholder="Select Game"
          containerStyle={styles.dropdownBox}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          textStyle={styles.dropdownText}
        />
        <DropDownPicker
          open={diffOpen}
          value={difficulty}
          items={difficulties}
          setOpen={setDiffOpen}
          setValue={setDifficulty}
          placeholder="Select Difficulty"
          containerStyle={styles.dropdownBox}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownList}
          textStyle={styles.dropdownText}
        />
      </View>
      {renderHeaderRow()}
      <FlatList
        data={leaderboard}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9', borderRadius: 12, marginHorizontal: 16, marginTop: 30, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  dropdownContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dropdownBox: { width: '48%' },
  dropdown: { backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 10, paddingVertical: 10 },
  dropdownList: { backgroundColor: '#fff', borderRadius: 10 },
  dropdownText: { fontSize: 16 },
  row: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, alignItems: 'center', backgroundColor: '#fff', borderRadius: 6, marginBottom: 2 },
  headerRow: { backgroundColor: COLORS.lightGrey, borderTopWidth: 1, borderTopColor: '#ccc' },
  cell: { paddingHorizontal: 4 },
  rankCell: { width: 30, fontWeight: 'bold', textAlign: 'center' },
  emailCell: { flex: 1, textAlign: 'left' },
  timeCell: { width: 120, textAlign: 'right' },
});