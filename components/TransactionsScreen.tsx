import {View, Text, FlatList, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import transactionService from '../services/TransactionService';

const TransactionsScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<any>([]);

  const fetchData = async () => {
    const fetchedTransactions = await transactionService.GetTransactionsAsync();
    setTransactions(fetchedTransactions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      ListHeaderComponent={<Text>Expenses: </Text>}
      data={transactions}
      keyExtractor={item => item.getId()}
      renderItem={({item}) => (
        <View style={styles.transactionItem}>
          <Text>
            <Text style={styles.label}>Id:</Text> {item.getId()}
          </Text>
          <Text>
            <Text style={styles.label}>Title:</Text> {item.getTitle()}
          </Text>
          <Text>
            <Text style={styles.label}>Amount:</Text> ${item.getAmount()}
          </Text>
          <Text>
            <Text style={styles.label}>Category:</Text> {item.getCategory()}
          </Text>
          <Text>
            <Text style={styles.label}>Date:</Text> {item.getDate().toString()}
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

export default TransactionsScreen;
