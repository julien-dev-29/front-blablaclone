import React, { useRef } from 'react'

export const SearchForm = ({ onSearch, onError }) => {
    const formRef = useRef(null)
    const handleSearch = async (e) => {
        e.preventDefault()
        const villeD = e.target.villeD.value
        const villeA = e.target.villeA.value
        onSearch(villeD, villeA)
        formRef.current.reset()
    }
    return (
        <div>
            <div className="mb-3 input">
                <form ref={formRef} className='shadow-lg' onSubmit={handleSearch}>
                    <div className="input-group input-group-lg">
                        <input
                            className="form-control"
                            id='villeD'
                            type="text"
                            name="villeD"
                            placeholder="Ville de départ"
                            aria-label="Ville de départ"
                            aria-describedby="my-addon"
                            required
                        />
                        <input
                            className="form-control"
                            id='villeA'
                            type="text" name="villeA"
                            placeholder="Ville d'arrivée"
                            aria-label="Recipient's text"
                            aria-describedby="Recipient's text"
                            required
                        />
                        <button className='btn btn-primary' type='submit'>Rechercher</button>
                    </div>
                </form>
            </div>

        </div>
    )
}