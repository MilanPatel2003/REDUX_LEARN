import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import Button from '@/components/Button/Button'
import { addNote, clearNotes, removeNote } from './notesSlice'

function Notes() {
  const [note, setNote] = useState('')

  const notes = useAppSelector((state) => state.notes.notes)
  const maxNotes = useAppSelector((state) => state.notes.maxNotes)
  const dispatch = useAppDispatch()

  const isLimitReached = notes.length >= maxNotes
  const isInputEmpty = note.trim() === ''

  const handleAddNote = () => {
    if (isInputEmpty || isLimitReached) return
    dispatch(addNote(note.trim()))
    setNote('')   // clear input after adding
  }

  // Allow adding via Enter key — better UX
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAddNote()
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700">
        Notes ({notes.length}/{maxNotes})
      </h2>

      {/* Input row */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Write a note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          label="Add"
          onClick={handleAddNote}
          variant="primary"
          size="sm"
          disabled={isLimitReached || isInputEmpty}
        />
      </div>

      {/* Limit warning */}
      {isLimitReached && (
        <p className="text-sm text-red-500">
          Max {maxNotes} notes reached. Remove one to add more.
        </p>
      )}

      {/* Notes list */}
      {notes.length === 0 ? (
        <p className="text-sm text-gray-400">No notes yet. Add one above.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {notes.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-center justify-between rounded-md
                         bg-gray-50 px-3 py-2 text-sm text-gray-700"
            >
              <span>{item}</span>
              <Button
                label="Delete"
                variant="danger"
                size="sm"
                onClick={() => dispatch(removeNote(index))}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Clear all */}
      {notes.length > 0 && (
        <Button
          label="Clear All"
          onClick={() => dispatch(clearNotes())}
          variant="danger"
          size="sm"
        />
      )}
    </div>
  )
}

export default Notes