/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import TransactionsScreen from './screens/TransactionsScreen';
import {NavigationContainer} from '@react-navigation/native';
import TransactionAddScreen from './screens/TransactionAddScreen';
import {RootParamList} from './interfaces';
import HomeScreen from './screens/HomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<RootParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HomeScreen">
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="TransactionsScreen" component={TransactionsScreen} />
        <Tab.Screen
          name="TransactionAddScreen"
          component={TransactionAddScreen}
        />
        <Tab.Screen name="ExpensesScreen" component={ExpensesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

export default App;
