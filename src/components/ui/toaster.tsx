"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => (
        <Toast
          key={id}
          {...props}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 w-full max-w-[400px] flex flex-col items-center justify-center text-center"
        >
          {title && <ToastTitle className="font-bold text-lg">{title}</ToastTitle>}
          {description && (
            <ToastDescription className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {description}
            </ToastDescription>
          )}
          {action}
          <ToastClose />

          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => dismiss(id)}
          >
            OK
          </button>
        </Toast>
      ))}

      {/* ✅ Absolutely center the toast container */}
      <ToastViewport className="fixed inset-0 flex items-center justify-center pointer-events-none" />
    </ToastProvider>
  )
}
