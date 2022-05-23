import React from 'react';
import logo from '../logo.svg';
import { NavLink } from 'react-router-dom'

const AppHeader = () => {
  return (
    <header className="App-header">
      <div className="App-header-content">
        <section className="logo-search">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title header-pad">outThere</h1>
          <form className="searchbar">
            <input
              list="places"
              type="text"
              id="city"
              name="city"
              required
              autoComplete="off"
              pattern="Amsterndam|Berlin|Dublin|London|Paris"/>
            <datalist id="places">
              <option>Amsterdam</option>
              <option>Berlin</option>
              <option>Dublin</option>
              <option>London</option>
              <option>Paris</option>
            </datalist>
          </form>
        </section>
        <section className="navbar">
          <NavLink to="/">Current</NavLink>
          {"-"}
          <NavLink to="/today">Today</NavLink>
          {"-"}
          <NavLink to="/week">This Week</NavLink>
        </section>
      </div>
    </header>
  )
}

export default AppHeader;