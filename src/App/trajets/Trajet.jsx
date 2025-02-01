import React, { useState } from 'react'
import Button from '../../ui/Button'

export const Trajet = ({ trajet, onDelete, onRegister, onMessage, isTrajetPage, isMesTrajetsPage, onError }) => {
    const [loading, setLoading] = useState(false)
    const handleDelete = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const message = await onDelete(trajet)
            const messageData = await message.json()
            onMessage(messageData)
        } catch (error) {
            console.log(error)
        }

        setLoading(false)
    }
    const handleRegister = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await onRegister(trajet)
        } catch (error) {
            console.log(error)
            onError(error)
        }
        setLoading(false)
    }

    return (
        <div className="card shadow-sm w-75 mb-5">
            <div className="card-body">
                <h3 className="card-title">{trajet.villeD}-{trajet.villeA}</h3>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                {isMesTrajetsPage && <Button onClick={handleDelete} disabled={loading} loading={loading} type='danger' >Supprimer</Button>}
                {isTrajetPage && <Button onClick={handleRegister} disabled={loading} loading={loading} type="primary">S'inscrire</Button>}
            </div>
        </div>
    )
}