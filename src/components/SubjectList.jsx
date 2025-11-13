import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const subjects = [
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

function SubjectList() {
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState(null)

  const handleSelectSubject = (subject) => {
    navigate(`/subject/${subject.id}`, { state: { subject } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 p-6 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <div className="text-7xl mb-4 animate-bounce-slow">📖</div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
              Study Notes
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-purple-200 font-light">
              Chọn môn học để xem ghi chú của bạn
            </p>
          </div>

          {/* Subject Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {subjects.map((subject, index) => (
              <button
                key={subject.id}
                onClick={() => handleSelectSubject(subject)}
                onMouseEnter={() => setHoveredId(subject.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 
                  transform transition-all duration-300 ease-out
                  hover:scale-105 hover:-translate-y-2
                  ${hoveredId === subject.id ? 'shadow-2xl ' + subject.shadow : 'shadow-xl'}
                  animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {subject.name}
                  </h3>
                  <p className="text-purple-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {subject.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full opacity-50"></div>
              </button>
            ))}
          </div>

          {/* Info Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="flex items-start gap-4">
              <div className="text-4xl">ℹ️</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Hướng dẫn sử dụng</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">1️⃣</div>
                    <div>
                      <p className="text-white font-semibold mb-1">Chọn môn học</p>
                      <p className="text-purple-200 text-sm">Click vào môn học để xem và thêm ghi chú</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">2️⃣</div>
                    <div>
                      <p className="text-white font-semibold mb-1">Lưu tự động</p>
                      <p className="text-purple-200 text-sm">Ghi chú được lưu ngay lập tức trên thiết bị</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">3️⃣</div>
                    <div>
                      <p className="text-white font-semibold mb-1">Quản lý dễ dàng</p>
                      <p className="text-purple-200 text-sm">Thêm, xóa và chỉnh sửa ghi chú tiện lợi</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

export default SubjectList
