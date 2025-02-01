import React, { useState } from 'react'
import { TrajetList } from './TrajetList'
import { Loader } from '../../ui/Loader'

export const MesTrajets = ({ trajetsPassager, deleteTrajetPassager, trajetsConducteur, onDeleteTrajetConducteur }) => {
  const [message, setMessage] = useState(null)

  const handleMessage = (message) => {
    setMessage(message)
  }
  return (
    <div>
      <div className="container p-5">
        {message && <div className='alert alert-info'>{message}</div>}
        <h2>Mes Trajets Conducteur</h2>
        {trajetsConducteur === null ? <Loader /> : <TrajetList isMesTrajetsPage={true} trajets={trajetsConducteur} onMessage={handleMessage} onDelete={onDeleteTrajetConducteur} />}
        <h2>Mes Trajets Passager</h2>
        {trajetsPassager === null ? <Loader /> : <TrajetList isMesTrajetsPage={true} trajets={trajetsPassager} onDelete={deleteTrajetPassager} />}
      </div>
    </div>
  )
}