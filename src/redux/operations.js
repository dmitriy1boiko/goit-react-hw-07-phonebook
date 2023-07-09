import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { deleteError, deleteRequest, deleteSuccess} from './contactsSlice';

axios.defaults.baseURL = 'https://64a432ffc3b509573b573f79.mockapi.io/';

export const addContacts = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkApi) => {
    // dispatch({type: "contacts/addContact/pending"}) -> reducer
    try {
      
      const response = await axios.post('/contacts', {
        name: newContact.name,
        phone: newContact.phone,
      });
      console.log(response);
      return response.data; // dispatch({type: "contacts/addContact/fulfilled", payload: response.data })
    } catch (error) {
      return thunkApi.rejectWithValue(error.message); // dispatch({type: "contacts/addContact/rejected", payload: error.message })
    }
  }
);

export const getContacts = createAsyncThunk(
  'contacts/get',
  async (_, thunkApi) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const addContactsApi = newContact => {
//   return axios.post('/contacts', newContact).then(({ data }) => {
//     return data;
//   });
// };

// export const getContactsApi = () => {
//   return axios.get('/contacts').then(({ data }) => {
//     return data;
//   });
// };

// export const deleteContactsApi = (id) => {
//   return axios.delete(`/contacts/${id}`).then(({ data }) => id);
// };

// export const addContacts = newContact => (dispatch, getState) => {
//   dispatch(addRequest());
//   addContactsApi(newContact)
//     .then(contacts => dispatch(addSuccess(contacts)))
//     .catch(err => dispatch(addError(err.message)));
// };

// export const getContacts=() =>(dispatch)=>{
//   dispatch(getRequest());
//   getContactsApi().then((data)=>dispatch(getSuccess(data))).catch(err =>dispatch(getError(err.message)));
// };

// export const deleteContacts = (id)=>(dispatch)=>{
//   dispatch(deleteRequest());
//   deleteContactsApi(id).then((id) =>dispatch(deleteSuccess(id))).catch((err)=>dispatch(deleteError(err.message)));
// };


