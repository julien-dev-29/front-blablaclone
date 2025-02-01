import React, { useState } from 'react'
import Button from '../../ui/Button'
import { useTrajetsConducteur } from '../../hooks/trajetsConducteur'
import { apiFetch } from '../../utils/api'

export const CreateTrajet = () => {
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const { addTrajetConducteur } = useTrajetsConducteur()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)
        const formData = new FormData(e.target)
        const trajet = {
            'idPers': parseInt(localStorage.getItem('userId')),
            "villeD": formData.get('villeD'),
            "villeA": formData.get('villeA'),
            'date': formData.get('date'),
            'kms': formData.get('kms')
        }
        try {
            console.log('yolo')
            const message = await apiFetch('/insertTrajet', {
                method: 'POST',
                body: JSON.stringify(trajet)
            })
            const messageData = await message.json()
            setMessage(messageData.message)
        } catch (error) {
            console.log(error.errors.error)
            setMessage(error.errors.error)
        }
    }
    return (
        <div className="container p-5">
            <div>
                <h1>Publier Un Trajet</h1>
                {message && <div className='alert alert-info'>{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Ville de départ</label>
                                <input type="text" className="form-control" id="villeD" required name='villeD' placeholder="" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Ville d'arrivée</label>
                                <input type="text" className="form-control" id="villeA" required name='villeA' placeholder="" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Date</label>
                                <input type="date" className="form-control" id="date" required name='date' placeholder="name@example.com" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="mb-3">
                                <label className="form-label">Heure</label>
                                <input type="time" className="form-control" id="heure" required name='heure' placeholder="name@example.com" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="mb-3">
                                <label className="form-label">Distance</label>
                                <input type="number" className="form-control" id="kms" required name='kms' placeholder="" />
                            </div>
                        </div>
                    </div>
                    <Button type='submit'>Publier</Button>
                </form>
            </div>
        </div>
    )
}