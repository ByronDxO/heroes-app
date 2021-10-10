import { mount } from "enzyme";
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";

describe('Pruebas en <LoginScreen />', () => {
    const history = {
        replace: jest.fn()
    };

    const context = {
        dispatch: jest.fn()
    };

    const wrapper = mount(
        <AuthContext.Provider value={ context }>
            <LoginScreen history={ history } />
        </AuthContext.Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });
     
    test('Debe de realizar el dispatch y la navegación', () => {
        const handleClick = wrapper.find('button').prop('onClick');
        handleClick();

        expect( context.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Juan Fernando Yuco Jimenez'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');
        localStorage.setItem('lastPath', '/dc');
        handleClick();
        expect( history.replace ).toHaveBeenCalledWith('/dc');
    });
    
});
