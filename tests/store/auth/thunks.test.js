import { async } from '@firebase/util';
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from '../../../src/firebase/providers'
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from "../../fixtures/authFixture";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => { 

    const dispatch =  jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('Debe invocar el checkingCredentials', async () => {  
        await checkingAuthentication()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
    });

    test('startGoogleSignIn debe de llamar el checkingCredentials y login - exito', async () => {  
        const loginData = {ok: true, ...demoUser};
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe de llamar el checkingCredentials y logout - error', async () => {  
        const loginData = {ok: false, errorMessage: 'Un error en google'};
        await signInWithGoogle.mockResolvedValue(loginData);
        await startGoogleSignIn()(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startLoginWithEmailPassword debe de llamar el checkingCredentials y login - exito', async () => {  
        const loginData = {ok: true, ...demoUser};
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(login(loginData));
    });

    test('startLoginWithEmailPassword debe de llamar el checkingCredentials y logout - error', async () => {  
        const loginData = {ok: false, errorMessage: 'Prueba error'};
        const formData = { email: demoUser.email, password: '123456' };
        await loginWithEmailPassword.mockResolvedValue(loginData);
        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startCreatingUserWithEmailPassword debe de llamar el checkingCredentials y login-exito ',  async () => { 
        const loginData = {ok: true, ...demoUser};
        const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

        await registerUserWithEmailAndPassword.mockResolvedValue(loginData);
        await startCreatingUserWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
        expect( dispatch ).toHaveBeenCalledWith(login(demoUser));
    });  

    // test('startCreatingUserWithEmailPassword debe de llamar el checkingCredentials y logout-error ',  async () => { 
    //     const loginData = {ok: false, errorMessage: 'Prueba Error'};
    //     const formData = { email: demoUser.email, password: '123456', displayName: demoUser.displayName };

    //     await registerUserWithEmailAndPassword.mockResolvedValue(loginData);
    //     await startCreatingUserWithEmailPassword(formData)(dispatch);

    //     expect( dispatch ).toHaveBeenCalledWith(checkingCredentials());
    //     expect( dispatch ).toHaveBeenCalledWith(logout(loginData.errorMessage));
    // }); 

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {  

        await startLogout()(dispatch);

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith(clearNotesLogout());
        expect( dispatch ).toHaveBeenCalledWith(logout());
    });
})