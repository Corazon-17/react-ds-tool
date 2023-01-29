import { Dataset } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DatasetObject {
  key: string;
  value: Dataset;
}

interface DatasetState {
  active: string;
  data: DatasetObject[];
}

const initialState: DatasetState = {
  active: "",
  data: [],
};

export const datasetSlice = createSlice({
  name: "dataset",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<string>) => {
      state.active = action.payload;
    },
    addDataset: (state, action: PayloadAction<DatasetObject>) => {
      if (state.active === "") {
        return {
          active: action.payload.key,
          data: [...state.data, action.payload],
        };
      } else {
        state.data.push(action.payload);
      }
    },
    updateDataset: (state, action: PayloadAction<DatasetObject>) => {
      return {
        ...state,
        data: state.data.map(({ key, value }) => {
          if (key === action.payload.key) {
            return { key: key, value: action.payload.value };
          } else {
            return { key: key, value: value };
          }
        }),
      };
    },
    removeDataset: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        data: state.data.filter((dt) => dt.key != action.payload),
      };
    },
  },
});

export const { setActive, addDataset, updateDataset, removeDataset } = datasetSlice.actions;

const datasetReducer = datasetSlice.reducer;
export default datasetReducer;