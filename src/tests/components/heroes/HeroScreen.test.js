import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe('Pruebas en <HeroScreen />', () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    test('Debe mostrar el componente redirect si no hay argumentos en el Url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero'] }>
                <HeroScreen history={ history } />
            </MemoryRouter>
        );

        expect( wrapper.find('Redirect').exists() ).toBe(true);
    });

    test('Debe de mostrar un hero si el parámetro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route path="/hero/:heroeId" component={ HeroScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe(true);
        expect( wrapper.find('h3').text().trim() ).toBe('Spider Man');
    });
    
    test('Debe de regresar a la pantalla anterior con push ', () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect( history.push ).toHaveBeenCalledWith('/');
        expect( history.goBack ).not.toHaveBeenCalled();
    });

    test('Debe de regresar a la pantalla anterior', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect( history.goBack ).toHaveBeenCalledTimes(1);
        expect( history.push ).not.toHaveBeenCalled();
    });

    test('Debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={ ['/hero/marvel-spider111'] }>
                <Route 
                    path="/hero/:heroeId" 
                    component={ () => <HeroScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        expect( wrapper.text() ).toBe('');
    });
    

});
