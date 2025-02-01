import { Trajet } from './Trajet.jsx'

export const TrajetList = ({ trajets, onDelete, onRegister, isTrajetPage, onError, isMesTrajetsPage, onMessage }) => {
    return (
        <>
            {trajets.map(trajet => <Trajet onError={onError} key={trajet.id} trajet={trajet} onRegister={onRegister} onMessage={onMessage} isMesTrajetsPage={isMesTrajetsPage} isTrajetPage={isTrajetPage} onDelete={onDelete} />)}
        </>

    )
}