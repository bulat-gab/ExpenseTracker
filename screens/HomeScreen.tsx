import React from 'react';
import {RootParamList} from '../interfaces';
import {Button, Text, View} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

const categories = [
  {label: 'food', value: 'food'},
  {label: 'transport', value: 'transport'},
  {label: 'house', value: 'house'},
  {label: 'household', value: 'household'},
  {label: 'utility', value: 'utility'},
  {label: 'health', value: 'health'},
  {label: 'education', value: 'education'},
  {label: 'vacation', value: 'vacation'},
  {label: 'sport', value: 'sport'},
  {label: 'other', value: 'other'},
];

type Props = BottomTabScreenProps<RootParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: Props): JSX.Element => {
  return (
    <View>
      <Text>Home Screen</Text>
      {/* <Button
        title="Add transaction"
        onPress={() =>
          navigation.navigate('TransactionAddScreen', {categories: categories})
        }
      />
      <Button
        title="Transactions"
        onPress={() => navigation.navigate('TransactionsScreen')}
      />
      <Button
        title="Expenses"
        onPress={() => navigation.navigate('ExpensesScreen')}
      /> */}
    </View>
  );
};

export default HomeScreen;
