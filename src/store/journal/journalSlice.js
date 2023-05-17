import { createSlice } from '@reduxjs/toolkit'

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        activeNote: null
    },
    reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.activeNote = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action ) => {
            state.notes = action.payload;
            state.isSaving = false;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) => {

            state.isSaving = false;

            const { id } = action.payload;

            state.notes = state.notes.map((note, index) => {
                if ( note.id === id ) {
                    return action.payload;      
                }

                return note;
            });

            state.messageSaved = `${ action.payload.title }, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action) => {
            state.isSaving = false;

            state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload]
        },
        clearNotesLogout: ( state ) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.activeNote = null;
        },
        deleteNoteById: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload );
            state.activeNote = null;
        }
    }
})

export const {
    savingNewNote,
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    setPhotosToActiveNote,
    clearNotesLogout,
    deleteNoteById,
} = journalSlice.actions