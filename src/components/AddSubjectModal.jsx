import { useState, useEffect } from 'react'

const iconOptions = ['📐', '⚛️', '🇬🇧', '💻', '📚', '🧪', '🎨', '🎵', '⚽', '🌍', '🔬', '📊', '✏️', '📝', '🎓', '💡']
const gradientOptions = [
  { name: 'Xanh dương', value: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/50' },
  { name: 'Tím', value: 'from-purple-400 to-purple-600', shadow: 'shadow-purple-500/50' },
  { name: 'Đỏ', value: 'from-red-400 to-red-600', shadow: 'shadow-red-500/50' },
  { name: 'Xanh lá', value: 'from-green-400 to-green-600', shadow: 'shadow-green-500/50' },
  { name: 'Vàng', value: 'from-yellow-400 to-orange-500', shadow: 'shadow-yellow-500/50' },
  { name: 'Hồng', value: 'from-pink-400 to-pink-600', shadow: 'shadow-pink-500/50' },
  { name: 'Cyan', value: 'from-cyan-400 to-cyan-600', shadow: 'shadow-cyan-500/50' },
  { name: 'Cam', value: 'from-orange-400 to-orange-600', shadow: 'shadow-orange-500/50' },
]

function AddSubjectModal({ subject, onSave, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    icon: '📚',
    gradient: 'from-blue-400 to-blue-600',
    shadow: 'shadow-blue-500/50',
    description: '',
  })

  useEffect(() => {
    if (subject) {
      setFormData(subject)
    }
  }, [subject])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim()) {
      onSave(formData)
    }
  }

  const handleGradientChange = (gradient) => {
    setFormData({
      ...formData,
      gradient: gradient.value,
      shadow: gradient.shadow,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {subject ? 'Sửa môn học' : 'Thêm môn học mới'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tên môn học *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ví dụ: Toán, Lý, Hóa..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mô tả (tùy chọn)
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ví dụ: Đại số & Hình học"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:outline-none transition"
              />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Biểu tượng
              </label>
              <div className="grid grid-cols-8 gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`text-3xl p-3 rounded-xl transition hover:scale-110 ${
                      formData.icon === icon
                        ? 'bg-indigo-100 ring-2 ring-indigo-500'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Màu sắc
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {gradientOptions.map((gradient) => (
                  <button
                    key={gradient.value}
                    type="button"
                    onClick={() => handleGradientChange(gradient)}
                    className={`h-16 rounded-xl bg-gradient-to-br ${gradient.value} transition transform hover:scale-105 ${
                      formData.gradient === gradient.value
                        ? 'ring-4 ring-indigo-500'
                        : ''
                    }`}
                    title={gradient.name}
                  ></button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Xem trước
              </label>
              <div className={`bg-gradient-to-br ${formData.gradient} rounded-2xl p-6 shadow-xl ${formData.shadow}`}>
                <div className="text-center text-white">
                  <div className="text-5xl mb-2">{formData.icon}</div>
                  <h3 className="text-2xl font-bold">{formData.name || 'Tên môn học'}</h3>
                  {formData.description && (
                    <p className="text-white/80 text-sm mt-1">{formData.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition transform hover:scale-105"
              >
                {subject ? 'Cập nhật' : 'Thêm môn học'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddSubjectModal
