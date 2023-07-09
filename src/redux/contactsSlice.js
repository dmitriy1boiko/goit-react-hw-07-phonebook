import { createSlice } from '@reduxjs/toolkit';
import { addContacts, deleteContacts, getContacts } from './operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: {
      items: [],
      isLoading: false,
      error: null,
    },
    filter: '',
  },
  reducers: {
    filterContact: {
      reducer(state, { payload }) {
        state.filter = payload;
      },
      prepare(e) {
        return {
          payload: e.target.value,
        };
      },
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items.push(payload);
      })
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = payload;
      })
      .addCase(deleteContacts.fulfilled, (state, { payload }) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          el => el.id !== payload
        );
      })
      .addMatcher(
        action => action.type.endsWith('pending'),
        state => {
          state.contacts.isLoading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.startsWith('contacts') &&
          action.type.endsWith('rejected'),
        (state, { payload }) => {
          state.contacts.isLoading = false;
          state.contacts.error = payload;
        }
      );
  },
});

// .addCase(addContacts.pending, state => {
//   return {
//     ...state,
//     isLoading: true,
//   };
// })
// .addCase(addContacts.rejected, (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
// })
// .addCase(getContacts.pending, state => {
//   state.isLoading = true;
// })
// .addCase(getContacts.rejected, (state, { payload }) => {
//   state.isLoading = false;
//   state.error = payload;
// })
export const { filterContact } = contactsSlice.actions;
export default contactsSlice.reducer;
