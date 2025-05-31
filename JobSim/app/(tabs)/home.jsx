import { View, FlatList } from 'react-native';
import React from 'react';
import Header from '../../components/Home/Header';
import QuestionnaireCard from '../../components/Home/QuestionnaireCard';
import Leaderboard from '../../components/Home/Leaderboard';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <Header />
            <QuestionnaireCard />
            <View style={{ height: 20 }} /> 
          </>
        }
        data={[{ key: 'leaderboard' }]}
        renderItem={() => <Leaderboard game='cashier' />}
      />
    </View>
  );
}