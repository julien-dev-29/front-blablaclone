export function Alert({ children }) {
    return (
        <div className="alert alert-danger mt-2" role="alert">
            {children}
        </div>
    )
}