import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { use } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router'; 

export default function MenuList() {

    const { signOut } = useAuth();
    const router = useRouter();

  const menuList = [
    { id: 1, title: 'Profile', iconSet: 'Ionicons', icon: 'person-outline', screen: 'profileEdit' },
    { id: 2, title: 'Settings', iconSet: 'Ionicons', icon: 'settings-outline', screen: 'settingsPage' },
    { id: 3, title: 'Help', iconSet: 'Ionicons', icon: 'help-circle-outline', screen: 'helpPage' },
    { id: 4, title: 'Logout', iconSet: 'MaterialIcons', icon: 'logout', screen: 'logout' },
  ];

  const renderIcon = (item) => {
    if (item.iconSet === 'Ionicons') {
      return <Ionicons name={item.icon} size={28} color="#000" />;
    }
    if (item.iconSet === 'MaterialIcons') {
      return <MaterialIcons name={item.icon} size={28} color="#000" />;
    }
    return null;
  };

  const onMenuClick = (item) => {
    if (item.screen === 'logout') {
      signOut();
      return;
    }
    router.push(item.screen);
  };

  return (
    <FlatList
      data={menuList}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.grid}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => onMenuClick(item)}>
          {renderIcon(item)}
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  grid: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 12,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
});