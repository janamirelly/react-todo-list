import './fab-button.style.css'

export function FabButton({ children, onClick }) {
    return (
        <button className='fab' onClick={onClick}>
            {children}
        </button>
    )
}