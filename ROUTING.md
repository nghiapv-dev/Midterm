# React Router Implementation

## 📍 Routes

Ứng dụng sử dụng React Router DOM để quản lý navigation giữa các trang.

### Route Structure

```
/                          → Trang chủ - Danh sách môn học (SubjectList)
/subject/:subjectId        → Trang ghi chú của môn học (NoteScreen)
```

## 🔀 Navigation Flow

### 1. Từ Trang chủ → Trang ghi chú
```javascript
// SubjectList.jsx
const navigate = useNavigate()

const handleSelectSubject = (subject) => {
  navigate(`/subject/${subject.id}`, { state: { subject } })
}
```

### 2. Từ Trang ghi chú → Trang chủ
```javascript
// NoteScreen.jsx
const navigate = useNavigate()

const handleBack = () => {
  navigate('/')
}
```

## 📦 Component Updates

### App.jsx
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubjectList />} />
        <Route path="/subject/:subjectId" element={<NoteScreen />} />
      </Routes>
    </Router>
  )
}
```

### SubjectList.jsx
```javascript
import { useNavigate } from 'react-router-dom'

function SubjectList() {
  const navigate = useNavigate()
  
  const handleSelectSubject = (subject) => {
    // Navigate with state to pass subject data
    navigate(`/subject/${subject.id}`, { state: { subject } })
  }
}
```

### NoteScreen.jsx
```javascript
import { useParams, useLocation, useNavigate } from 'react-router-dom'

function NoteScreen() {
  const { subjectId } = useParams()        // Get ID from URL
  const location = useLocation()           // Get location state
  const navigate = useNavigate()           // Navigation function
  
  // Get subject from state or find by ID
  const subject = location.state?.subject || 
                  subjects.find(s => s.id === parseInt(subjectId))
  
  // Redirect if not found
  useEffect(() => {
    if (!subject) {
      navigate('/')
    }
  }, [subject, navigate])
}
```

## ✨ Benefits

1. **URL Support**: Mỗi trang có URL riêng (ví dụ: `/subject/1`)
2. **Browser History**: Nút back/forward của browser hoạt động
3. **Deep Linking**: Có thể share link trực tiếp đến môn học
4. **State Management**: Dữ liệu môn học được truyền qua location state
5. **Fallback**: Auto redirect về home nếu route không hợp lệ

## 🎯 URL Examples

- `/` - Trang chủ
- `/subject/1` - Ghi chú môn Toán
- `/subject/2` - Ghi chú môn Lý  
- `/subject/3` - Ghi chú môn Anh
- `/subject/4` - Ghi chú môn CNTT
- `/subject/5` - Ghi chú môn Văn
- `/subject/6` - Ghi chú môn Hóa

## 🔧 Configuration

### Capacitor Config
```json
{
  "server": {
    "androidScheme": "https"
  }
}
```

Đảm bảo routing hoạt động tốt trên Android với HTTPS scheme.

## 🐛 Troubleshooting

### Issue: 404 khi refresh trang
**Solution**: Trên production server, configure fallback về index.html

### Issue: State bị mất khi refresh
**Solution**: Component đã handle bằng cách find subject từ ID nếu state không tồn tại

### Issue: Navigation không hoạt động trên mobile
**Solution**: Đã configure `androidScheme: "https"` trong capacitor.config.json
