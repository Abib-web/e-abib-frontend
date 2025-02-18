import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../features/session/sessionSlice';
import cartReducer from '../features/cart/cartSlice';

const store = configureStore({
  reducer: {
    session: sessionReducer,
    cart: cartReducer,
  },
});

export default store;
