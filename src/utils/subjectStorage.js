import { Preferences } from '@capacitor/preferences'

const SUBJECTS_KEY = 'subjects_list'

// Default subjects
export const defaultSubjects = [
  { 
    id: 1, 
    name: 'Toán', 
    icon: '📐', 
    gradient: 'from-blue-400 to-blue-600',
    shadow: 'shadow-blue-500/50',
    description: 'Đại số & Hình học'
  },
  { 
    id: 2, 
    name: 'Lý', 
    icon: '⚛️', 
    gradient: 'from-purple-400 to-purple-600',
    shadow: 'shadow-purple-500/50',
    description: 'Vật lý & Cơ học'
  },
  { 
    id: 3, 
    name: 'Anh', 
    icon: '🇬🇧', 
    gradient: 'from-red-400 to-red-600',
    shadow: 'shadow-red-500/50',
    description: 'Tiếng Anh'
  },
  { 
    id: 4, 
    name: 'CNTT', 
    icon: '💻', 
    gradient: 'from-green-400 to-green-600',
    shadow: 'shadow-green-500/50',
    description: 'Tin học & Lập trình'
  },
  { 
    id: 5, 
    name: 'Văn', 
    icon: '📚', 
    gradient: 'from-yellow-400 to-orange-500',
    shadow: 'shadow-yellow-500/50',
    description: 'Ngữ văn'
  },
  { 
    id: 6, 
    name: 'Hóa', 
    icon: '🧪', 
    gradient: 'from-pink-400 to-pink-600',
    shadow: 'shadow-pink-500/50',
    description: 'Hóa học'
  },
]

export const loadSubjects = async () => {
  try {
    const { value } = await Preferences.get({ key: SUBJECTS_KEY })
    if (value) {
      return JSON.parse(value)
    }
    // If no subjects saved, return default
    return defaultSubjects
  } catch (error) {
    console.error('Error loading subjects:', error)
    return defaultSubjects
  }
}

export const saveSubjects = async (subjects) => {
  try {
    await Preferences.set({
      key: SUBJECTS_KEY,
      value: JSON.stringify(subjects),
    })
    return true
  } catch (error) {
    console.error('Error saving subjects:', error)
    return false
  }
}

export const getSubjectById = async (id) => {
  const subjects = await loadSubjects()
  return subjects.find(s => s.id === parseInt(id))
}
