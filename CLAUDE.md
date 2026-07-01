# CLAUDE.md

## 1. نظرة عامة على المشروع

- **الاسم**: `batd-academy` — موقع ويب (front-end فقط) لأكاديمية BATD، يعرض الدورات التدريبية، الاستشارات، المدونة، الوظائف، التسجيل بالدورات، والملف الشخصي للمستخدم.
- **النوع**: تطبيق ويب Server-Rendered متعدد اللغات (عربي/إنجليزي)، يستهلك API خارجي جاهز عبر `NEXT_PUBLIC_API_KEY` (`https://batdacademy.simplesdev.space/api/v2`). **لا يوجد backend أو قاعدة بيانات داخل هذا الريبو** — كل شيء عبارة عن `fetch` لـ API خارجي من خلال Server Actions في مجلد `action/`.
- **التقنيات الأساسية**:
  - **Next.js 16** (App Router, `output: "standalone"`, React Compiler مفعّل)
  - **React 19**
  - **next-intl** للترجمة وتوجيه اللغات (`/ar`, `/en` عبر `[locale]`)
  - **Zustand** لإدارة الحالة على الواجهة (`store/`)
  - **Sass (CSS Modules)** للتنسيق (`sass/`)
  - **React Hook Form** للنماذج، **Radix UI** لمكونات الواجهة الأساسية (accordion, dialog, dropdown...)، **Swiper**، **Motion (Framer Motion)**، **Sonner** للإشعارات، **react-google-recaptcha**
  - لا يوجد PHP/Laravel/Composer في هذا المشروع — تجاهل أي قواعد خاصة بـ Laravel.
- **الحزم الأساسية**: راجع [package.json](package.json) للقائمة الكاملة. لا يوجد ملف `composer.json` في المشروع.

## 2. بنية المشروع

- `app/[locale]/(pages)/` — كل الصفحات حسب اللغة (Route Groups)، مثل `registerCourse`, `course_details`, `blog`, `consulting`, `jobs`, `myProfile`, `signIn`, `signUp` ...إلخ.
- `app/[locale]/[...rest]` — مسار التقاط عام (catch-all).
- `components/common/`, `components/layout/`, `components/ui/`, `components/errors/` — مكونات React مشتركة (لا يوجد فصل Controllers/Models لأن هذا مشروع Frontend).
- `action/` — **Server Actions** (`"use server"`) التي تستدعي الـ API الخارجي مباشرة (مكافئ طبقة الـ Services/Repository هنا، كل ملف مسؤول عن مجال واحد: `auth.js`, `courses.js`, `categories.js`, `cities.js`, ...).
- `store/` — متاجر Zustand لكل دومين بيانات (`useAuthStore`, `useCoursesStore`, `useRegisterCourseStore`, ...).
- `hooks/` — React hooks مخصصة (`useLanguageSwitcher`, `useSearchAutocomplete`).
- `lib/` — أدوات مساعدة عامة (مثل `seoMeta.js`).
- `i18n/` — إعداد next-intl (`routing.js`, `request.js`).
- `messages/` — ملفات الترجمة JSON مقسّمة حسب الصفحة واللغة (`common/`, `layout/`, `(pages)/...`).
- `sass/` — أنماط مقسّمة إلى `components/` و `pages/` و `helpers/` (CSS Modules).
- `middleware.js` — يتعامل مع توجيه اللغة (locale routing) ومنطق الـ middleware العام.
- `public/` — الأصول الثابتة.

لا يوجد في هذا المشروع: `Models`, `Controllers` بصيغة Laravel، `Migrations`، أو `Repositories` بصيغة PHP. أقرب مكافئ لطبقة الخدمات هو `action/`.

## 3. بيئة التشغيل (Docker) — قسم إلزامي

هذا المشروع يعمل بالكامل عبر Docker. **لا تُنفّذ أي أمر Node/npm مباشرة على الجهاز (Host)**.

من [docker-compose.yml](docker-compose.yml) الفعلي في الجذر:

```yaml
services:
  nextjs:
    build:
      context: .
    container_name: next_app
    ports:
      - "3000:3000"
    restart: unless-stopped
    env_file:
      - .env
```

