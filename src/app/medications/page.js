'use client'

import { useState, useEffect } from 'react'
import { useDataSync } from '@/lib/useDataSync'
import ConfirmationModal from '@/components/ConfirmationModal'
import SyncSettings from '@/components/SyncSettings'

export default function MedicationsPage() {
  const { data: medications, setData: setMedications, deleteData: deleteMedication, syncEnabled, setSyncEnabled, isOnline, isSyncing, syncToCloud, fetchFromCloud } = useDataSync('flarecare-medications', [])
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    timeOfDay: 'morning',
    notes: ''
  })

  const timeOptions = [
    { value: 'morning', label: 'Morning' },
    { value: 'afternoon', label: 'Afternoon' },
    { value: 'evening', label: 'Evening' },
    { value: 'night', label: 'Night' },
    { value: 'as-needed', label: 'As Needed' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      alert('Please enter a medication name.')
      return
    }

    if (editingId) {
      // Update existing medication
      setMedications(medications.map(med => 
        med.id === editingId 
          ? { ...med, ...formData, updatedAt: new Date().toISOString() }
          : med
      ))
      setEditingId(null)
    } else {
      // Add new medication
      const newMedication = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      setMedications([...medications, newMedication])
    }

    setFormData({
      name: '',
      dosage: '',
      timeOfDay: 'morning',
      notes: ''
    })
    setIsAdding(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const startEdit = (medication) => {
    setFormData({
      name: medication.name,
      dosage: medication.dosage,
      timeOfDay: medication.timeOfDay,
      notes: medication.notes || ''
    })
    setEditingId(medication.id)
    setIsAdding(true)
  }

  const cancelEdit = () => {
    setFormData({
      name: '',
      dosage: '',
      timeOfDay: 'morning',
      notes: ''
    })
    setEditingId(null)
    setIsAdding(false)
  }

  const handleDeleteMedication = (id) => {
    setDeleteModal({ isOpen: true, id })
  }

  const confirmDelete = async () => {
    if (deleteModal.id) {
      await deleteMedication(deleteModal.id)
    }
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null })
  }

  const getTimeOfDayColor = (timeOfDay) => {
    const colors = {
      morning: 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300',
      afternoon: 'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border border-orange-300',
      evening: 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300',
      night: 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300',
      'as-needed': 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-800 border border-neutral-300'
    }
    return colors[timeOfDay] || 'bg-gradient-to-r from-neutral-100 to-neutral-200 text-neutral-800 border border-neutral-300'
  }

  const getTimeOfDayLabel = (timeOfDay) => {
    const option = timeOptions.find(opt => opt.value === timeOfDay)
    return option ? option.label : timeOfDay
  }

  // Check for medication reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentTimeOfDay = 
        currentHour >= 5 && currentHour < 12 ? 'morning' :
        currentHour >= 12 && currentHour < 17 ? 'afternoon' :
        currentHour >= 17 && currentHour < 22 ? 'evening' : 'night'

      const dueMedications = medications.filter(med => 
        med.timeOfDay === currentTimeOfDay || med.timeOfDay === 'as-needed'
      )

      if (dueMedications.length > 0) {
        const medicationNames = dueMedications.map(med => med.name).join(', ')
        // Simple alert for now - in a real app, you'd want a better notification system
        console.log(`Reminder: Time to take ${medicationNames}`)
      }
    }

    // Check every hour
    const interval = setInterval(checkReminders, 60 * 60 * 1000)
    checkReminders() // Check immediately

    return () => clearInterval(interval)
  }, [medications])

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-shadow">Medications</h1>
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
              Manage your medication schedule and track adherence. Set up reminders to help you stay on track.
            </p>
          </div>
          <div className="sm:ml-4">
            <SyncSettings 
              syncEnabled={syncEnabled}
              setSyncEnabled={setSyncEnabled}
              isOnline={isOnline}
              isSyncing={isSyncing}
              syncToCloud={syncToCloud}
              fetchFromCloud={fetchFromCloud}
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Medication Form */}
      {isAdding && (
        <div className="card mb-8 animate-scale-in">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold gradient-text">
            {editingId ? 'Edit Medication' : 'Add New Medication'}
            </h2>
            <button
              onClick={cancelEdit}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-3">
                  Medication Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Mesalamine, Prednisone"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label htmlFor="dosage" className="block text-sm font-semibold text-neutral-700 mb-3">
                  Dosage
                </label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="e.g., 500mg, 2 tablets"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label htmlFor="timeOfDay" className="block text-sm font-semibold text-neutral-700 mb-3">
                Time of Day
              </label>
              <select
                id="timeOfDay"
                name="timeOfDay"
                value={formData.timeOfDay}
                onChange={handleInputChange}
                className="input-field"
              >
                {timeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-neutral-700 mb-3">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any special instructions, side effects to watch for, etc."
                className="input-field resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Medication' : 'Add Medication'}
              </button>
              <button type="button" onClick={cancelEdit} className="btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Medications List */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
          <h2 className="text-2xl font-bold gradient-text mb-4 sm:mb-0">Your Medications</h2>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="btn-primary whitespace-nowrap inline-flex items-center space-x-2 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>
              Add Medication
              </span>
            </button>
          )}
        </div>

        {medications.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <div className="relative mb-6">
              <svg className="w-16 h-16 mx-auto text-neutral-300 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">No medications added yet</h3>
            <p className="text-neutral-500 mb-6">Start managing your medication schedule to stay on track with your treatment.</p>
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="btn-primary"
              >
                Add Your First Medication
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {medications.map((medication) => (
              <div key={medication.id} className="relative bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] group animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:gradient-text transition-all duration-300">
                      {medication.name}
                    </h3>
                    {medication.dosage && (
                        <p className="text-sm text-neutral-600 mb-3 bg-white/50 px-3 py-1 rounded-lg inline-block">
                          <span className="font-semibold text-primary-600">Dosage:</span> {medication.dosage}
                      </p>
                    )}
                      <span className={`time-badge ${getTimeOfDayColor(medication.timeOfDay)}`}>
                      {getTimeOfDayLabel(medication.timeOfDay)}
                    </span>
                  </div>
                    <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => startEdit(medication)}
                        className="text-blue-500 hover:text-blue-700 p-2 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Edit medication"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteMedication(medication.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                      title="Delete medication"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {medication.notes && (
                    <div className="mt-4 p-4 bg-white/50 rounded-xl">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="font-semibold text-secondary-600">Notes:</span> {medication.notes}
                    </p>
                  </div>
                )}

                  <div className="mt-4 pt-4 border-t border-white/30 text-xs text-neutral-500">
                  Added {new Date(medication.createdAt).toLocaleDateString()}
                  {medication.updatedAt && medication.updatedAt !== medication.createdAt && (
                    <span> • Updated {new Date(medication.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reminder Info */}
      <div className="mt-8 relative overflow-hidden bg-gradient-to-br from-blue-50/80 to-primary-50/80 backdrop-blur-sm border border-white/30 rounded-2xl p-6 animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-blue-500/10"></div>
        <div className="relative z-10">
        <div className="flex items-start">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 animate-pulse-slow">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
            </div>
          <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Medication Reminders</h3>
              <p className="text-sm text-blue-700 leading-relaxed">
              FlareCare will remind you when it's time to take your medications based on the time of day you've set. 
              Check the browser console for reminder notifications.
            </p>
          </div>
        </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Medication"
        message="Are you sure you want to delete this medication? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  )
}
