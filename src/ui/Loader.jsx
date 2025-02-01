import React from 'react'

export const Loader = ({size}) => {
    return (
        <div className={"spinner-border spinner-border" + size} role="status">
            <span className="visually-hidden">Chargement...</span>
        </div>
    )
}