- **اسم الـ service الحقيقي**: `nextjs`
- **اسم الـ container الحقيقي**: `next_app`

> ملاحظة: هناك service واحد فقط حالياً (لا توجد قاعدة بيانات أو خدمات إضافية في docker-compose.yml). إن أُضيفت خدمات جديدة لاحقاً (DB, redis, ...) يجب إعادة فحص الملف وتحديث هذا القسم بدلاً من الاعتماد على ما هو مكتوب هنا.

### أوامر التشغيل والإدارة

تشغيل المشروع:
```
docker compose up -d
```

بناء وتشغيل بعد تعديل Dockerfile أو docker-compose.yml:
```
docker compose up -d --build
```

إيقاف المشروع (بدون حذف البيانات):
```
docker compose down
```

إيقاف مؤقت / إعادة تشغيل:
```
docker compose stop
docker compose start
docker compose restart
```

حذف كامل للبيئة (استخدم بحذر — لا توجد volumes بيانات حالياً لكن قد تُضاف لاحقاً):
```
docker compose down -v
```

الدخول داخل الـ container:
```
docker exec -it next_app sh
```
(صورة الإنتاج مبنية على `node:20-alpine`، فاستخدم `sh` وليس `bash` إذا لم تكن `bash` مثبتة).

عرض الـ containers الشغالة:
```
docker ps
```

عرض الـ logs:
```
docker logs next_app
```
أو بالمتابعة الحية:
```
docker logs -f next_app
```

### قاعدة تنفيذ إلزامية

أي أمر متعلق بـ Node.js — `npm install`، `npm run dev`، `npm run build`، `npm run lint`، `npx ...` — يجب أن يُنفذ دائماً داخل الـ service `nextjs`:

```
docker compose exec nextjs <الأمر هنا>
```

أو إذا كان الـ container غير مُشغّل بعد ولا تريد تشغيله بشكل دائم:

```
docker compose run --rm nextjs <الأمر هنا>
```

ممنوع تنفيذ `node`, `npm`, `npx` مباشرة على الجهاز (Host) — البيئة والـ dependencies غير مضمونة إلا داخل الـ container.

> **تنبيه مهم على هذا المشروع تحديداً**: صورة الإنتاج الحالية (`Dockerfile`) متعددة المراحل (`deps` → `builder` → `runner`) ومبنية لتشغيل `node server.js` على الإخراج الـ standalone فقط — لا تحتوي مرحلة الإنتاج النهائية على `node_modules` كاملة ولا على أدوات تطوير (لا `npm run dev`، لا `eslint`). إذا احتجت تشغيل أوامر تطوير (`dev`, `lint`, `install` حزمة جديدة) داخل Docker، استخدم `docker compose run --rm nextjs npm ...` والذي سيبني من مرحلة `builder`/`deps` حسب الحاجة، أو أنشئ override لمرحلة التطوير إذا تكرر الاحتياج — لا تفترض أن `docker exec -it next_app npm run dev` سيعمل على الـ container الحالي القائم على صورة الإنتاج.

### قاعدة تحديث ملزمة

إذا تغيّر `docker-compose.yml` لاحقاً (إضافة/حذف services، تغيير الأسماء)، يجب إعادة فحص الملف فوراً وتحديث الأسماء في هذا القسم بدلاً من الاعتماد على أسماء قديمة مفترضة.

## 4. معايير الكود الإلزامية (Engineering Standards)

هذا قسم يجب اتباعه في كل مهمة تُنفذ مستقبلاً في هذا المشروع، بدون استثناء. هذا مشروع **Next.js/React** وليس Laravel — المعايير أدناه مُكيّفة لهذا الـ stack:

