import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '@/features/counter/counterSlice'
import notesReducer from '@/features/notes/notesSlice'
import postsReducer from '@/features/posts/postsSlice'
export const store = configureStore({
    reducer:{
        counter : counterReducer,
        notes : notesReducer,
            posts: postsReducer,   
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch