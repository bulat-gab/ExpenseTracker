/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import TransactionInput from './components/TransactionInput';
import Transaction from './models/Transaction';
import Section from './components/Section';
import AsyncStorage from '@react-native-async-storage/async-storage';

import uuid from 'react-native-uuid';
import Expenses from './components/Expenses';

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const addTransaction = async (
    title: string,
    category: string,
    amount: number,
  ) => {
    try {
      const id = uuid.v4().toString();
      const date = new Date();
      const newTransaction: Transaction = new Transaction(
        id,
        title,
        category,
        date,
        amount,
      );

      console.log(newTransaction);

      await AsyncStorage.setItem(id, JSON.stringify(newTransaction));
    } catch (error) {
      console.error('Error storing transaction:', error);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One Thirty Five">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="Add new transaction">
            <TransactionInput onAddTransaction={addTransaction} />
          </Section>
          {/* <Section title="Transactions:">
            <Expenses />
          </Section> */}
          <Expenses />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
