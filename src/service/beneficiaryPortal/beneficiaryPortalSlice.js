import { createSlice } from "@reduxjs/toolkit";

const beneficiarySlice = createSlice({
  name: "beneficiary",
  initialState: {
    user: {
      _id: "",
      name: "",
      mother: "",
      ageMonths: 0,
      gender: "",
      address: "",
      birthDate: "",
      approve: false,
      email: "",
      number: "",
      bmi: 0,
      type: "",
      information: [],
      createdAt: "",
      updatedAt: "",
      bns_code: "",
    },
  },
  reducers: {
    setBeneficiary: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setBeneficiary } = beneficiarySlice.actions;

export const selectBeneficiary = (state) => state.beneficiary.user;
export const selectInformation = (state) =>
  state.beneficiary.user?.information || [];

export default beneficiarySlice.reducer;
