import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe('Pruebas en <Navbar />', () => {
    const historyMock = {
        push: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn(),
        replace: jest.fn()
    };

    const context = {
        dispatch: jest.fn(),
        user: {
            name: 'Juan Fernando Yuco Jimenez',
            logged: true
        }
    };

    const wrapper = mount(
        <AuthContext.Provider value={ context }>
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe(context.user.name);
    });

    test('Debe de llamar el logout y el usar history', () => {
        wrapper.find('button').prop('onClick') ();
        expect( context.dispatch ).toHaveBeenCalledWith({ type: types.logout, payload: context.user });
        expect( historyMock.replace ).toHaveBeenCalledWith('/login');
    });
    
})
