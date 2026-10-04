# Samir Nassiri — Portfolio (React + Vite + Tailwind + Framer Motion)

اللغات: EN / FR / AR (حسب لغة المتصفح، ويمكن تغييرها من القائمة) · الوضع الداكن حسب النظام (ويمكن تغييره).

## قبل التشغيل: انسخ ملفاتك
انسخ مجلد `documents` القديم بكامل محتوياته إلى `public/documents/`.
ملفات السيرة الذاتية (بهذه الأسماء بالضبط):
- `Samir Nassiri CV Resume.pdf` (الإنجليزية، موجود)
- `Samir Nassiri CV Resume FR.pdf`
- `Samir Nassiri CV Resume AR.pdf`
إذا لم يوجد ملف لغة معيّنة يُحمَّل الإنجليزي تلقائيًا.

## التشغيل محليًا (Node 22 LTS، يعمل على Windows 32-bit)
```
npm install
npm run dev        # معاينة
npm run build      # ينتج مجلد dist
```

## النشر على GitHub Pages
1. ارفع محتوى هذا المجلد (بدون node_modules و dist) إلى مستودع `new-portfolio` على الفرع `main`.
2. في المستودع: Settings → Pages → Source = **GitHub Actions**.
3. كل `git push` يبني الموقع وينشره تلقائيًا (ملف `.github/workflows/deploy.yml`).

## أين أعدّل؟
- المشاريع والمهارات والروابط: `src/data.js`
- كل النصوص: `src/locales/en.json` و `fr.json` و `ar.json`
- الألوان: المتغيرات في أعلى `src/index.css`
