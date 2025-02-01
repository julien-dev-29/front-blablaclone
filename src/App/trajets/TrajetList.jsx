import { Trajet } from './Trajet.jsx'

export const TrajetList = ({ trajets, onDelete, onRegister, isTrajetPage, onError, isMesTrajetsPage, onMessage }) => {
    return (
        <>
            {Array.isArray(trajets) && trajets.length > 0 ? (
                trajets.map(trajet => (
                    <Trajet
                        onError={onError}
                        key={trajet.id}
                        trajet={trajet}
                        onRegister={onRegister}
                        onMessage={onMessage}
                        isMesTrajetsPage={isMesTrajetsPage}
                        isTrajetPage={isTrajetPage}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p>No trajets available</p>
            )}
        </>

    )
}