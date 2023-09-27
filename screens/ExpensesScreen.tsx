import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import transactionService from '../services/TransactionService';
import Transaction from '../models/Transaction';

type Props = NativeStackScreenProps<RootStackParamList, 'ExpensesScreen'>;

type AggregatedData = Record<
  string,
  {totalAmount: number; transactions: Transaction[]}
>;

const ExpensesScreen = ({route, navigation}: Props): JSX.Element => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState({});

  const fetchData = useCallback(async () => {
    const fetchedTransactions = await transactionService.GetTransactionsAsync();

    // sort by date descending (most recent first)
    fetchedTransactions?.sort(
      (a, b) => b.getDate().getTime() - a.getDate().getTime(),
    );
    setTransactions(fetchedTransactions);
  }, []);

  const fetchCategories = useCallback(async () => {
    const onlyCategories = transactions.map(x => x.getCategory());
    const distinctCategories = [...new Set(onlyCategories)];

    setCategories(distinctCategories);
  }, [transactions]);

  const aggregateData = useCallback(async () => {
    const aggregatedData: AggregatedData = {};

    transactions.forEach(transaction => {
      const category = transaction.getCategory();
      const amount = transaction.getAmount();

      if (!aggregatedData[category]) {
        aggregatedData[category] = {
          totalAmount: 0,
          transactions: [],
        };
      }

      // Add the transaction to the category
      aggregatedData[category].transactions.push(transaction);

      // Update the total amount for the category
      aggregatedData[category].totalAmount += amount;
    });

    setExpensesByCategory(aggregatedData);
  }, [transactions]);

  //   useEffect(() => {
  //     const processAll = () => {
  //       fetchData();
  //       fetchCategories();
  //       aggregateData();
  //     };

  //     processAll();
  //   }, [fetchData, fetchCategories, aggregateData]);

  useEffect(() => {
    fetchData();
    fetchCategories();
    aggregateData();
  }, [fetchData, fetchCategories, aggregateData]);

  const myData = [];

  for (const [key, value] of Object.entries(expensesByCategory)) {
    myData.push({
      category: key,
      amount: value.totalAmount,
    });
  }

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <Text style={styles.bigBlue}>Expenses by category: </Text>
      }
      data={myData}
      keyExtractor={item => item.category}
      renderItem={({item}) => (
        <View style={styles.container}>
          <Text> Category: {item.category}</Text>
          <Text> Amount: {item.amount}</Text>
        </View>
      )}
      ListFooterComponent={<></>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default ExpensesScreen;