### فصل الطبقات (Separation of Concerns)
- **Server Actions** (`action/*.js`) هي الطبقة الوحيدة المسؤولة عن استدعاء الـ API الخارجي. لا تستدعِ `fetch` مباشرة من داخل مكوّن React — مرّر عبر `action/`.
- **Zustand stores** (`store/*.js`) مسؤولة عن حالة الواجهة المشتركة فقط، وليست مكاناً لمنطق استدعاء API معقّد.
- **المكوّنات (Components)** يجب أن تبقى خفيفة: استقبال props، عرض UI، واستدعاء actions/hooks جاهزة — وليست مكاناً لمنطق أعمال معقّد أو معالجة بيانات ثقيلة.
- **التحقق من صحة النماذج (Validation)** يكون عبر `react-hook-form` (و schema resolver عند الحاجة)، وليس عبر شروط يدوية متناثرة داخل المكوّن.

### مبادئ عامة (SOLID-equivalent لـ JS/React)
- كل دالة/مكوّن له مسؤولية واحدة فقط (Single Responsibility).
- الكود قابل للتوسع دون تعديل الموجود (مثلاً: إضافة دورة جديدة من نوع مختلف لا يجب أن تكسر منطق الدورات الحالية).
- افصل الاعتماديات القابلة للتغيير (مثل مصدر البيانات) خلف دوال واضحة في `action/` بحيث يمكن استبدالها لاحقاً دون تعديل المكوّنات المستهلكة.

### Clean Code
- تسمية واضحة ومعبّرة للمكونات، الدوال، المتغيرات، والـ hooks (`useXxx` للـ hooks دائماً).
- دوال ومكونات قصيرة بمسؤولية واحدة — إذا تجاوز المكوّن ~150 سطراً فكر في تقسيمه.
- تجنب التكرار (DRY): منطق مشترك بين أكثر من مكوّن ينتقل إلى `hooks/` أو `lib/`.
- تجنب الـ Magic Strings/Numbers: استخدم ثوابت واضحة (مثلاً مسارات الـ API، أسماء الحقول، أكواد الحالات) بدلاً من تكرارها كنصوص حرفية متفرقة.
- لا تترك كوداً تجريبياً معلّقاً (commented-out code) في الملفات النهائية — احذفه إذا لم يعد مستخدماً.

### اختيار النمط المناسب حسب الحاجة (وليس نمطاً واحداً دائماً)
- **بيانات قادمة من API خارجي** → دالة في `action/` مخصصة لذلك الدومين.
- **حالة مشتركة بين عدة مكونات** → Zustand store مخصص لذلك الدومين (مثل النمط المتبع حالياً في `store/`).
- **منطق متكرر بين مكونات متعددة (مثل التحقق، التهيئة، الاشتراك بحدث)** → custom hook في `hooks/`.
- **نماذج متعددة الخطوات (مثل `registerCourse`)** → مكوّن "Stepper" واضح مع حالة منفصلة لكل خطوة، كما هو متبع حالياً في `components/common/Stepper.jsx` و `StepsForm.jsx`.
- **ترجمة/محتوى متعدد اللغات** → عبر `next-intl` و `messages/`، وليس نصوصاً مكتوبة مباشرة (hardcoded) داخل المكوّنات.

### الجودة وقابلية الصيانة
- التزم بقواعد ESLint المعرّفة في [eslint.config.mjs](eslint.config.mjs) (مبنية على `eslint-config-next/core-web-vitals`) — شغّل `docker compose exec nextjs npm run lint` بعد أي تعديل.
- تحقق من نجاح البناء (`npm run build`) عبر Docker بعد أي تغيير مؤثر قبل اعتبار المهمة منتهية.
- تجنب الحلول السريعة المؤقتة (Quick Fixes) لصالح حل صحيح ومستدام، إلا إذا طُلب صراحة خلاف ذلك.
- عند إضافة صفحة جديدة، التزم ببنية `app/[locale]/(pages)/<page-name>/` المتبعة حالياً، مع ملف ترجمة مقابل في `messages/(pages)/<page-name>/`.

## 5. التحقق بعد كل تعديل (Verification)

نفّذ ما يلزم داخل Docker حسب طبيعة التعديل:

```
docker compose exec nextjs npm run lint
docker compose exec nextjs npm run build
```

لا تستخدم بيئة الجهاز (Host) للتحقق أو التشغيل. إذا فشل أمر، افحص إعدادات Docker أولاً قبل افتراض أن المشروع معطوب.
