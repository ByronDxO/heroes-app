import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe('Pruebas en <SearchScreen />', () => {
    test('De de mostrarse correctamente con valores por defecto', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

       expect( wrapper ).toMatchSnapshot();
       expect( wrapper.find('.alert-info').text().trim() ).toBe('Search a Hero');
    });

    test('Debe de mostrar a Batman y el input con el valor de query string', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe('batman');
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de mostrar un error si no se encuentra el hero', () => {
        const text = 'batman1212';
        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search?q=${ text }`]}>
                <Route path="/search" component={ SearchScreen } />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toBe(text);
        expect( wrapper.find('.alert-info').text().trim() ).toBe(`There is no a hero with ${ text }`);
    });

    test('Debe de llamar el push del history', () => {
        const text = 'batman';
        const history = {
            push: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={[`/search`]}>
                <Route path="/search" component={ () => <SearchScreen history={ history } /> } />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target: {
                name: 'search',
                value: text
            }
        });

        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith(`?q=${ text }`);
    });
     
});
