 

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
// import axios from '../../../utils/axios'
import axios from 'axios';
 
export const createData = createAsyncThunk(
    'createForm/createData',
    async ({ indicatorPath ,payload,headers={}}, { rejectWithValue }) => {  
        try {
            const defaultHeaders = {
                'Content-Type': 'application/json',
                ...headers,
            };

            const apiUrl = `${process.env.REACT_APP_API_URI}${indicatorPath}`
            console.log("hey i am apiUrl...", apiUrl);
            const response = await axios.post(apiUrl, payload, {
                headers:defaultHeaders
            });

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const getData = createAsyncThunk(
    'createForm/getData',
    async ({ indicatorPath}, { rejectWithValue }) => {  
        try { 
            const apiUrl = `${process.env.REACT_APP_API_URI}${indicatorPath}`
            console.log('apiUrl',apiUrl)
            const response = await axios.get(apiUrl);
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);
 

export const fetchRecords = createAsyncThunk(
    'omr/fetchRecords',
    async ({indicatorPath, page = 1, limit = 10 }, { rejectWithValue }) => {
      try { 
        const apiUrl = `${process.env.REACT_APP_API_URI}${indicatorPath}?page=${page}&limit=${limit}`;         
        const response = await axios.get(apiUrl); 
        return response.data;
      } catch (error) { 
        return rejectWithValue(error.response ? error.response.data : error.message);
      }
    }
  );
// Initial state
const initialState = {  
    data:[],
    isLoading: false,
    error: null,
    success: false,
    message: '',
    seterrors:null,
    serMessage:null, 
    serError:false,
    resSuccess:false,
    serResponse:false

};

// Slice
const createDataSlice = createSlice({
    name: 'createForm',
    initialState,
    reducers: {
        resetCreate: (state) => {
            state.isLoading = false;
            state.error      = null;
            state.message = '';
            state.success = false;
            
        },
    },
    extraReducers: (builder) => {
        builder 
            .addCase(createData.pending, (state) => {
                state.isLoading     = true;
                state.serError      = null;
                state.serMessage    = null;
            })
            .addCase(createData.fulfilled, (state, action) => { 
                state.isLoading     = false;
                state.data          = action.payload;
                state.serResponse   = false  
            })
            .addCase(createData.rejected, (state, action) => {  
                state.isLoading  = false;
                state.serError   = true; 
            })
            .addCase(getData.pending, (state) => {
                state.isLoading     = true;
                state.serError      = null;
                state.serMessage    = null;
            })
            .addCase(getData.fulfilled, (state, action) => { 
                state.isLoading     = false;
                state.data          = action.payload;
                state.serResponse   = false  
            })
            .addCase(getData.rejected, (state, action) => {  
                state.isLoading  = false;
                state.serError   = true; 
            });
    },
});

export const { createReset } = createDataSlice.actions;

export default createDataSlice.reducer;
