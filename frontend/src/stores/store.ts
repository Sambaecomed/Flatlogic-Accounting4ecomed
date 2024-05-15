import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import accountsSlice from './accounts/accountsSlice';
import organizationsSlice from './organizations/organizationsSlice';
import transactionsSlice from './transactions/transactionsSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import reference_transaction_typesSlice from './reference_transaction_types/reference_transaction_typesSlice';
import reference_party_typesSlice from './reference_party_types/reference_party_typesSlice';
import accountgroupSlice from './accountgroup/accountgroupSlice';
import general_ledgerSlice from './general_ledger/general_ledgerSlice';
import journalsSlice from './journals/journalsSlice';
import parties_in_transactionsSlice from './parties_in_transactions/parties_in_transactionsSlice';
import accounts_in_transactionsSlice from './accounts_in_transactions/accounts_in_transactionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    accounts: accountsSlice,
    organizations: organizationsSlice,
    transactions: transactionsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    reference_transaction_types: reference_transaction_typesSlice,
    reference_party_types: reference_party_typesSlice,
    accountgroup: accountgroupSlice,
    general_ledger: general_ledgerSlice,
    journals: journalsSlice,
    parties_in_transactions: parties_in_transactionsSlice,
    accounts_in_transactions: accounts_in_transactionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
