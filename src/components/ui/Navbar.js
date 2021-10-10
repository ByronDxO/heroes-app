import React, { useContext } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const Navbar = () => {
    const { user, dispatch } = useContext( AuthContext );
    const history = useHistory();

    const handleLogout = () => {
        dispatch({
            type: types.logout,
            payload: user
        });

        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    <div className="nav-item nav-link text-info">{ user.name }</div>
                    <button
                        className="nav-item nav-link btn"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}