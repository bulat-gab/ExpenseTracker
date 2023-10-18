import {MyCategory} from '../models/Category';

export type RootStackParamList = {
  HomeScreen: undefined;
  TransactionsScreen: undefined;
  TransactionAddScreen: {categories: MyCategory[]};
  ExpensesScreen: undefined;
};
