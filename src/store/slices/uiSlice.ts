import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  mobileMenuOpen: boolean;
  currentSlide: number;
  currentTeamPage: number;
  currentTestimonial: number;
  isLoading: boolean;
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
    timestamp: number;
  }>;
}

const initialState: UIState = {
  mobileMenuOpen: false,
  currentSlide: 0,
  currentTeamPage: 0,
  currentTestimonial: 0,
  isLoading: false,
  notifications: []
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setCurrentSlide: (state, action: PayloadAction<number>) => {
      state.currentSlide = action.payload;
    },
    setCurrentTeamPage: (state, action: PayloadAction<number>) => {
      state.currentTeamPage = action.payload;
    },
    setCurrentTestimonial: (state, action: PayloadAction<number>) => {
      state.currentTestimonial = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addNotification: (state, action: PayloadAction<{
      message: string;
      type: 'success' | 'error' | 'info';
    }>) => {
      const notification = {
        id: Date.now().toString(),
        ...action.payload,
        timestamp: Date.now()
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    }
  }
});

export const { 
    toggleMobileMenu, 
    setCurrentSlide, 
    setCurrentTeamPage, 
    setCurrentTestimonial,
    setLoading,
    addNotification,
    removeNotification
  } = uiSlice.actions;
  export default uiSlice.reducer;
  