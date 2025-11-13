# Quản lý Môn học Động (CRUD Subjects)

## 🎯 Tính năng

Ứng dụng cho phép người dùng quản lý môn học một cách linh hoạt, không bị cố định danh sách môn học.

## ✨ Các chức năng

### 1. Thêm môn học mới
- Click nút **"+ Thêm môn học"** trên màn hình chính
- Nhập tên môn học (bắt buộc)
- Nhập mô tả (tùy chọn)
- Chọn icon từ 16 biểu tượng có sẵn
- Chọn màu gradient từ 8 màu khác nhau
- Xem trước môn học trước khi lưu
- Click "Thêm môn học" để hoàn tất

### 2. Sửa môn học
- Click icon **✏️** bên cạnh môn học cần sửa
- Cập nhật thông tin (tên, icon, màu, mô tả)
- Click "Cập nhật" để lưu thay đổi

### 3. Xóa môn học
- Click icon **🗑️** bên cạnh môn học cần xóa
- Xác nhận xóa (cảnh báo: tất cả ghi chú sẽ bị xóa)
- Môn học và ghi chú liên quan sẽ bị xóa vĩnh viễn

### 4. Xem ghi chú
- Click vào môn học để xem danh sách ghi chú
- Hiển thị số lượng ghi chú bên dưới tên môn học

## 🎨 Tùy chỉnh môn học

### Icons có sẵn
```
📐 ⚛️ 🇬🇧 💻 📚 🧪 🎨 🎵 ⚽ 🌍 🔬 📊 ✏️ 📝 🎓 💡
```

### Màu sắc có sẵn
- Xanh dương (Blue)
- Tím (Purple)
- Đỏ (Red)
- Xanh lá (Green)
- Vàng-Cam (Yellow-Orange)
- Hồng (Pink)
- Xanh lơ (Cyan)
- Cam (Orange)

## 💾 Lưu trữ dữ liệu

### Subject Storage
```javascript
// Storage key
const SUBJECTS_KEY = 'subjects_list'

// Load subjects
const subjects = await loadSubjects()

// Save subjects
await saveSubjects(updatedSubjects)

// Get subject by ID
const subject = await getSubjectById(id)
```

### Data Structure
```javascript
{
  id: 1234567890,           // Timestamp
  name: "Toán",             // Tên môn học
  icon: "📐",               // Icon
  gradient: "from-blue-400 to-blue-600",  // Gradient CSS
  shadow: "shadow-blue-500/50",           // Shadow CSS
  description: "Đại số & Hình học"        // Mô tả
}
```

## 🔄 Flow hoạt động

### Thêm môn học
```
User clicks "Thêm môn học"
  → Modal mở ra
  → User nhập thông tin
  → User chọn icon & màu
  → User xem preview
  → User click "Thêm"
  → Save to storage
  → Modal đóng
  → Danh sách cập nhật
```

### Sửa môn học
```
User clicks icon ✏️
  → Modal mở với dữ liệu hiện tại
  → User chỉnh sửa
  → User click "Cập nhật"
  → Update in storage
  → Modal đóng
  → Danh sách cập nhật
```

### Xóa môn học
```
User clicks icon 🗑️
  → Confirmation dialog
  → User confirms
  → Delete from storage
  → Delete associated notes
  → Danh sách cập nhật
```

## 📊 Components

### SubjectManager.jsx
Component chính quản lý danh sách môn học
- State: subjects, isLoading, showAddModal, editingSubject, noteCounts
- Functions: loadSubjectsData, handleAddSubject, handleEditSubject, handleDeleteSubject

### AddSubjectModal.jsx
Modal để thêm/sửa môn học
- Props: subject (optional), onSave, onClose
- State: formData
- Features: Icon selector, Color picker, Live preview

### utils/subjectStorage.js
Helper functions cho storage operations
- loadSubjects(): Load danh sách môn học
- saveSubjects(subjects): Lưu danh sách môn học
- getSubjectById(id): Lấy môn học theo ID

## 🎯 Default Subjects

Nếu user chưa có môn học nào, app sẽ hiển thị 6 môn học mặc định:
1. Toán 📐
2. Lý ⚛️
3. Anh 🇬🇧
4. CNTT 💻
5. Văn 📚
6. Hóa 🧪

## 🔧 API Storage

### Capacitor Preferences
```javascript
import { Preferences } from '@capacitor/preferences'

// Set
await Preferences.set({
  key: 'subjects_list',
  value: JSON.stringify(subjects)
})

// Get
const { value } = await Preferences.get({ key: 'subjects_list' })
const subjects = JSON.parse(value)

// Remove
await Preferences.remove({ key: 'subjects_list' })
```

## 🐛 Error Handling

- Nếu subject không tìm thấy → Redirect về home
- Nếu load subjects fail → Return default subjects
- Nếu save subjects fail → Log error, notify user
- Xóa môn học → Xác nhận trước khi xóa

## 💡 Tips

1. **Tên môn học**: Nên ngắn gọn, dễ nhớ
2. **Icon**: Chọn icon phù hợp với môn học
3. **Màu sắc**: Chọn màu nổi bật, dễ phân biệt
4. **Backup**: Dữ liệu lưu local, nên backup định kỳ
5. **Testing**: Test thêm/xóa/sửa trước khi deploy

## 🎨 UI/UX

- Giao diện sáng, dễ nhìn
- Icons lớn, dễ click
- Confirmation khi xóa
- Loading states
- Empty states
- Responsive design
- Smooth transitions

---

**Note**: Tất cả dữ liệu được lưu local trên device, không upload lên server.
