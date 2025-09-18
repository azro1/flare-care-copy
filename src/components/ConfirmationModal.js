'use client'

import { useState, useEffect } from 'react'

export default function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Delete", 
  cancelText = "Cancel",
  isDestructive = true 
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scale-in border border-white/30">
        <div className="p-8">
          <div className="flex items-center mb-6">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              isDestructive ? 'bg-gradient-to-br from-red-100 to-red-200' : 'bg-gradient-to-br from-blue-100 to-blue-200'
            }`}>
              <svg 
                className={`w-6 h-6 ${isDestructive ? 'text-red-600' : 'text-blue-600'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isDestructive 
                    ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    : "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900">
              {title}
            </h3>
          </div>
          
          <p className="text-neutral-600 mb-8 leading-relaxed">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-neutral-700 bg-white/80 hover:bg-white/90 border border-neutral-200 hover:border-neutral-300 rounded-xl transition-all duration-300 hover:scale-105"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`px-6 py-3 text-sm font-medium text-white rounded-xl transition-all duration-300 hover:scale-105 ${
                isDestructive 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
