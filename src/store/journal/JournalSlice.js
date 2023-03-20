import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSaving: false,
  messageSaved: "",
  notes: [],
  active: null,
  // active: {
  //     id: 'fakeId',
  //     title: '',
  //     body: '',
  //     date: 1213112,
  //     imageUrls: [] // https://photo1.jpg,  https://photo2.jpg, https://photo3.jpg
  // }
};

export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    isSavingNewNote: (state ) => {
      state.isSaving = true
    },
    // Todo lo que esté en el reducer tienen que ser operaciones síncronas ya que son funciones
    // puras
    addNewEmptyNote: (state, action) => {
      state.notes = [...state.notes, action.payload]
      state.isSaving = false
      // state.notes.push(action.payload) //Is valid too
    },
    setActiveNote: (state, action) => {
      state.active = action.payload
      state.messageSaved = ''
    },
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    setSaving: (state) => {
      state.isSaving = true
      state.messageSaved = ''
    },
    updateNote: (state, action) => {
      state.isSaving = false
      state.notes = state.notes.map(note => note.id === action.payload.id ? action.payload : note)
      state.messageSaved = `La nota se actualizó correctamente`
    },
    setPhotosToActiveNote: (state, action) => {
      state.isSaving = false
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
    },
    cleanNotesLogout: (state) => {
      state.isSaving = false
      state.messageSaved = ""
      state.notes = []
      state.active = null
    },
    deleteNoteById: (state, action) => {
      state.active = null
      state.notes = state.notes.filter(note => note.id !== action.payload)
      state.isSaving = false
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEmptyNote,
  cleanNotesLogout,
  deleteNoteById,
  isSavingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
