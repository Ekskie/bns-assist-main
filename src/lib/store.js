import { configureStore } from "@reduxjs/toolkit";
import { api } from "@/service/reduxapi";
import authReducer from "@/service/auth/authSlice";
import beneficiarySliceReducer from "@/service/beneficiaryPortal/beneficiaryPortalSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    beneficiary: beneficiarySliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
