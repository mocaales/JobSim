import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/Colors';
import React from 'react';

const JOBS = [
  {
    id: 'dispatcher',
    name: 'Dispatcher',
    iconName: 'card-account-phone-outline',
  },
  {
    id: 'prodajalec',
    name: 'Prodajalec',
    iconName: 'cart-outline',
  },
  // later: { id: 'coder', name: 'Coder', iconName: 'laptop-code' }, …
];

export default function Explore() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/job/${item.id}`)}
      activeOpacity={0.7}
    >
      <MaterialCommunityIcons
        name={item.iconName}
        size={40}
        color={COLORS.activeIcon}
        style={styles.icon}
        />
        <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <View style={styles.container}>
      <FlatList
        data={JOBS}
        keyExtractor={(i) => i.id}
        renderItem={renderItem}
        contentContainerStyle={{ 
          paddingVertical: 16,
          alignItems: 'center',
         }}
        />
    </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 80;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: COLORS.gray, //opcijsko
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width -32,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    //sence
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
  },
});