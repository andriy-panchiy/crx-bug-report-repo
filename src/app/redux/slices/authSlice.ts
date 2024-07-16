import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isAuthenticated: boolean;
  idToken: string;
  refreshToken: string;
  user: {
    email?: string;
  };
  settings: {
    isFirstLoad: boolean;
    approveChangeTheme: boolean;
  };
  theme: {
    background: string | null;
    density: string | null;
    inboxType: string | null;
    readingPane: string | null;
  };
}

export const initialState: UserState = {
  isAuthenticated: false,
  idToken: '',
  refreshToken: '',
  user: {},
  settings: {
    isFirstLoad: true,
    approveChangeTheme: false,
  },
  theme: {
    background: null,
    density: null,
    inboxType: null,
    readingPane: null,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setState: <K extends keyof UserState>(state: UserState, action: PayloadAction<{ key: K; state: UserState[K] }>) => {
      state[action.payload.key] = action.payload.state;
    },
    setIdToken: (state: UserState, action: PayloadAction<string>) => {
      state.idToken = action.payload;
    },
    setRefreshToken: (state: UserState, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    loginSuccess: (state: UserState) => {
      state.isAuthenticated = true;
    },
    updateUser: (state: UserState, action: PayloadAction<UserState['user']>) => {
      state.user = { ...state.user, ...action.payload };
    },
    updateUserSettings: (state: UserState, action: PayloadAction<Partial<UserState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    updateUserTheme: (state: UserState, action: PayloadAction<Partial<UserState['theme']>>) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    logout: (state: UserState) => {
      state.isAuthenticated = false;
      state.idToken = '';
      state.refreshToken = '';
      state.user = {};
    },
  },
});

export const { setState, setIdToken, setRefreshToken, loginSuccess, logout, updateUser, updateUserSettings, updateUserTheme } = authSlice.actions;

export default authSlice.reducer;
