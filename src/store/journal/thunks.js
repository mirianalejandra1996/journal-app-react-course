import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"

import { addNewEmptyNote, deleteNoteById, isSavingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./JournalSlice"
import { fileUpload, loadNotes } from "../../helpers"


export const startNewNote = () => {
    return async (dispatch, getState) => {
        
        dispatch(isSavingNewNote())
        
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        }

        const newDoc = doc( collection( FirebaseDB , `${uid}/journal/notes`) )
        const response = await setDoc( newDoc , newNote)

        newNote.id = newDoc.id

        console.log('response', newDoc.id ,response)

        dispatch ( addNewEmptyNote(newNote))
        dispatch ( setActiveNote(newNote))

    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        if (!uid) throw new Error ( 'UID user does not exist')
        
        const notes = await loadNotes(uid)
        dispatch(setNotes(notes))
    }
}

export const startSaveNote = () => {

    return async ( dispatch, getState ) => {

        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active: note } = getState().journal
        console.log('viendo esto',  note)

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;
    
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch(updateNote(note))

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        
        
        dispatch(setSaving())
       
        // His way

        // const fileUploadPromises = [];
        // for ( const file of files ) {
        //     fileUploadPromises.push( fileUpload( file ) )
        // }

        // const photosUrls = await Promise.all( fileUploadPromises );


        // My way
        const fileList = Array.from(files)
        const photosUrlPromises = fileList.map(async (file) => await fileUpload(file))
        const photosUrl = await Promise.all(photosUrlPromises)



        console.log('photosUrlphotosUrlphotosUrl', photosUrl)


        dispatch(setPhotosToActiveNote(photosUrl))
        
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        console.log('startDeletingNote')

        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active: note } = getState().journal
        
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await deleteDoc( docRef );
        
        dispatch(deleteNoteById(note.id))

    }
}