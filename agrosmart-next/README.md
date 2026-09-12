# AgroSmart — Next.js version

Ин лоиҳа нусхаи **Next.js (App Router)**-и сомонаи AgroSmart.tj мебошад, ки аз
нусхаи React (Vite) конвертатсия шудааст. Дизайн, забонҳо ва тамоми мантиқи
корӣ ҳамон хел монданд — танҳо routing ва сохтори файлҳо иваз шуданд.

## Насб ва оғози кор

```bash
npm install
npm run dev
```

Сомона дар `http://localhost:3000` кушода мешавад.

```bash
npm run build   # билди production
npm run start   # сервери production
npm run lint    # oxlint
```

## Сохтори лоиҳа

```
src/
  app/                    — РОҲҲОИ САЙТ (App Router)
    layout.js             — қолаби умумӣ: <html>, шрифт, FontAwesome
    providers.jsx         — UserProvider + LanguageProvider + DialogProvider
    globals.css           — reset + токенҳои дизайн
    page.js               — /            (саҳифаи асосӣ)
    bozor/page.js         — /bozor
    zamin/page.js         — /zamin
    doruvori/page.js      — /doruvori
    mushtari/page.js      — /mushtari
    profile/page.js       — /profile
    info/page.js          — /info
    auth/page.js          — /auth
    admin/page.js         — /admin
    not-found.js          — саҳифаи 404

  features/               — мазмуни саҳифаҳо (пештар src/pages буд)
    menu/ bozor/ zamin/ doruvori/ mushtari/ profile/ info/ auth/ admin/
    NotFoundPage.jsx

  components/
    shared/               — Modal, AppDialog, ImagePicker, SettingsWidget...
    ui/                   — компонентҳои shadcn/ui
  context/                — корбар, забон, модалҳо
  hooks/                  — useTheme, useCart
  lib/                    — catalog.js, images.js, notify.js, utils.js
  api/                    — клиенти json-server
  locales/                — тарҷумаҳо: tj/ ru/ en/ (ҳар кадом 5 файли хурд)
  styles/                 — tokens.css, theme.css, shadcn.css, pro-pages.css
```

**Ҳар файли JS/JSX аз 150 сатр кӯтоҳтар аст.**

## Фарқи асосӣ аз нусхаи React

| React (Vite)                     | Next.js (App Router)                       |
| -------------------------------- | ------------------------------------------ |
| `App.jsx` + `react-router-dom`   | ҷузвдони `src/app/` — ҳар роҳ як `page.js` |
| `<Link to="/bozor">`             | `<Link href="/bozor">` аз `next/link`      |
| `useNavigate()`                  | `useRouter()` аз `next/navigation`         |
| `useLocation().pathname`         | `usePathname()`                            |
| `index.html`                     | `app/layout.js` + `export const metadata`  |
| `main.jsx` + `createRoot`        | лозим нест — Next худаш иҷро мекунад       |
| `import.meta.env.DEV`            | `process.env.NODE_ENV === "development"`   |

### "use client" чист?

Дар Next.js компонентҳо **пешфарз дар сервер** иҷро мешаванд. Ҳар файле, ки
`useState`, `useEffect` ё `onClick` дорад, дар сатри аввал `"use client";`
менависад — ин ба Next мегӯяд, ки компонент дар браузер кор кунад.

`layout.js` компоненти сервер мондааст, барои ҳамин провайдерҳо ба файли
алоҳидаи `app/providers.jsx` бароварда шуданд.

### localStorage ва сервер

Дар сервер `localStorage`, `window` ва `document` вуҷуд надоранд. Барои ҳамин
дар `useTheme`, `useCart` ва `LanguageContext` хондани хотира ба дохили
`useEffect` кӯчонида шуд — саҳифа аввал бо арзиши пешфарз сохта мешавад ва
дар браузер арзиши захирашуда гузошта мешавад.

## Backend (json-server)

Тамоми маълумот аз як сервер гирифта мешавад — `http://localhost:8000`
(суроға дар `src/api/config.js`). Resource-ҳо:

| Resource       | Барои чӣ                    |
| -------------- | --------------------------- |
| `/users`       | корбарон, admin, superadmin |
| `/mahsulot`    | маҳсулоти бозор             |
| `/zamin`       | заминҳои иҷора              |
| `/ZaminApteka` | дорувори                    |
| `/jobs`        | дархостҳои харидорон        |
| `/notifications` | хабарномаҳои соҳибони мол |

Бе ин сервер саҳифаҳо холӣ намоён мешаванд (хатогӣ намедиҳанд).

## Хабарҳо ва пурсишҳо

`alert()` ва `confirm()`-и браузер дар лоиҳа **истифода намешаванд**.
Ба ҷои онҳо як модали ягона ҳаст:

```jsx
const dialog = useDialog();          // аз "../../context/dialog"

dialog.success(t("productAdded"));   // ✅ хабари сабз
dialog.error(t("error"));            // ⚠️ хабари сурх
dialog.info(t("orderNeedsAuth"));    // ℹ️ хабари оддӣ

// Пурсиш — true/false бармегардонад
const ok = await dialog.confirm({
  title: t("deleteProductConfirm"),
  description: t("actionIrreversible"),
  danger: true,
});
if (ok) { ... }
```

## Қоидаи муҳими CSS

Файлҳои `features/*/*.css` набояд тағйирёбандаҳои shadcn-ро дар `:root`
бознависӣ кунанд (`--primary`, `--border`, `--background`, `--foreground`
ва ғайра). Онҳо формати HSL доранд (`145 84% 34%`), на HEX. Барои токенҳои
саҳифавӣ префикси `--pg-*` истифода баред.

CSS-и ҳар саҳифа дар файли `app/<роҳ>/page.js` бор мешавад — масалан
`app/bozor/page.js` файли `features/bozor/bozor.css`-ро мегирад.

## Эзоҳҳои муҳим

- **Шаҳрҳо ва категорияҳо** аз `src/lib/catalog.js` гирифта мешаванд.
- **Тарҷумаҳо**: ҳангоми иловаи калиди нав ӯро ба ҳар се забон илова кунед —
  `src/locales/tj/`, `ru/`, `en/`. Ҳар забон 346 калид дорад.
- **Паролҳо** дар json-server бе шифр нигоҳ дошта мешаванд — танҳо барои
  лоиҳаи таълимӣ.
