import React, { useEffect, useState } from 'react'
import { Trajets } from './trajets/Trajets'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer'
import { MesTrajets } from './trajets/MesTrajets'
import { useTrajets } from '../hooks/trajets'
import { CreateTrajet } from './trajets/CreateTrajet'
import { useTrajetsConducteur } from '../hooks/trajetsConducteur'
import { useTrajetsPassager } from '../hooks/trajetsPassager'
import { register } from '../utils/api'
import { Admin } from './Admin'


export default Site = () => {
    const [page, setPage] = useState('trajets')
    const { fetchTrajets, deleteTrajet } = useTrajets()
    const { trajetsConducteur, fetchTrajetConducteur, deleteTrajetConducteur } = useTrajetsConducteur()
    const { trajetsPassager, fetchTrajetPassager, deleteTrajetPassager } = useTrajetsPassager()

    var content = null
    // Render content based on page
    switch (page) {
        case 'admin':
            content = <Admin />
            break
        case 'trajets':
            content = <Trajets
                onDelete={deleteTrajet}
                onRegister={register} />
            break
        case 'mes-trajets':
            content = <MesTrajets
                trajetsPassager={trajetsPassager}
                onDeleteTrajetPassager={deleteTrajetPassager}
                trajetsConducteur={trajetsConducteur}
                onDeleteTrajetConducteur={deleteTrajetConducteur} />
            break
        case 'create-trajet':
            content = <CreateTrajet />
            break
    }

    useEffect(() => {
        // Fetch data when page changes
        switch (page) {
            case 'admin':
                break
            case 'trajets':
                //fetchTrajets()
                break
            case 'mes-trajets':
                fetchTrajetConducteur()
                fetchTrajetPassager()
                break
            case 'create-trajet':
                break
        }
    }, [page])

    return (
        <>
            <Header currentPage={page} onClick={setPage} />
            <div className="content">
                {content}
            </div>
            <Footer />
        </>
    )
}
