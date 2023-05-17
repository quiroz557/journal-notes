import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload } from "../../helpers/fileUpload";
import { loadNotes } from "../../helpers/loadNotes";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        const newNote = {
            imageUrls: '',
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc(collection( FirebaseDB,`${uid}/journal/notes`));
        await setDoc( newDoc, newNote );

        dispatch(addNewEmptyNote( newNote ));
        dispatch(setActiveNote( newNote ));
        //dispatch(activeNote)
    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => { 

        dispatch(savingNewNote());

        const { uid } = getState().auth;

        if( !uid ) throw new Error('El UID o el id del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes));
    }
}


export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const noteToFireStore = { ...activeNote };
        delete noteToFireStore.id;

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote.id }` ); 

        await setDoc( docRef, noteToFireStore, {merge: true});
        
        dispatch(updateNote(activeNote));
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());

        await fileUpload(files[0]);

        const fileUploadPromises = [];

        for( const file of files ) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photosUrls = await Promise.all( fileUploadPromises );

        dispatch(setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { activeNote } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);

        await deleteDoc(docRef);
        dispatch( deleteNoteById(activeNote.id));
    }
}