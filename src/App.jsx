import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SubjectManager from './components/SubjectManager'
import NoteScreen from './components/NoteScreen'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectManager />} />
        <Route path="/subject/:subjectId" element={<NoteScreen />} />
      </Routes>
    </Router>
  )
}

export default App
