import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes } from "../../../src/store/journal/journalSlice";
import { startLoadingNotes, startNewNote } from "../../../src/store/journal";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";

describe('Pruebas en Journal Thunks', () => {
    
    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startNewNote Debe de crear una nueva nota en blanco', async () => {  
        const uid = 'TEST-UID'
        getState.mockReturnValue({ auth: { uid: uid } });

        await startNewNote()(dispatch, getState);

        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
          body: '',
          title: '',
          imageUrls: '', 
          date: expect.any(Number)
        }));

        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            imageUrls: '', 
            date: expect.any(Number)
        }));
    })

    // test('startLoadingNotes debe de cargar todas las notas que hayan', async () => { 
    //     const uid = 'TEST-UID'
    //     getState.mockReturnValue({ auth: { uid: uid } });
        

    //     await startLoadingNotes()(dispatch, getState);
    //     expect( dispatch ).toHaveBeenCalledWith(setNotes({
    //         body: '',
    //         title: '',
    //         imageUrls: '', 
    //         date: expect.any(Number),
    //         id: expect.any(String)
    //     }));
    // })
})