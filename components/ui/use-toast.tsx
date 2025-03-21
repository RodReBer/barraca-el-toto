"use client"

import { useState } from "react"

type ToastType = {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toasts: ToastType[]
  toast: (props: Omit<ToastType, "id">) => void
  dismiss: (id: string) => void
}

// Implementación simple de useToast
export function useToast(): ToastContextType {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const toast = ({ title, description, variant = "default" }: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, variant };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    return { id, dismiss: () => {} };
  };

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toasts, toast, dismiss };
}
