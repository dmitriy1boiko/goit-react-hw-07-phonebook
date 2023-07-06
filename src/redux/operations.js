import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkApi) => {
    try {
      const response = await axios.post('/contacts', newContact);
      
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);


export const getContacts = createAsyncThunk(
  'contacts/fatchAll',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('/contacts');
      return response;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
