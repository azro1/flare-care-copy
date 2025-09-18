'use client'

import { useState, useEffect } from 'react'
import { useDataSync } from '@/lib/useDataSync'
import jsPDF from 'jspdf'

export default function ReportsPage() {
  const { data: symptoms } = useDataSync('flarecare-symptoms', [])
  const { data: medications } = useDataSync('flarecare-medications', [])
  const [reportData, setReportData] = useState(null)
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
    endDate: new Date().toISOString().split('T')[0] // today
  })

  useEffect(() => {
    generateReport()
  }, [symptoms, medications, dateRange])

  const generateReport = () => {
    // Filter symptoms by selected date range
    const startDate = new Date(dateRange.startDate)
    const endDate = new Date(dateRange.endDate)
    
    const allSymptoms = symptoms.filter(symptom => {
      const symptomStartDate = new Date(symptom.symptomStartDate)
      const symptomEndDate = symptom.symptomEndDate ? new Date(symptom.symptomEndDate) : new Date()
      
      // Check if symptom period overlaps with selected date range
      return (symptomStartDate <= endDate && symptomEndDate >= startDate)
    })

    // Calculate average severity
    const averageSeverity = allSymptoms.length > 0 
      ? (allSymptoms.reduce((sum, symptom) => sum + symptom.severity, 0) / allSymptoms.length).toFixed(1)
      : 0

    // Get all foods logged
    const allFoods = allSymptoms
      .filter(symptom => symptom.foods && symptom.foods.trim())
      .map(symptom => symptom.foods.split(',').map(food => food.trim()))
      .flat()
      .filter(food => food.length > 0)

    // Count food frequency
    const foodFrequency = allFoods.reduce((acc, food) => {
      acc[food] = (acc[food] || 0) + 1
      return acc
    }, {})

    // Sort foods by frequency
    const topFoods = Object.entries(foodFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)

    // Get symptom trends (sorted by start date)
    const severityTrend = allSymptoms
      .sort((a, b) => new Date(a.symptomStartDate) - new Date(b.symptomStartDate))
      .map(symptom => ({
        date: symptom.symptomStartDate,
        severity: symptom.severity,
        isOngoing: symptom.isOngoing,
        endDate: symptom.symptomEndDate
      }))

    // Use the selected date range for the report period
    const reportStartDate = new Date(dateRange.startDate)
    const reportEndDate = new Date(dateRange.endDate)

    setReportData({
      period: {
        start: reportStartDate.toISOString().split('T')[0],
        end: reportEndDate.toISOString().split('T')[0]
      },
      averageSeverity: parseFloat(averageSeverity),
      totalEntries: allSymptoms.length,
      topFoods,
      severityTrend,
      medications: medications.map(med => ({
        name: med.name,
        dosage: med.dosage,
        timeOfDay: med.timeOfDay
      }))
    })
  }

  const exportToPDF = () => {
    if (!reportData) return

    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let yPosition = 20

    // Title
    doc.setFontSize(20)
    doc.setFont('helvetica', 'bold')
    doc.text('FlareCare Health Report', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    // Period
    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Report Period: ${reportData.period.start} to ${reportData.period.end}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 20

    // Summary Section
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('Summary', margin, yPosition)
    yPosition += 10

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text(`Total Symptom Entries: ${reportData.totalEntries}`, margin, yPosition)
    yPosition += 8
    doc.text(`Average Severity (1-10): ${reportData.averageSeverity}`, margin, yPosition)
    yPosition += 8
    doc.text(`Medications Tracked: ${reportData.medications.length}`, margin, yPosition)
    yPosition += 15

    // Medications Section
    if (reportData.medications.length > 0) {
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('Current Medications', margin, yPosition)
      yPosition += 10

      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      reportData.medications.forEach(med => {
        doc.text(`• ${med.name}${med.dosage ? ` (${med.dosage})` : ''} - ${med.timeOfDay}`, margin, yPosition)
        yPosition += 6
      })
      yPosition += 10
    }

    // Top Foods Section
    if (reportData.topFoods.length > 0) {
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.text('Most Logged Foods', margin, yPosition)
      yPosition += 10

      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      reportData.topFoods.forEach(([food, count]) => {
        doc.text(`• ${food} (${count} times)`, margin, yPosition)
        yPosition += 6
      })
    }

    // Save the PDF
    doc.save(`flarecare-report-${dateRange.startDate}-to-${dateRange.endDate}.pdf`)
  }

  const exportToCSV = () => {
    if (!reportData) return

    const csvData = []
    
    // Add header
    csvData.push(['Symptom Start Date', 'Symptom End Date', 'Ongoing', 'Severity', 'Notes', 'Foods'])
    
    // Filter symptoms by selected date range (same logic as generateReport)
    const startDate = new Date(dateRange.startDate)
    const endDate = new Date(dateRange.endDate)
    
    const filteredSymptoms = symptoms.filter(symptom => {
      const symptomStartDate = new Date(symptom.symptomStartDate)
      const symptomEndDate = symptom.symptomEndDate ? new Date(symptom.symptomEndDate) : new Date()
      return (symptomStartDate <= endDate && symptomEndDate >= startDate)
    })
    
    // Add symptom data
    filteredSymptoms
      .sort((a, b) => new Date(a.symptomStartDate) - new Date(b.symptomStartDate))
      .forEach(symptom => {
        csvData.push([
          symptom.symptomStartDate,
          symptom.symptomEndDate || '',
          symptom.isOngoing ? 'Yes' : 'No',
          symptom.severity,
          symptom.notes || '',
          symptom.foods || ''
        ])
      })

    // Convert to CSV string
    const csvString = csvData.map(row => 
      row.map(field => `"${field.toString().replace(/"/g, '""')}"`).join(',')
    ).join('\n')

    // Download CSV
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `flarecare-data-${dateRange.startDate}-to-${dateRange.endDate}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getSeverityColor = (severity) => {
    if (severity <= 3) return 'text-green-600 bg-green-100'
    if (severity <= 6) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getSeverityLabel = (severity) => {
    if (severity <= 2) return 'Very Mild'
    if (severity <= 4) return 'Mild'
    if (severity <= 6) return 'Moderate'
    if (severity <= 8) return 'Severe'
    return 'Very Severe'
  }

  if (!reportData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating report...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4 text-shadow">Health Reports</h1>
        <p className="text-lg text-neutral-600 max-w-2xl leading-relaxed">
          Generate detailed reports of your health data to share with your healthcare team.
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="card mb-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold gradient-text mb-8">Select Report Period</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold text-neutral-700 mb-3">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold text-neutral-700 mb-3">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              className="input-field"
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="text-sm text-neutral-600 mb-4 sm:mb-0 bg-white/50 px-4 py-2 rounded-lg">
            Showing symptoms from {new Date(dateRange.startDate).toLocaleDateString()} to {new Date(dateRange.endDate).toLocaleDateString()}
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button onClick={exportToPDF} className="btn-primary whitespace-nowrap inline-flex items-center space-x-2 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>
              Export PDF
              </span>
            </button>
            <button onClick={exportToCSV} className="btn-secondary whitespace-nowrap inline-flex items-center space-x-2 group">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>
              Export CSV
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Report Results */}
      <div className="card mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gradient-text">Symptom Report</h2>
        </div>
        
        {reportData.totalEntries > 0 && (
          <div className="text-sm text-neutral-600 mb-8 bg-white/50 px-4 py-2 rounded-lg inline-block">
            Found {reportData.totalEntries} symptom {reportData.totalEntries === 1 ? 'episode' : 'episodes'} in the selected period
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-gradient-to-br from-primary-50/80 to-primary-100/80 rounded-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold gradient-text mb-3">
              {reportData.totalEntries}
            </div>
            <div className="text-sm font-semibold text-neutral-600">Symptom Episodes</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-secondary-50/80 to-secondary-100/80 rounded-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold gradient-text mb-3">
              {reportData.averageSeverity}
            </div>
            <div className="text-sm font-semibold text-neutral-600">Average Severity</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-accent-50/80 to-accent-100/80 rounded-2xl border border-white/30 hover:scale-105 transition-transform duration-300">
            <div className="text-4xl font-bold gradient-text mb-3">
              {reportData.medications.length}
            </div>
            <div className="text-sm font-semibold text-neutral-600">Medications</div>
          </div>
        </div>

        {/* Severity Trend */}
        {reportData.severityTrend.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-neutral-900 mb-6">Symptom Episodes</h3>
            <div className="space-y-4">
              {reportData.severityTrend.map((entry, index) => (
                <div key={index} className="flex items-center space-x-6 p-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                  <div className="w-40 text-sm font-medium text-neutral-700 bg-white/80 px-3 py-2 rounded-lg">
                    {new Date(entry.date).toLocaleDateString()}
                    {entry.isOngoing ? ' (Ongoing)' : ` - ${new Date(entry.endDate).toLocaleDateString()}`}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 bg-neutral-200 rounded-full h-3 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${(entry.severity / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`severity-indicator ${getSeverityColor(entry.severity)}`}>
                        {entry.severity}/10
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Medications */}
      {reportData.medications.length > 0 && (
        <div className="card mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-bold gradient-text mb-6">Current Medications</h3>
          <div className="space-y-4">
            {reportData.medications.map((med, index) => (
              <div key={index} className="flex justify-between items-center py-4 px-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300 last:border-b-0">
                <div>
                  <span className="font-bold text-neutral-900">{med.name}</span>
                  {med.dosage && (
                    <span className="text-neutral-600 ml-3 bg-white/80 px-2 py-1 rounded text-sm">({med.dosage})</span>
                  )}
                </div>
                <span className="text-sm font-medium text-neutral-600 bg-primary-100 px-3 py-1 rounded-full capitalize">{med.timeOfDay}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Top Foods */}
      {reportData.topFoods.length > 0 && (
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-bold gradient-text mb-6">Most Logged Foods</h3>
          <div className="space-y-3">
            {reportData.topFoods.map(([food, count], index) => (
              <div key={index} className="flex justify-between items-center py-3 px-4 bg-white/50 rounded-xl hover:bg-white/70 transition-all duration-300">
                <span className="font-semibold text-neutral-900">{food}</span>
                <span className="text-sm font-medium text-neutral-600 bg-accent-100 px-3 py-1 rounded-full">{count} time{count !== 1 ? 's' : ''}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Data Message */}
      {reportData.totalEntries === 0 && reportData.medications.length === 0 && (
        <div className="card text-center py-16 animate-fade-in-up">
          <div className="relative mb-8">
            <svg className="w-20 h-20 mx-auto text-neutral-300 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          </div>
          <h3 className="text-2xl font-bold text-neutral-900 mb-4">No Data Available</h3>
          <p className="text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
            Start logging symptoms and adding medications to generate meaningful reports.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="/symptoms" className="btn-primary whitespace-nowrap inline-flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Log Symptoms</span>
            </a>
            <a href="/medications" className="btn-secondary whitespace-nowrap inline-flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              <span>Add Medications</span>
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
