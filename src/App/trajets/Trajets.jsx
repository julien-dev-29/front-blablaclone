import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Loader } from '../../ui/Loader'
import { TrajetList } from './TrajetList'
import { SearchForm } from '../components/SearchForm'
import { useRechercheTrajets } from '../../hooks/rechercheTrajets'

export const Trajets = ({ onDelete, onRegister }) => {
  const [error, setError] = useState(null)
  const { fetchRechercheTrajets, rechercheTrajets } = useRechercheTrajets()
  const handleSearch = async (villeD, villeA) => {
    try {
      const trajets = await fetchRechercheTrajets(villeD, villeA)
      setError(trajets)
    } catch (error) {
      setError(error.errors.error)
    }
  }
  const handleError = (error) => {
    setError(error.errors.error)
  }
  return (
    <div className="container p-5">
      <SearchForm onSearch={handleSearch} onError={handleError} />
      <div>
        {error && <div className="alert alert-danger mt-5" role="alert">{error}</div>}
        {rechercheTrajets && <h2 className='mb-3'>Trajets</h2>}
        {rechercheTrajets && <TrajetList
          onError={handleError}
          trajets={rechercheTrajets}
          onRegister={onRegister}
          isTrajetPage={true}
          onDelete={onDelete} />}
      </div>
    </div>
  )
}

Trajets.propTypes = {
  trajets: PropTypes.array
}