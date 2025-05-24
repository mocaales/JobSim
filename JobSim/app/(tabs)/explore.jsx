import { View, Text } from 'react-native';
import React from 'react';
import Cashier from '../../components/Explore/Cashier';
import Dispatcher from '../../components/Explore/Dispatcher';
import Developer from '../../components/Explore/Developer';
import Chef from '../../components/Explore/Chef';

export default function Expolore() {
  return (
    <View>
      <Dispatcher />
      <Cashier />
      <Developer />
      <Chef />
    </View>
  );
}