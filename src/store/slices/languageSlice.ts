import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface LanguageState {
  current: Language;
  direction: Direction;
}

const initialState: LanguageState = {
  current: 'en',
  direction: 'ltr'
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.current = action.payload;
      state.direction = action.payload === 'ar' ? 'rtl' : 'ltr';
      
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('lang', action.payload);
        document.documentElement.setAttribute('dir', state.direction);
      }
    }
  }
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
