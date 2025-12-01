import { createContext, useState, useContext, useRef } from "react";

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast debe usarse dentro de un ToastProvider");
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toastConfig, setToastConfig] = useState({ 
        message: '', 
        type: 'info', 
        show: false 
    });

    const[rendering, setRendering] = useState(false);

    const timerRef = useRef(null);

    const showToast = (message, type = 'info') => {
        setToastConfig({ message, type, show: false });
        setRendering(true);

        if (timerRef.current) clearTimeout(timerRef.current);
        
        setTimeout(() => {
            setToastConfig(prev => ({ ...prev, show: true}));
        },50);

        timerRef.current = setTimeout(() => {
            hideToast();
        }, 3000);
    };

    const hideToast = () => {
        setToastConfig(prev => ({ ...prev, show: true}))

        setTimeout(() => {
            setRendering(false);
        }, 500);
    };

    const getToastStyles = (type) => {
        switch(type) {
            case 'success': 
                return { bg: 'bg-success', icon: 'bi-check-circle-fill', title: '¡Éxito!' };
            case 'error': 
                return { bg: 'bg-danger', icon: 'bi-exclamation-triangle-fill', title: 'Error' };
            case 'warning': 
                return { bg: 'bg-warning text-dark', icon: 'bi-exclamation-circle-fill', title: 'Atención' };
            default: 
                return { bg: 'bg-primary', icon: 'bi-info-circle-fill', title: 'Información' };
        }
    };

    const styles = getToastStyles(toastConfig.type);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {rendering && (
                <div 
                    className="toast-container position-fixed top-0 end-0 p-3" 
                    style={{ zIndex: 1055}}
                >
                    <div className={`toast fade d-block ${toastConfig.show ? 'show' : ''}`} 
                        role="alert" 
                        aria-live="assertive" 
                        aria-atomic="true">
                        <div className="toast-header bg-dark text-white">
                            <i className={`bi ${styles.icon} me-2`}></i>
                            <strong className="me-auto">{styles.title}</strong>
                            <button type="button" className="btn-close btn-close-white" onClick={hideToast}></button>
                        </div>
                        <div className="toast-body bg-primary">
                            {toastConfig.message}
                        </div>
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
}