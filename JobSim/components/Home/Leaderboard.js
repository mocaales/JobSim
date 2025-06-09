import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { COLORS } from '../../constants/Colors';
import recipes from '../../data/recipes';

const availableGames = [
  { label: 'Cashier', value: 'cashier' },
  { label: 'Chef', value: 'chef' },
  { label: 'Developer', value: 'developer' },
  { label: 'Dispatcher', value: 'dispatcher' },
  { label: 'Emergency Medicine Specialist', value: 'emergency-medicine-specialist' },
];

const cashierDifficulties = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

const chefRecipes = recipes.map(recipe => ({
  label: recipe.title,
  value: recipe.title,
}));

export default function Leaderboard({ game = 'cashier' }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [selectedGame, setSelectedGame] = useState(game);
  const [filterValue, setFilterValue] = useState('');
  const [gameOpen, setGameOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, [selectedGame, filterValue]);

  const fetchLeaderboard = async () => {
    try {
      const queryParam = selectedGame === 'cashier'
        ? `&difficulty=${filterValue}`
        : `&recipe=${filterValue}`;
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/game/leaderboard?game=${selectedGame}${filterValue ? queryParam : ''}`
      );
      const data = await response.json();
      setLeaderboard(data);
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
    }
  };

  const getFilterOptions = () => {
    if (selectedGame === 'cashier') return cashierDifficulties;
    if (selectedGame === 'chef') return chefRecipes;
    return [];
  };

  const usesPoints = (game) => [
    'developer',
    'emergency-medicine-specialist',
    'dispatcher',
  ].includes(game);

  const renderHeaderRow = () => (
    <View style={[styles.row, styles.headerRow]}>
      <Text style={[styles.cell, styles.rankCell]}>#</Text>
      <Text style={[styles.cell, styles.emailCell]}>Nickname</Text>
      <Text style={[styles.cell, styles.timeCell]}>
        {usesPoints(selectedGame) ? 'Points' : 'Time'}
      </Text>
    </View>
  );

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.rankCell]}>{index + 1}</Text>
      <Text style={[styles.cell, styles.emailCell]}>{item.nickname || item.email}</Text>
      <Text style={[styles.cell, styles.timeCell]}>
        {usesPoints(selectedGame)
          ? (item.score != null ? item.score.toFixed(1) : '-')
          : (item.time !== undefined ? `${item.time}s` : '-')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Games Leaderboard 🏆</Text>
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
          dropDownContainerStyle={styles.dropdownListSmall}
          textStyle={styles.dropdownText}
          listMode="SCROLLVIEW"
          searchable={true}
          searchPlaceholder="Search..."
          searchTextInputStyle={styles.searchInput}
        />
        {getFilterOptions().length > 0 && (
          <DropDownPicker
            key={selectedGame}
            open={filterOpen}
            value={filterValue}
            items={getFilterOptions()}
            setOpen={setFilterOpen}
            setValue={setFilterValue}
            placeholder={selectedGame === 'cashier' ? 'Select Difficulty' : 'Select Recipe'}
            containerStyle={styles.dropdownBox}
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownListScrollable}
            textStyle={styles.dropdownText}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
            searchable={true}
            searchPlaceholder="Search..."
            searchTextInputStyle={styles.searchInput}
          />
        )}
      </View>
      {renderHeaderRow()}
      <View style={styles.scrollContainer}>
        <FlatList
          data={leaderboard}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    zIndex: 1000,
  },
  dropdownBox: {
    width: '48%',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  dropdownListSmall: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 180,
    zIndex: 2000,
  },
  dropdownListScrollable: {
    backgroundColor: '#fff',
    borderRadius: 10,
    maxHeight: 220,
    zIndex: 2000,
  },
  dropdownText: {
    fontSize: 16,
  },
  searchInput: {
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 2,
  },
  headerRow: {
    backgroundColor: COLORS.lightGrey,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  cell: {
    paddingHorizontal: 4,
  },
  rankCell: {
    width: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emailCell: {
    flex: 1,
    textAlign: 'left',
  },
  timeCell: {
    width: 120,
    textAlign: 'right',
  },
  scrollContainer: {
    maxHeight: 250,
  },
});