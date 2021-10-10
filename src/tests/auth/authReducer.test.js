import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
    test('Debe de retornar el estado por defecto', () => {
        const state = { name: 'Yuco' };
        expect( authReducer( state, { type: '', payload: {} } ) ).toEqual( state );
    });

    test('Debe de autenticar y colocar el name del usuario', () => {
        const state = { name: 'Juan Fernando Yuco Jimenez', logged: true };
        const finalState = authReducer( {}, { type: types.login, payload: { name: state.name } } );
        expect( finalState ).toEqual( state );
        
    });

    test('Debe de borrar el name del usuario y el logged en false', () => {
        const state = { name: 'Juan Fernando Yuco Jimenez', logged: true };
        const finalState = authReducer( state, { type: types.logout } );
        expect( finalState.logged ).toBe( false );
        expect( finalState.name ).toBe( undefined );
    });
})
