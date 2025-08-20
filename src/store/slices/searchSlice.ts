import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../@types';
interface SearchState {
  query: string;
  results: SearchResult[];
  isSearching: boolean;
  isOpen: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  isSearching: false,
  isOpen: false
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
      if (!state.isOpen) {
        state.query = '';
        state.results = [];
      }
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
    }
  }
});

export const { setQuery, setResults, setSearching, toggleSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
