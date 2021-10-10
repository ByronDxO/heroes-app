import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Pruebas en <DashboardRoutes />', () => {
    const context = {
        dispatch: jest.fn(),
        user: {
            name: 'Juan Fernando Yuco Jimenez',
            logged: true
        }
    };

    test('Debe mostrarse correctamente', () => {
        const wrapper = mount(
            <AuthContext.Provider value={ context }>
                <MemoryRouter>
                    <DashboardRoutes />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toBe( context.user.name );
    });
});
