import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../interfaces';
import {Button, Text, View} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props): JSX.Element => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button
        title="Add transaction"
        onPress={() => navigation.navigate('TransactionAddScreen')}
      />
      <Button
        title="Transactions"
        onPress={() => navigation.navigate('TransactionsScreen')}
      />
    </View>
  );
};

export default HomeScreen;
