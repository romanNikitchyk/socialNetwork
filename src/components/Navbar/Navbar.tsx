import React from 'react';
import classes from "./Navbar.module.css"
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return <nav className={classes.nav}>
        <div className={classes.item}>
            <NavLink to='/Profile' activeClassName={classes.activeOn }>Profile</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/Dialogs' activeClassName={classes.activeOn }>Messages</NavLink>
        </div>

        <div className={classes.item}>
            <NavLink to='/Users' activeClassName={classes.activeOn }>Users</NavLink>
        </div>

        <div className={classes.item}>
            <NavLink to='/News' activeClassName={classes.activeOn }>News</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/Music' activeClassName={classes.activeOn }>Music</NavLink>
        </div>
        <div className={classes.item}>
            <NavLink to='/Settings' activeClassName={classes.activeOn }>Settings</NavLink>
        </div>
    </nav>

};

export default Navbar;