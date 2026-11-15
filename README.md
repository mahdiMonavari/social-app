<div align="center">

# 💠 SocialApp

**An elegant, real-time social & matchmaking platform built with Next.js**

[English](#-english) · [فارسی](#-فارسی)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Better Auth](https://img.shields.io/badge/Better_Auth-111827?style=for-the-badge)
![Pusher](https://img.shields.io/badge/Pusher-300D4F?style=for-the-badge&logo=pusher&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Resend](https://img.shields.io/badge/Resend-000000?style=for-the-badge)

</div>

---

## 🇬🇧 English

### ✨ Overview

SocialApp lets people sign up, build a profile, upload photos, discover members with filters, like each other, and chat in real time. The UI uses a clean blue gradient theme with a responsive layout that works on desktop and mobile.

### 📸 Screenshots

<details open>
<summary><b>Landing & Authentication</b></summary>

| Landing | Register – Account | Register – Profile |
|---|---|---|
| ![Landing](docs/screenshots/01-landing.webp) | ![Account](docs/screenshots/02-register-account.webp) | ![Profile](docs/screenshots/03-register-profile.webp) |

| Verify Email | Edit Profile |
|---|---|
| ![Verify](docs/screenshots/04-verify-email.webp) | ![Edit profile](docs/screenshots/05-edit-profile.webp) |

</details>

<details open>
<summary><b>Photos, Matches & Lists</b></summary>

| Photo Gallery | Matches |
|---|---|
| ![Photos](docs/screenshots/06-photos.webp) | ![Matches](docs/screenshots/07-matches.webp) |

| Lists & Notifications |
|---|
| ![Lists](docs/screenshots/10-lists-notifications.webp) |

</details>

<details open>
<summary><b>Messaging</b></summary>

| Realtime Chat | Inbox |
|---|---|
| ![Chat](docs/screenshots/08-realtime-chat.webp) | ![Inbox](docs/screenshots/09-inbox.webp) |

</details>

### 🚀 Features

**Authentication & Onboarding**
- Email & password sign-up and login powered by **Better Auth**
- **Google OAuth** ("Continue with Google")
- 3-step registration wizard: *Account → Profile Details → Verify Email*
- Email verification via **Resend**; the page updates automatically once the email is verified
- **Auto Fill** for city/country on the profile step

**Profile**
- Edit display name, description, city and country
- Gender and date of birth (age is calculated and shown, e.g. `mahdi, 24`)
- Online presence indicator (green dot)

**Photo Gallery**
- Upload images stored on **Cloudinary**
- Set a main profile photo (★) and delete photos (🗑)
- Main photo is shown as the avatar across the app

**Discover / Matches**
- Filter by gender (multi-select)
- Sort by *Last Active* or *New Members*
- Age range slider (18–45 shown in the screenshot)
- Result counter and pagination
- Like / unlike members with a heart button

**Lists**
- **Mutual**, **Source** (people I liked) and **Target** (people who liked me) tabs
- Empty-state screen when no members match

**Messaging**
- Inbox and Outbox tabs with unread count badge
- One-to-one chat threads with timestamps
- Delete conversations from the inbox
- Real-time message delivery and unread badge in the navbar via **Pusher**

**Real-time Notifications**
- Toast popups such as *"Karen sent you a message"* and *"Karen has liked you"* with a *Click to view* action

**UI / UX**
- Animated landing page with gradient background
- Responsive navbar with a hamburger menu on mobile
- Tailwind-based component design with consistent rounded cards and pill buttons

### 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), React |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| Auth | Better Auth (email/password + Google OAuth) |
| Email | Resend |
| Media | Cloudinary |
| Realtime | Pusher |
| Cloud | Google Cloud Console (OAuth credentials) |

### 📁 Project Structure (suggested)

```
.
├── app/                  # Routes: /, /login, /register, /matches, /lists, /messages, /members/[id]
├── components/           # Navbar, MemberCard, PhotoGrid, ChatBox, Toast, etc.
├── lib/
│   ├── auth.ts           # Better Auth config
│   ├── db.ts             # PostgreSQL client
│   ├── cloudinary.ts     # Upload / delete helpers
│   └── pusher.ts         # Server & client Pusher instances
├── public/
└── README.md
```

### ⚙️ Getting Started

**Prerequisites**
- Node.js 18+
- PostgreSQL database
- Accounts: Google Cloud Console, Resend, Cloudinary, Pusher

**1. Clone & install**

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

**2. Configure environment variables**

Create a `.env.local` file (adjust names to match your code):

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/socialapp

# Better Auth
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (Google Cloud Console)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Resend
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM="SocialApp <no-reply@yourdomain.com>"

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Pusher
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=your_cluster
NEXT_PUBLIC_PUSHER_KEY=your_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_cluster
```

**3. Set up Google OAuth**
- Create a project in Google Cloud Console → *APIs & Services → Credentials*
- Create an *OAuth client ID* (Web application)
- Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

**4. Run database migrations**

```bash
npx @better-auth/cli migrate   # or your ORM's migration command
```

**5. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run linter |

### 🛣️ Roadmap

- [ ] Typing indicators & read receipts
- [ ] Block / report members
- [ ] Advanced filters (location radius, interests)
- [ ] Push notifications for mobile
- [ ] Persian / English language switcher in-app

### 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

### 📄 License

MIT © Mahdi Monavari

---

## 🇮🇷 فارسی

### ✨ معرفی

SocialApp یک پلتفرم اجتماعی و آشنایی است که به کاربران اجازه می‌دهد ثبت‌نام کنند، پروفایل بسازند، عکس آپلود کنند، دیگران را با فیلتر پیدا کنند، به هم لایک بدهند و به‌صورت لحظه‌ای چت کنند. طراحی رابط با تم آبی گرادیانی و چیدمان واکنش‌گرا انجام شده و روی دسکتاپ و موبایل کار می‌کند.

### 📸 تصاویر برنامه

<details open>
<summary><b>صفحه اصلی و احراز هویت</b></summary>

| صفحه اصلی | ثبت‌نام – حساب کاربری | ثبت‌نام – پروفایل |
|---|---|---|
| ![Landing](docs/screenshots/01-landing.webp) | ![Account](docs/screenshots/02-register-account.webp) | ![Profile](docs/screenshots/03-register-profile.webp) |

| تأیید ایمیل | ویرایش پروفایل |
|---|---|
| ![Verify](docs/screenshots/04-verify-email.webp) | ![Edit profile](docs/screenshots/05-edit-profile.webp) |

</details>

<details open>
<summary><b>گالری، جستجو و لیست‌ها</b></summary>

| گالری عکس | جستجو (Matches) |
|---|---|
| ![Photos](docs/screenshots/06-photos.webp) | ![Matches](docs/screenshots/07-matches.webp) |

| لیست‌ها و اعلان‌ها |
|---|
| ![Lists](docs/screenshots/10-lists-notifications.webp) |

</details>

<details open>
<summary><b>پیام‌رسانی</b></summary>

| چت لحظه‌ای | صندوق ورودی |
|---|---|
| ![Chat](docs/screenshots/08-realtime-chat.webp) | ![Inbox](docs/screenshots/09-inbox.webp) |

</details>

### 🚀 قابلیت‌ها

**احراز هویت و ورود اولیه**
- ثبت‌نام و ورود با ایمیل و رمز عبور با **Better Auth**
- ورود با **گوگل (OAuth)**
- ویزارد ثبت‌نام در ۳ مرحله: *حساب کاربری → جزئیات پروفایل → تأیید ایمیل*
- تأیید ایمیل با **Resend**؛ پس از تأیید، صفحه به‌صورت خودکار به‌روز می‌شود
- دکمه **Auto Fill** برای پر کردن شهر و کشور در مرحله پروفایل

**پروفایل**
- ویرایش نام نمایشی، توضیحات، شهر و کشور
- جنسیت و تاریخ تولد (سن به‌صورت خودکار محاسبه و نمایش داده می‌شود، مثل `mahdi, 24`)
- نشانگر آنلاین بودن (نقطه سبز)

**گالری عکس**
- آپلود تصاویر در **Cloudinary**
- انتخاب عکس اصلی پروفایل (★) و حذف عکس (🗑)
- عکس اصلی به‌عنوان آواتار در کل برنامه نمایش داده می‌شود

**جستجو / Matches**
- فیلتر بر اساس جنسیت (انتخاب چندگانه)
- مرتب‌سازی بر اساس *آخرین فعالیت* یا *اعضای جدید*
- اسلایدر بازه سنی (در تصویر: ۱۸ تا ۴۵)
- نمایش تعداد نتایج و صفحه‌بندی
- لایک و آنلایک کردن اعضا با دکمه قلب

**لیست‌ها / Lists**
- تب‌های **Mutual** (لایک متقابل)، **Source** (کسانی که من لایک کرده‌ام) و **Target** (کسانی که من را لایک کرده‌اند)
- صفحه خالی زمانی که عضوی با فیلتر مطابقت ندارد

**پیام‌رسانی**
- تب‌های Inbox و Outbox به همراه شمارنده پیام خوانده‌نشده
- گفتگوی یک‌به‌یک با زمان ارسال
- حذف پیام از صندوق ورودی
- ارسال پیام لحظه‌ای و به‌روزرسانی نشان پیام‌ها در نوار بالا با **Pusher**

**اعلان‌های لحظه‌ای**
- پاپ‌آپ‌هایی مثل *«Karen sent you a message»* و *«Karen has liked you»* با گزینه *Click To View*

**رابط کاربری**
- صفحه اصلی با انیمیشن و پس‌زمینه گرادیانی
- نوار بالا واکنش‌گرا با منوی همبرگری در موبایل
- کارت‌ها و دکمه‌های گرد با طراحی یکدست مبتنی بر Tailwind

### 🧰 تکنولوژی‌ها

| بخش | تکنولوژی |
|---|---|
| فریم‌ورک | Next.js (App Router)، React |
| استایل | Tailwind CSS |
| دیتابیس | PostgreSQL |
| احراز هویت | Better Auth (ایمیل/رمز + گوگل) |
| ایمیل | Resend |
| رسانه | Cloudinary |
| Realtime | Pusher |
| ابر | Google Cloud Console (اعتبارنامه OAuth) |

### ⚙️ نصب و راه‌اندازی

**پیش‌نیازها**
- Node.js نسخه ۱۸ به بالا
- دیتابیس PostgreSQL
- حساب‌های Google Cloud Console، Resend، Cloudinary و Pusher

**۱. کلون و نصب وابستگی‌ها**

```bash
git clone <your-repo-url>
cd <project-folder>
npm install
```

**۲. تنظیم متغیرهای محیطی**

فایل `.env.local` را بسازید (نام‌ها را با کد خود تطبیق دهید) — نمونه در بخش انگلیسی آمده است.

**۳. تنظیم Google OAuth**
- در Google Cloud Console یک پروژه بسازید → *APIs & Services → Credentials*
- یک *OAuth client ID* از نوع Web application بسازید
- Redirect URI: `http://localhost:3000/api/auth/callback/google`

**۴. اجرای مهاجرت دیتابیس**

```bash
npx @better-auth/cli migrate   # یا دستور migration ORM شما
```

**۵. اجرای پروژه**

```bash
npm run dev
```

سپس به [http://localhost:3000](http://localhost:3000) بروید.

### 📜 اسکریپت‌ها

| دستور | توضیح |
|---|---|
| `npm run dev` | اجرای سرور توسعه |
| `npm run build` | ساخت نسخه production |
| `npm run start` | اجرای نسخه production |
| `npm run lint` | بررسی کد با linter |

### 🛣️ نقشه راه

- [ ] نشانگر «در حال تایپ» و تیک خوانده‌شدن پیام
- [ ] مسدود کردن و گزارش کاربران
- [ ] فیلترهای پیشرفته (شعاع مکانی، علایق)
- [ ] نوتیفیکیشن موبایل
- [ ] سوئیچ زبان فارسی/انگلیسی داخل برنامه

### 🤝 مشارکت

Pull request خوش‌آمد است. برای تغییرات بزرگ ابتدا یک Issue باز کنید.

### 📄 لایسنس

MIT © Mahdi Monavari
