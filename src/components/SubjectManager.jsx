import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Plus, Edit2, Trash2, Save, X, FileText, Calendar } from 'lucide-react'
import { Preferences } from '@capacitor/preferences'
import { loadSubjects, saveSubjects } from '../utils/subjectStorage'
import AddSubjectModal from './AddSubjectModal'

function SubjectManager() {
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingSubject, setEditingSubject] = useState(null)
  const [noteCounts, setNoteCounts] = useState({})
  const [showSubjectForm, setShowSubjectForm] = useState(false)
  const [subjectName, setSubjectName] = useState('')

  useEffect(() => {
    loadSubjectsData()
  }, [])

  const loadSubjectsData = async () => {
    const data = await loadSubjects()
    setSubjects(data)
    // Load note counts for each subject
    const counts = {}
    for (const subject of data) {
      const { value } = await Preferences.get({ key: `notes_${subject.id}` })
      counts[subject.id] = value ? JSON.parse(value).length : 0
    }
    setNoteCounts(counts)
    setIsLoading(false)
  }

  const handleAddSubject = async (subjectData) => {
    const newSubject = {
      ...subjectData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    const updatedSubjects = [...subjects, newSubject]
    setSubjects(updatedSubjects)
    await saveSubjects(updatedSubjects)
    setNoteCounts({ ...noteCounts, [newSubject.id]: 0 })
    setShowAddModal(false)
    setShowSubjectForm(false)
    setSubjectName('')
  }

  const handleQuickAddSubject = async () => {
    if (subjectName.trim()) {
      const colorOptions = [
        { gradient: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50' },
        { gradient: 'from-blue-500 to-cyan-500', shadow: 'shadow-blue-500/50' },
        { gradient: 'from-green-500 to-teal-500', shadow: 'shadow-green-500/50' },
        { gradient: 'from-orange-500 to-red-500', shadow: 'shadow-orange-500/50' },
        { gradient: 'from-indigo-500 to-purple-500', shadow: 'shadow-indigo-500/50' },
        { gradient: 'from-yellow-500 to-orange-500', shadow: 'shadow-yellow-500/50' },
      ]
      
      const randomColor = colorOptions[subjects.length % colorOptions.length]
      const newSubject = {
        id: Date.now(),
        name: subjectName.trim(),
        icon: '📚',
        gradient: randomColor.gradient,
        shadow: randomColor.shadow,
        description: '',
        createdAt: new Date().toISOString()
      }
      
      const updatedSubjects = [...subjects, newSubject]
      setSubjects(updatedSubjects)
      await saveSubjects(updatedSubjects)
      setNoteCounts({ ...noteCounts, [newSubject.id]: 0 })
      setSubjectName('')
      setShowSubjectForm(false)
    }
  }

  const handleEditSubject = async (subjectData) => {
    const updatedSubjects = subjects.map(s => 
      s.id === editingSubject.id ? { ...subjectData, id: editingSubject.id, createdAt: s.createdAt } : s
    )
    setSubjects(updatedSubjects)
    await saveSubjects(updatedSubjects)
    setEditingSubject(null)
  }

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm('Bạn có chắc muốn xóa môn học này? Tất cả ghi chú liên quan sẽ bị xóa.')) {
      const updatedSubjects = subjects.filter(s => s.id !== subjectId)
      setSubjects(updatedSubjects)
      await saveSubjects(updatedSubjects)
      await Preferences.remove({ key: `notes_${subjectId}` })
      const newCounts = { ...noteCounts }
      delete newCounts[subjectId]
      setNoteCounts(newCounts)
    }
  }

  const handleViewSubject = (subject) => {
    navigate(`/subject/${subject.id}`, { state: { subject } })
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Mới tạo'
    const date = new Date(dateString)
    const now = new Date()
    const diff = now - date
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (days === 0) return 'Hôm nay'
    if (days === 1) return 'Hôm qua'
    if (days < 7) return `${days} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  const startEditSubject = (subject) => {
    setEditingSubject(subject)
    setShowAddModal(true)
  }

  const cancelForm = () => {
    setShowSubjectForm(false)
    setSubjectName('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-2xl">
            <BookOpen className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">Ghi chú học tập</h1>
          <p className="text-purple-200 text-lg">Quản lý và tổ chức ghi chú của bạn một cách hiệu quả</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Tổng môn học</p>
                <p className="text-4xl font-bold text-white mt-1">{subjects.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-300" />
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Tổng ghi chú</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {Object.values(noteCounts).reduce((a, b) => a + b, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-300" />
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Trung bình/môn</p>
                <p className="text-4xl font-bold text-white mt-1">
                  {subjects.length > 0 
                    ? Math.round(Object.values(noteCounts).reduce((a, b) => a + b, 0) / subjects.length) 
                    : 0
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Subject Form */}
        {showSubjectForm && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">Thêm môn học mới</h2>
            <div className="flex gap-3">
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Tên môn học (VD: Toán, Lý, Anh...)"
                className="flex-1 px-6 py-4 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                onKeyPress={(e) => e.key === 'Enter' && handleQuickAddSubject()}
              />
              <button
                onClick={handleQuickAddSubject}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                <Save className="w-5 h-5" />
              </button>
              <button
                onClick={cancelForm}
                className="px-8 py-4 bg-white/20 backdrop-blur-lg text-white rounded-xl font-semibold hover:bg-white/30 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Subjects Grid */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-300 border-t-purple-600"></div>
            <p className="text-white mt-4 text-lg">Đang tải...</p>
          </div>
        ) : subjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 rounded-full mb-6">
              <BookOpen className="w-12 h-12 text-purple-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Chưa có môn học nào</h3>
            <p className="text-purple-200 mb-6">Hãy thêm môn học đầu tiên để bắt đầu!</p>
            <button
              onClick={() => setShowSubjectForm(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              <Plus className="w-5 h-5" />
              Thêm môn học
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Môn học của bạn</h2>
              {!showSubjectForm && (
                <button
                  onClick={() => setShowSubjectForm(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Thêm môn học
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => {
                const noteCount = noteCounts[subject.id] || 0
                return (
                  <div
                    key={subject.id}
                    onClick={() => handleViewSubject(subject)}
                    className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 cursor-pointer transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} opacity-20 rounded-2xl`}></div>
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${subject.gradient} rounded-xl flex items-center justify-center shadow-lg text-3xl`}>
                          {subject.icon}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              startEditSubject(subject)
                            }}
                            className="p-2 bg-white/20 backdrop-blur-lg rounded-lg hover:bg-white/30 transition-all"
                          >
                            <Edit2 className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteSubject(subject.id)
                            }}
                            className="p-2 bg-red-500/20 backdrop-blur-lg rounded-lg hover:bg-red-500/30 transition-all"
                          >
                            <Trash2 className="w-4 h-4 text-red-300" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{subject.name}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200 text-sm">{noteCount} ghi chú</span>
                        <span className="text-purple-300 text-xs">{formatDate(subject.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingSubject) && (
        <AddSubjectModal
          subject={editingSubject}
          onSave={editingSubject ? handleEditSubject : handleAddSubject}
          onClose={() => {
            setShowAddModal(false)
            setEditingSubject(null)
          }}
        />
      )}
    </div>
  )
}

export default SubjectManager
