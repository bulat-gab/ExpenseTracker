import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Transaction from '../models/Transaction';

const Expenses: React.FC = () => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      // Perform asynchronous operations here
      const allKeys: readonly string[] = await AsyncStorage.getAllKeys();
      if (allKeys === null || allKeys.length === 0) {
        return;
      }

      const transactions = [];
      for (let i = 0; i < allKeys.length; i++) {
        const tx = await AsyncStorage.getItem(allKeys[i]);
        if (tx === null) {
          throw Error(`Key ${allKeys[i]} was not found.`);
        }

        const txObject = JSON.parse(tx);
        const txTyped: Transaction = Transaction.createFromObject(txObject);
        transactions.push(txTyped);
      }

      console.log('Expenses: ', transactions);
      setData(transactions);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      ListHeaderComponent={<Text>Expenses: </Text>}
      data={data}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <View style={styles.transactionItem}>
          <Text>
            <Text style={styles.label}>Id:</Text> {item.id}
          </Text>
          <Text>
            <Text style={styles.label}>Title:</Text> {item.title}
          </Text>
          <Text>
            <Text style={styles.label}>Amount:</Text> ${item.amount}
          </Text>
          <Text>
            <Text style={styles.label}>Category:</Text> {item.category}
          </Text>
          <Text>
            <Text style={styles.label}>Date:</Text> {item.date}
          </Text>
        </View>
      )}
      ListFooterComponent={<></>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  transactionItem: {
    padding: 12,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default Expenses;
