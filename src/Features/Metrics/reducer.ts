import { createSlice, PayloadAction } from 'redux-starter-kit';

export type ApiErrorAction = {
  error: string;
};

const initialState = {
    selectedMeasurements: ['']
};

const slice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    SelectionChanged: (state, action: PayloadAction<string[]>) =>{
        const selectedMeasurements = action.payload;
         state.selectedMeasurements = [...selectedMeasurements];
    }
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
