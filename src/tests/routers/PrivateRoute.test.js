const { mount } = require("enzyme");
const { MemoryRouter } = require("react-router");
const { PrivateRoute } = require("../../routers/PrivateRoute");

describe('Pruebas en <PrivateRoute />', () => {
    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();
    test('Debe de mostrar el componente si está autenticado y guardar el localStorage', () => {
        const wrapper  = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ true }
                    component={ () => <span>Hola!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(true);
        expect( localStorage.setItem ).toHaveBeenCalledWith( 'lastPath', props.location.pathname );
    });

    test('Debe de bloquear el componente si no está autenticado', () => {
        const wrapper  = mount( 
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={ false }
                    component={ () => <span>Hola!</span> }
                    { ...props }
                />
            </MemoryRouter>
        );

        expect( wrapper.find('span').exists() ).toBe(false);
    });
    
});
