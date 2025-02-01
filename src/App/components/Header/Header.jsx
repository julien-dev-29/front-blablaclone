import React from 'react'
import './Header.css'

export const Header = ({ currentPage, onClick }) => {

    const navLinkClass = (page) => {
        var className = 'menu-item'
        if (page === currentPage) {
            className += ' active'
        }
        return className
    }

    return (
        <header className="header">
            <div className="topbar">
                <div className="logo">
                    <a href="#home">Le Covoiturage</a>
                </div>

                <nav className="menu">
                    <a href="#trajets" onClick={() => onClick('trajets')} className={navLinkClass('trajets')}>Les Trajets</a>
                    <a href="#mes-trajets" onClick={() => onClick('mes-trajets')} className={navLinkClass('mes-trajets')}>Mes Trajets</a>
                    <a href="#create-trajet" onClick={() => onClick('create-trajet')} className={navLinkClass('create-trajet')}>Publier Un Trajet</a>
                    <a href="#admin" onClick={() => onClick('admin')} className={navLinkClass('admin')}>Admin</a>
                </nav>
            </div>
        </header>
    )
}
