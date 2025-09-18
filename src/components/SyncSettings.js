'use client'

import { useState } from 'react'

export default function SyncSettings({ 
  syncEnabled, 
  setSyncEnabled, 
  isOnline, 
  isSyncing, 
  syncToCloud, 
  fetchFromCloud 
}) {
  const [showSettings, setShowSettings] = useState(false)

  const handleSyncToggle = (enabled) => {
    if (enabled && !isOnline) {
      alert('You need to be online to enable cloud sync.')
      return
    }
    setSyncEnabled(enabled)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowSettings(!showSettings)}
        className="flex items-center space-x-2 text-sm bg-white/80 hover:bg-white/90 text-neutral-700 hover:text-neutral-900 px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-white/30 transition-all duration-300 whitespace-nowrap group"
      >
        <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span className="font-medium">Sync Settings</span>
        {isSyncing && (
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
        )}
      </button>

      {showSettings && (
        <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-6 z-50 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
              </div>
              <h3 className="text-lg font-bold gradient-text">Cloud Sync</h3>
            </div>
            <button
              onClick={() => setShowSettings(false)}
              className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 p-1 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            {/* Sync Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Enable Cloud Sync</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Sync your data across devices and keep it backed up
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncEnabled}
                  onChange={(e) => handleSyncToggle(e.target.checked)}
                  disabled={!isOnline}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary-500 peer-checked:to-primary-600"></div>
              </label>
            </div>

            {/* Status */}
            <div className="flex items-center space-x-3 text-sm p-3 bg-white/50 rounded-xl">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-accent-500 animate-pulse' : 'bg-red-500'}`}></div>
              <span className={`font-medium ${isOnline ? 'text-accent-700' : 'text-red-700'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              {isSyncing && (
                <>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span className="text-primary-700 font-medium">Syncing...</span>
                </>
              )}
            </div>

            {/* Sync Actions */}
            {syncEnabled && isOnline && (
              <div className="space-y-3">
                <button
                  onClick={syncToCloud}
                  disabled={isSyncing}
                  className="w-full btn-secondary text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSyncing ? 'Syncing...' : 'Sync to Cloud'}
                </button>
                <button
                  onClick={fetchFromCloud}
                  disabled={isSyncing}
                  className="w-full btn-secondary text-sm py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSyncing ? 'Syncing...' : 'Fetch from Cloud'}
                </button>
              </div>
            )}

            {/* Info */}
            <div className="text-xs text-neutral-600 bg-gradient-to-br from-neutral-50/80 to-white/80 p-4 rounded-xl border border-white/30">
              <p className="font-semibold mb-2 text-neutral-700">How it works:</p>
              <ul className="space-y-1.5">
                <li>• Your data is stored locally by default</li>
                <li>• Enable sync to backup and access across devices</li>
                <li>• Data is encrypted and only you can access it</li>
                <li>• Works offline - syncs when you're back online</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
