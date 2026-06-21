// ✏️ Coding Exercise
// Add a new slice called notesSlice to the store:
// typescript// The state should look like this:
// interface NotesState {
//   notes: string[]
//   maxNotes: number   // maximum allowed notes
// }
// Requirements:

// Action addNote(text: string) — adds a note, but only if notes.length < maxNotes
// Action removeNote(index: number) — removes a note by index
// Action clearNotes() — clears all notes
// Build a NotesList component that connects to this slice
// Component shows all notes, has an input to add new ones, and a remove button per note

// Bonus: Disable the add button when max notes is reached. Show a message like "Max 5 notes reached."
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface NotesState {
  notes: string[]
  maxNotes: number
  searchTerm: string
}

const initialState: NotesState = {
  notes: [],
  maxNotes: 5,
  searchTerm : ""
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<string>) {
      if (state.notes.length < state.maxNotes) {
        state.notes.push(action.payload)
      }
    },

    removeNote(state, action: PayloadAction<number>) {
      // maxNotes is a limit, not a counter — never change it on delete
      state.notes = state.notes.filter((_, i) => i !== action.payload)
    },

    clearNotes(state) {
      state.notes = []
      // maxNotes resets too in case you ever allow changing it
      state.maxNotes = initialState.maxNotes
    },

    setSearchTerm(state, action:PayloadAction<string>){
      state.searchTerm = action.payload
    }
  },
})

export const { addNote, removeNote, clearNotes } = notesSlice.actions
export default notesSlice.reducer