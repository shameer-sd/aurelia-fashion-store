import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback(({ title, message, type = 'gold', duration = 3500 }) => {
        const id = Date.now() + Math.random().toString(36).substr(2, 9)
        const newToast = { id, title, message, type, duration }

        setToasts((prev) => [...prev, newToast])

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id)
            }, duration)
        }
    }, [])

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="pointer-events-none fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full px-4">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-[#c9ad7a]/30 bg-[#121110]/95 p-4 text-[#f8f4ec] shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-all duration-300 animate-float"
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9ad7a]/15 text-[#c9ad7a]">
                            {toast.type === 'success' || toast.type === 'gold' ? (
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            ) : toast.type === 'error' ? (
                                <svg viewBox="0 0 24 24" className="h-4 w-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="15" y1="9" x2="9" y2="15" />
                                    <line x1="9" y1="9" x2="15" y2="15" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            {toast.title && (
                                <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#c9ad7a]">
                                    {toast.title}
                                </p>
                            )}
                            {toast.message && (
                                <p className="mt-0.5 text-xs text-white/80 leading-relaxed font-light">
                                    {toast.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => removeToast(toast.id)}
                            className="shrink-0 text-white/40 hover:text-white transition-colors p-1"
                            aria-label="Close notification"
                        >
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    return useContext(ToastContext)
}
