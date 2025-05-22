import { View, Text } from 'react-native';
import React from 'react';
import Cashier from '../../components/Explore/Cashier';
import Dispatcher from '../../components/Explore/Dispatcher';


export default function Expolore() {
  return (
    <View>
      <Dispatcher />
      <Cashier />
    </View>
  );
}