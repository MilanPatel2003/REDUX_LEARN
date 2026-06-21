// src/features/notes/notesSelectors.ts
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '@/app/store'

// Base selectors — these are the "inputs"
const selectNotes = (state: RootState) => state.notes.notes
const selectMaxNotes = (state: RootState) => state.notes.maxNotes
const selectSearchTerm = (state: RootState) => state.notes.searchTerm

// Memoized derived selector
export const selectFilteredNotes = createSelector(
  [selectNotes, selectSearchTerm],    // only re-runs when notes OR searchTerm changes
  (notes, searchTerm) => {
    if (!searchTerm.trim()) return notes
    return notes.filter(note =>
      note.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
)

// Memoized stats selector
export const selectNotesStats = createSelector(
  [selectNotes, selectMaxNotes],
  (notes, maxNotes) => ({
    total: notes.length,
    remaining: maxNotes - notes.length,
    isLimitReached: notes.length >= maxNotes,
    percentFull: Math.round((notes.length / maxNotes) * 100),
  })
)