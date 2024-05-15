import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fulfilledNotify,
  rejectNotify,
  resetNotify,
} from '../../helpers/notifyStateHandler';

interface MainState {
  reference_transaction_types: any;
  loading: boolean;
  count: number;
  refetch: boolean;
  rolesWidgets: any[];
  notify: {
    showNotification: boolean;
    textNotification: string;
    typeNotification: string;
  };
}

const initialState: MainState = {
  reference_transaction_types: [],
  loading: false,
  count: 0,
  refetch: false,
  rolesWidgets: [],
  notify: {
    showNotification: false,
    textNotification: '',
    typeNotification: 'warn',
  },
};

export const fetch = createAsyncThunk(
  'reference_transaction_types/fetch',
  async (data: any) => {
    const { id, query } = data;
    const result = await axios.get(
      `reference_transaction_types${query || (id ? `/${id}` : '')}`,
    );
    return id
      ? result.data
      : { rows: result.data.rows, count: result.data.count };
  },
);

export const deleteItem = createAsyncThunk(
  'reference_transaction_types/deleteReference_transaction_types',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`reference_transaction_types/${id}`);
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const create = createAsyncThunk(
  'reference_transaction_types/createReference_transaction_types',
  async (data: any, { rejectWithValue }) => {
    try {
      const result = await axios.post('reference_transaction_types', { data });
      return result.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const uploadCsv = createAsyncThunk(
  'reference_transaction_types/uploadCsv',
  async (file: File, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('filename', file.name);

      const result = await axios.post(
        'reference_transaction_types/bulk-import',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return result.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const update = createAsyncThunk(
  'reference_transaction_types/updateReference_transaction_types',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `reference_transaction_types/${payload.id}`,
        { id: payload.id, data: payload.data },
      );
      return result.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const reference_transaction_typesSlice = createSlice({
  name: 'reference_transaction_types',
  initialState,
  reducers: {
    setRefetch: (state, action: PayloadAction<boolean>) => {
      state.refetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(fetch.fulfilled, (state, action) => {
      if (action.payload.rows && action.payload.count >= 0) {
        state.reference_transaction_types = action.payload.rows;
        state.count = action.payload.count;
      } else {
        state.reference_transaction_types = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });

    builder.addCase(deleteItem.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(
        state,
        `${'Reference_transaction_types'.slice(0, -1)} has been deleted`,
      );
    });

    builder.addCase(deleteItem.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(create.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(create.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(create.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(
        state,
        `${'Reference_transaction_types'.slice(0, -1)} has been created`,
      );
    });

    builder.addCase(update.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(update.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(
        state,
        `${'Reference_transaction_types'.slice(0, -1)} has been updated`,
      );
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(uploadCsv.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(uploadCsv.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(state, 'Reference_transaction_types has been uploaded');
    });
    builder.addCase(uploadCsv.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setRefetch } = reference_transaction_typesSlice.actions;

export default reference_transaction_typesSlice.reducer;
