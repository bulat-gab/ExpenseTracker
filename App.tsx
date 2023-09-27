/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import TransactionsScreen from './screens/TransactionsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionAddScreen from './screens/TransactionAddScreen';
import {RootStackParamList} from './interfaces';
import HomeScreen from './screens/HomeScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeScreen">
        <RootStack.Screen name="HomeScreen" component={HomeScreen} />
        <RootStack.Screen
          name="TransactionsScreen"
          component={TransactionsScreen}
        />
        <RootStack.Screen
          name="TransactionAddScreen"
          component={TransactionAddScreen}
        />
      </RootStack.Navigator>
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
