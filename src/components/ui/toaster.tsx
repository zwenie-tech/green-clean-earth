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
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 w-[600px] h-[200] flex flex-col items-center justify-center"
        >
          <div className="text-center">
            {title && <ToastTitle className="font-bold text-lg">{title}</ToastTitle>}
            {description && (
              <ToastDescription className="text-sm text-gray-600 dark:text-gray-300">
                {description}
              </ToastDescription>
            )}
          </div>
          {action}
          <ToastClose />

          {/* "Ok" button at the bottom center */}
          <button
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            onClick={() => dismiss(id)} // Dismiss the toast by ID
          >
            OK
          </button>
        </Toast>
      ))}

      {/* ToastViewport for positioning */}
      <ToastViewport className="fixed inset-0 flex items-center justify-center" />
    </ToastProvider>
  )
}