import React, {useState} from 'react';
import {TextInput, View, Button, Alert, StyleSheet} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';

interface TransactionInputProps {
  onAddTransaction: (
    title: string,
    category: string,
    amount: number,
    description?: string,
  ) => void;
  categories: [];
}

const TransactionInput: React.FC<TransactionInputProps> = ({
  onAddTransaction,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  // Dropdown menu
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

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
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        valueField="value"
        value={value}
        labelField="label"
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
        placeholder="Select category"
      />
      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

export default TransactionInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
