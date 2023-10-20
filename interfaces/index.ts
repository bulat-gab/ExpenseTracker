import {MyCategory} from '../models/Category';

export type RootParamList = {
  HomeScreen: undefined;
  TransactionsScreen: undefined;
  TransactionAddScreen: {categories: MyCategory[]};
  ExpensesScreen: undefined;
};
