import React, {useState} from 'react';
import {TextInput, View, Button, Alert} from 'react-native';

import styles from '../Styles';

interface TransactionInputProps {
  onAddTransaction: (
    title: string,
    category: string,
    amount: number,
    description?: string,
  ) => void;
}

const TransactionInput: React.FC<TransactionInputProps> = ({
  onAddTransaction,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTransaction = () => {
    if (title && amount && category) {
      const parsedAmount = parseFloat(amount);

      if (isNaN(parsedAmount)) {
        Alert.alert('Please enter a valid amount.');
        return;
      }

      onAddTransaction(title, category, parsedAmount);
    } else {
      Alert.alert('Please fill in all fields.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

export default TransactionInput;
