import { createContext, useContext } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    return useContext(ToastContext);
};

export const toast = (message: string) => {
    const context = useContext(ToastContext);
    if (context) {
        context(message);
    } else {
        console.warn('ToastContext is not available');
    }
};

// You can add more functionality as needed 