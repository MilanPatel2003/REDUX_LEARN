import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// 1. Define the shape of this slice's state
interface CounterState {
  value: number
  step: number
}

// 2. Define the initial state
const initialState: CounterState = {
  value: 0,
  step: 1,
}

// 3. Create the slice
const counterSlice = createSlice({
  name: 'counter',          // used as prefix for action types: 'counter/increment'
  initialState,
  reducers: {
    // Each function here becomes both a reducer AND an action creator

    // No payload needed — just increment by current step
    increment(state) {
      state.value += state.step
      // Note: this LOOKS like mutation but RTK uses Immer under the hood
      // Immer intercepts this and produces a new immutable state
    },

    decrement(state) {
      state.value -= state.step
    },

    reset(state) {
      state.value = 0
    },

    // PayloadAction<number> means this action carries a number as its payload
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },

    // Change the step value
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload
    },
  },
})

// 4. Export actions — these are what components will dispatch
export const {
  increment,
  decrement,
  reset,
  incrementByAmount,
  setStep,
} = counterSlice.actions

// 5. Export the reducer — this goes into the store
export default counterSlice.reducer