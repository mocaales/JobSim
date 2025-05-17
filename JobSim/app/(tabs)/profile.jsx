import { View, Text } from 'react-native';
import React from 'react';
import MenuList from '../../components/Profile/MenuList';
import UserIntro from '../../components/Profile/UserInfo';

export default function Profile() {
  return (
    <View>

      <UserIntro />

      <MenuList />

    </View>
  );
}