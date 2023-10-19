import React, {useState} from 'react';
import {TextInput, View, Button, Alert, StyleSheet, Text} from 'react-native';

import {Dropdown} from 'react-native-element-dropdown';
import {MyCategory} from '../models/Category';

import DateTimePicker from '@react-native-community/datetimepicker';

interface TransactionInputProps {
  onAddTransaction: (
    title: string,
    category: string,
    amount: number,
    date?: Date,
    description?: string,
  ) => void;
  categories: MyCategory[];
}

const TransactionInput: React.FC<TransactionInputProps> = ({
  onAddTransaction,
  categories,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  // Category Dropdown menu
  const [isFocus, setIsFocus] = useState(false);
  const [category, setCategory] = useState('');

  // Date Picker
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleAddTransaction = () => {
    if (amount && category) {
      const parsedAmount = parseFloat(amount);

      if (isNaN(parsedAmount)) {
        Alert.alert('Please enter a valid amount.');
        return;
      }

      if (!title) {
        setTitle(category);
      }

      onAddTransaction(title, category, parsedAmount, date);
      setTitle('');
      setAmount('');
      setCategory('');
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
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={categories}
        valueField="value"
        value={category}
        labelField="label"
        onChange={item => {
          setCategory(item.value);
          setIsFocus(false);
        }}
        placeholder="Select category"
      />
      <Button onPress={showDatepicker} title="Choose Date" />
      <Text>selected: {date.toLocaleString()}</Text>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          onChange={onDateChange}
        />
      )}
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
