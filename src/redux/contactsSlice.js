import { createSlice } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name:'contacts',
  initialState:{
    contacts: [],
    filter: '',
    isLoading: false,
    error: null,
  },
  reducers:{
    addContact (state, { payload }){
    return {
      ...state,
      contacts:[...state.contacts, payload]}
    },
    deleteContact (state, { payload }) {
      return {
        ...state,
        contacts:state.contacts.filter(el => el.id !== payload)}
    },
    filterContact:{ 
      reducer(state, { payload }) {
      state.filter =payload;
    },
    prepare(e) {
      return {
        payload:e.target.value,
      }
    },
  }
  }
});

export const {addContact, deleteContact, filterContact} = contactsSlice.actions
export default contactsSlice.reducer