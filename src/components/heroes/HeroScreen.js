import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router'
import { getHeroById } from '../../selectors/getHeroById';
import { heroeImages } from '../../helpers/heroImages';

export const HeroScreen = ( { history } ) => {
    const { heroeId } = useParams();
    const hero = useMemo( () => getHeroById( heroeId ), [ heroeId ] );
    if ( !hero ) {
        return <Redirect to="/" />
    }

    const { superhero, publisher, alter_ego, first_appearance, characters } = hero;

    const handleReturn = () => {
        if ( history.length <= 2 ){
            history.push('/');
            return;
        }

        history.goBack();
    }

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={ heroeImages(`./${ heroeId }.jpg`).default } className="img-thumbnail animate__animated animate__fadeInLeft" alt={ superhero } />
            </div>
            <div className="col-8">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush animate__animated animate__fadeIn">
                    <li className="list-group-item"><b> Alter ego: </b> { alter_ego } </li>
                    <li className="list-group-item"><b> Publisher: </b> { publisher } </li>
                    <li className="list-group-item"><b> First appearance: </b> { first_appearance } </li>
                </ul>
                <h5> Characters </h5>
                <p> { characters } </p>
                <button 
                    className="btn btn-outline-info"
                    onClick={ handleReturn }
                >
                    Return
                </button>
            </div>
        </div>
    )
}
