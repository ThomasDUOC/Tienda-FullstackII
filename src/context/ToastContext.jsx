import { createContext, useState, useContext, useRef, use } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({show: false, message: ''});

    const [show, setShow] = useState(false);

    const[rendering, setRendering] = useState(false);

    const timerRef = useRef(null);

    const showToast = (message) => {
        setToast({ message})

        setRendering(true);

        if (timerRef.current) clearTimeout(timerRef.current);
        
        setTimeout(() => {
            setShow(true);
        },50);

        timerRef.current = setTimeout(() => {
            hideToast();
        }, 3000);
    };

    const hideToast = () => {
        setShow(false);

        setTimeout(() => {
            setRendering(false);
        }, 500);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {rendering && (
                <div 
                    className="toast-container position-fixed top-0 end-0 p-3" 
                    style={{ zIndex: 1055}}
                >
                    <div className={`toast fade d-block ${show ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header bg-dark text-white">
                            <i className="bi bi-cart-check-fill me-2"></i>
                            <strong className="me-auto">¡Revisa tu carrito!</strong>
                            <button type="button" className="btn-close btn-close-white" onClick={hideToast}></button>
                        </div>
                        <div className="toast-body bg-primary">
                            {toast.message}
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}