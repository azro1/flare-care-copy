'use client'

import { useState, useEffect } from 'react'
import { useDataSync } from '@/lib/useDataSync'
import ConfirmationModal from '@/components/ConfirmationModal'
import SyncSettings from '@/components/SyncSettings'

export default function SymptomsPage() {
  const { data: symptoms, setData: setSymptoms, deleteData: deleteSymptom, syncEnabled, setSyncEnabled, isOnline, isSyncing, syncToCloud, fetchFromCloud } = useDataSync('flarecare-symptoms', [])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [formData, setFormData] = useState({
    symptomStartDate: new Date().toISOString().split('T')[0],
    isOngoing: true,
    symptomEndDate: '',
    severity: 5,
    notes: '',
    foods: ''
  })
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.notes.trim() && !formData.foods.trim()) {
      alert('Please add some notes or foods to log this entry.')
      return
    }

    if (!formData.isOngoing && !formData.symptomEndDate) {
      alert('Please specify when symptoms ended.')
      return
    }

    const newSymptom = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    }

    setSymptoms([newSymptom, ...symptoms])
    setFormData({
      symptomStartDate: new Date().toISOString().split('T')[0],
      isOngoing: true,
      symptomEndDate: '',
      severity: 5,
      notes: '',
      foods: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'radio' ? value === 'true' : value)
    }))
  }

  const handleDeleteSymptom = (id) => {
    setDeleteModal({ isOpen: true, id })
  }

  const confirmDelete = async () => {
    if (deleteModal.id) {
      await deleteSymptom(deleteModal.id)
    }
  }

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: null })
  }

  const getSeverityColor = (severity) => {
    if (severity <= 3) return 'severity-low'
    if (severity <= 6) return 'severity-medium'
    return 'severity-high'
  }

  const getSeverityLabel = (severity) => {
    if (severity <= 2) return 'Very Mild'
    if (severity <= 4) return 'Mild'
    if (severity <= 6) return 'Moderate'
    if (severity <= 8) return 'Severe'
    return 'Very Severe'
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-shadow">Symptoms</h1>
            <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
              Track your daily symptoms to identify patterns and triggers. Your data is stored locally on your device.
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

      {/* Symptom Logging Form */}
      <div className="mb-8">
        {!isFormVisible && (
          <div className="text-center animate-fade-in">
            <button
              onClick={() => setIsFormVisible(true)}
              className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New Symptom Entry</span>
            </button>
          </div>
        )}
        
        {isFormVisible && (
          <div className="card mb-8 animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold gradient-text">Add New Entry</h2>
              <button
                onClick={() => setIsFormVisible(false)}
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
                  <label htmlFor="symptomStartDate" className="block text-sm font-semibold text-neutral-700 mb-3">
                  When did symptoms begin?
                </label>
                <input
                  type="date"
                  id="symptomStartDate"
                  name="symptomStartDate"
                  value={formData.symptomStartDate}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-3">
                  Are symptoms still ongoing?
                </label>
                  <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isOngoing"
                      value="true"
                      checked={formData.isOngoing === true}
                      onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                      <span className="font-medium">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="isOngoing"
                      value="false"
                      checked={formData.isOngoing === false}
                      onChange={handleInputChange}
                        className="mr-3 w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                      <span className="font-medium">No</span>
                  </label>
                </div>
              </div>
            </div>

          {!formData.isOngoing && (
            <div>
                <label htmlFor="symptomEndDate" className="block text-sm font-semibold text-neutral-700 mb-3">
                When did symptoms end?
              </label>
              <input
                type="date"
                id="symptomEndDate"
                name="symptomEndDate"
                value={formData.symptomEndDate}
                onChange={handleInputChange}
                className="input-field"
                required={!formData.isOngoing}
              />
            </div>
          )}

          <div>
              <label htmlFor="severity" className="block text-sm font-semibold text-neutral-700 mb-3">
              Current Severity: {formData.severity}/10 ({getSeverityLabel(formData.severity)})
            </label>
            <input
              type="range"
              id="severity"
              name="severity"
              min="1"
              max="10"
              value={formData.severity}
              onChange={handleInputChange}
              className="slider"
            />
              <div className="flex justify-between text-xs text-neutral-500 mt-2">
              <span>1 (Very Mild)</span>
              <span>10 (Very Severe)</span>
            </div>
          </div>

          <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-neutral-700 mb-3">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Describe your symptoms, how you're feeling, any triggers you noticed..."
              className="input-field resize-none"
            />
          </div>

          <div>
              <label htmlFor="foods" className="block text-sm font-semibold text-neutral-700 mb-3">
              Foods Eaten
            </label>
            <input
              type="text"
              id="foods"
              name="foods"
              value={formData.foods}
              onChange={handleInputChange}
              placeholder="List foods you ate today (comma-separated)"
              className="input-field"
            />
          </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn-primary flex-1 md:flex-none">
                Log Symptom Entry
              </button>
              <button type="button" onClick={() => setIsFormVisible(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
        </form>
      </div>
        )}
      </div>

      {/* Symptoms List */}
      <div className="card">
        <h2 className="text-2xl font-bold gradient-text mb-8">Recent Entries</h2>
        
        {symptoms.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            <div className="relative mb-6">
              <svg className="w-16 h-16 mx-auto text-neutral-300 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-700 mb-2">No symptom entries yet</h3>
            <p className="text-neutral-500 mb-6">Start tracking your symptoms to identify patterns and improve your health journey.</p>
            {!isFormVisible && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="btn-primary"
              >
                Add Your First Entry
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="relative bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm border border-white/30 rounded-2xl p-6 hover:shadow-card-hover transition-all duration-500 hover:scale-[1.02] group animate-fade-in-up">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-neutral-600 bg-white/80 px-3 py-1 rounded-full">
                      {new Date(symptom.symptomStartDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                      {symptom.isOngoing ? ' - Ongoing' : ` to ${new Date(symptom.symptomEndDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}`}
                    </span>
                      <span className={`severity-indicator ${getSeverityColor(symptom.severity)}`}>
                      {symptom.severity}/10 - {getSeverityLabel(symptom.severity)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteSymptom(symptom.id)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-all duration-300 hover:scale-110"
                    title="Delete entry"
                  >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                {symptom.notes && (
                    <div className="mb-4 p-4 bg-white/50 rounded-xl">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="font-semibold text-primary-600">Notes:</span> {symptom.notes}
                    </p>
                  </div>
                )}

                {symptom.foods && (
                    <div className="p-4 bg-accent-50/50 rounded-xl">
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        <span className="font-semibold text-accent-600">Foods:</span> {symptom.foods}
                    </p>
                  </div>
                )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Symptom Entry"
        message="Are you sure you want to delete this symptom entry? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  )
}