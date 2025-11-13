# Hướng dẫn chạy ứng dụng trên Android

## Yêu cầu
- Android Studio đã được cài đặt
- Java JDK 11 trở lên
- Android SDK

## Các bước thực hiện

### 1. Thêm platform Android
```bash
npx cap add android
```

### 2. Build ứng dụng web
```bash
npm run build
```

### 3. Sync với Capacitor
```bash
npx cap sync android
```

### 4. Mở Android Studio
```bash
npx cap open android
```

### 5. Chạy ứng dụng

Trong Android Studio:
1. Chọn device hoặc emulator
2. Click nút Run (▶️) hoặc Shift + F10

Hoặc từ command line:
```bash
npx cap run android
```

## Troubleshooting

### Lỗi Gradle
Nếu gặp lỗi Gradle, hãy:
1. Mở Android Studio
2. File > Sync Project with Gradle Files
3. Đợi sync xong rồi chạy lại

### Lỗi SDK
Đảm bảo Android SDK đã được cài đặt:
1. Mở Android Studio
2. Tools > SDK Manager
3. Cài đặt Android SDK phiên bản mới nhất

### Live Reload
Để bật live reload khi develop:
```bash
npx cap run android -l --host=[YOUR_IP_ADDRESS]
```

## Note
- Sau mỗi lần thay đổi code, cần chạy `npm run build` và `npx cap sync android`
- Capacitor Preferences hoạt động tốt trên Android, dữ liệu được lưu persistent
