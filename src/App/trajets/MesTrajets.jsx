import React, { useState } from 'react'
import { TrajetList } from './TrajetList'
import { Loader } from '../../ui/Loader'

export const MesTrajets = ({ trajetsPassager, trajetsConducteur, message, error, onDeleteTrajetPassager, onDeleteTrajetConducteur }) => {
  return (
    <div>
      <div className="container p-5">
        {message && <div className='alert alert-info'>{message}</div>}
        {error && <div className='alert alert-danger'>{error}</div>}
        <h2>Mes Trajets Conducteur</h2>
        {trajetsConducteur === null ? <Loader /> : <TrajetList isMesTrajetsPage={true} trajets={trajetsConducteur} onDelete={onDeleteTrajetConducteur} />}
        <h2>Mes Trajets Passager</h2>
        {trajetsPassager === null ? <Loader /> : <TrajetList isMesTrajetsPage={true} trajets={trajetsPassager} onDelete={onDeleteTrajetPassager} />}
      </div>
    </div>
  )
}