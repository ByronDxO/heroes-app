import React, { useMemo } from 'react'
import queryString from 'query-string'
import { useLocation } from 'react-router';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );
    const [ { search }, handleInputChange ] = useForm( { search: q } );
    const heroesFiltered = useMemo( () => getHeroesByName( q ), [ q ] );

    const handleSearch = ( e ) => {
        e.preventDefault();
        history.push(`?q=${ search }`);
    }

    return (
        <div>
            <h1>Search Screen</h1>
            <hr/>
            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>
                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text"
                            name="search"
                            placeholder="Find your hero"
                            className="form-control"
                            value={ search }
                            onChange={ handleInputChange }
                            autoComplete="off"
                        />
                        <button
                            type="submit"
                            className="btn m-1 btn-block btn-outline-primary"
                        >
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    {
                        ( q === '' ) 
                        &&
                            <div className="alert alert-info">
                                Search a Hero
                            </div>
                    }
                    {
                        (q !== '' && heroesFiltered.length === 0 )
                            &&
                            <div className="alert alert-info">
                                There is no a hero with { q }
                            </div>
                    }
                    <hr />
                    {
                        heroesFiltered.map( hero => (
                            <HeroCard key={ hero.id } { ...hero }/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
