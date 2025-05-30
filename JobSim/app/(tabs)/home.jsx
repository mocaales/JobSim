import { View, Text } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import QuestionnaireCard from '../../components/Home/QuestionnaireCard';

export default function Home() {
  return (
    <View>
      <Header />
      <QuestionnaireCard />
    </View>
  );
}