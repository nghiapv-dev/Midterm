import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Preferences } from '@capacitor/preferences'
import { getSubjectById } from '../utils/subjectStorage'

function NoteScreen() {
  const { subjectId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  // Get subject from location state or load from storage
  const [subject, setSubject] = useState(location.state?.subject || null)
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)

  // Load subject if not in state
  useEffect(() => {
    const loadSubject = async () => {
      if (!subject) {
        const loadedSubject = await getSubjectById(subjectId)
        if (loadedSubject) {
          setSubject(loadedSubject)
        } else {
          navigate('/')
        }
      }
    }
    loadSubject()
  }, [subjectId, subject, navigate])

  // Load notes from storage
  useEffect(() => {
    loadNotes()
  }, [subject])

  const loadNotes = async () => {
    try {
      const { value } = await Preferences.get({ key: `notes_${subject.id}` })
      if (value) {
        setNotes(JSON.parse(value))
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Error loading notes:', error)
      setIsLoading(false)
    }
  }

  const saveNotes = async (updatedNotes) => {
    try {
      await Preferences.set({
        key: `notes_${subject.id}`,
        value: JSON.stringify(updatedNotes),
      })
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }

  const addNote = async () => {
    if (newNote.trim()) {
      setIsAdding(true)
      const updatedNotes = [
        {
          id: Date.now(),
          content: newNote,
          timestamp: new Date().toLocaleString('vi-VN'),
        },
        ...notes,
      ]
      setNotes(updatedNotes)
      await saveNotes(updatedNotes)
      setNewNote('')
      setTimeout(() => setIsAdding(false), 300)
    }
  }

  const deleteNote = async (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)
    await saveNotes(updatedNotes)
  }

  const clearAllNotes = async () => {
    if (window.confirm('Bạn có chắc muốn xóa tất cả ghi chú?')) {
      setNotes([])
      await Preferences.remove({ key: `notes_${subject.id}` })
    }
  }

  const handleBack = () => {
    navigate('/')
  }

  // Don't render if subject not found
  if (!subject) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 font-medium mb-4 flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Quay lại</span>
          </button>
          
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{subject.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Ghi chú môn {subject.name}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{notes.length} ghi chú</p>
            </div>
          </div>
        </div>

        {/* Add Note Section */}
        <div className="bg-white rounded-xl shadow-sm p-5 mb-5">
          <h2 className="text-base font-semibold text-gray-800 mb-3">Thêm ghi chú mới</h2>
          
          <div className="space-y-3">
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Nhập ghi chú của bạn..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none resize-none text-gray-700 text-sm"
              rows="4"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                  addNote()
                }
              }}
            />
            
            <div className="flex gap-2.5">
              <button
                onClick={addNote}
                disabled={!newNote.trim() || isAdding}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
              >
                {isAdding ? 'Đang lưu...' : 'Lưu ghi chú'}
              </button>
              
              {notes.length > 0 && (
                <button
                  onClick={clearAllNotes}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors text-sm"
                >
                  Xóa tất cả
                </button>
              )}
            </div>
            
            <p className="text-xs text-gray-500 text-center">
              Ctrl + Enter để lưu nhanh
            </p>
          </div>
        </div>

        {/* Notes List */}
        {isLoading ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-indigo-600"></div>
            <p className="text-gray-600 mt-4 text-sm">Đang tải ghi chú...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="text-7xl mb-4 opacity-20">📝</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Chưa có ghi chú nào
            </h3>
            <p className="text-gray-500 text-sm">
              Hãy thêm ghi chú đầu tiên cho môn {subject.name}!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note, index) => (
              <div
                key={note.id}
                className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{note.timestamp}</span>
                  </div>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Xóa ghi chú"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                
                <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteScreen
