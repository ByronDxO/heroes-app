import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe('Pruebas en <AppRouter />', () => {
    const context = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('Debe de mostrar el login si no estoy autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ context }>
                <AppRouter />
            </AuthContext.Provider>
         );

         expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de mostrar el componente marvel si está autenticado', () => {
        const context = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: true
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={ context }>
                <AppRouter />
            </AuthContext.Provider>
         );

         expect( wrapper.find('.navbar').exists() ).toBe( true );
    });
    
})
