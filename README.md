# AgroSmart — React version

Ин лоиҳа нусхаи **React (Vite)**-и сомонаи AgroSmart.tj мебошад, ки аз лоиҳаи аслии JavaScript (Vanilla JS) конвертатсия шудааст.

## Сохтори лоиҳа

```
src/
  main.jsx              — нуқтаи вуруд
  App.jsx               — routing (react-router-dom) + code-splitting
  index.css             — reset + токенҳои дизайн
  styles/               — tokens.css, theme.css (реҷаи торик/равшан), shadcn.css
  api/
    config.js           — BASE_URL-и json-server
    httpClient.js       — клиенти умумии CRUD
    usersApi / mahsulotApi / zaminApi / aptekaApi / jobsApi
  context/
    UserContext.jsx     — провайдери корбар
    user.js             — контекст + hook-и useUser
    LanguageContext.jsx — провайдери забон (tj / ru / en)
    language.js         — контекст + hook-и useTranslation
  hooks/
    useTheme.js         — реҷаи торик/равшан
    useCart.js          — сабади харид (Bozor, Zamin, Doruvori)
  lib/
    catalog.js          — рӯйхати ЯГОНАИ шаҳрҳо ва категорияҳо
    telegram.js         — пайвасти боти Telegram (Bozor + Zamin)
    images.js           — сурати захиравӣ
    utils.js            — cn() барои shadcn/ui
  components/
    shared/
      AppDialog.jsx     — ЯГОНА модали хабар/тасдиқ дар тамоми сайт
      DialogProvider.jsx— провайдери он (ба ҷои alert/confirm)
      Modal.jsx         — модали <dialog> барои формаҳои калон
      SettingsWidget.jsx— забон + реҷаи торик
    ui/                 — компонентҳои shadcn/ui
  locales/
    translations.js     — тарҷумаҳо (tj / ru / en, ҳар се баробар)
  pages/
    menu/ bozor/ zamin/ doruvori/ mushtari/ profile/ info/ auth/ admin/
    NotFoundPage.jsx    — саҳифаи 404
```

Ҳар компонент дар як файли алоҳида, камтар аз 200 сатр, бо номи фаҳмо навишта шудааст.

## Насб ва оғози кор

```bash
npm install
npm run dev
```

Сомона дар `http://localhost:5173` кушода мешавад.

## Backend (json-server)

Тамоми маълумот аз як сервер гирифта мешавад — `http://localhost:8000`
(суроға дар `src/api/config.js`). Resource-ҳо:

| Resource       | Барои чӣ                      |
| -------------- | ----------------------------- |
| `/users`       | корбарон, admin, superadmin   |
| `/mahsulot`    | маҳсулоти бозор               |
| `/zamin`       | заминҳои иҷора                |
| `/ZaminApteka` | дорувори                      |
| `/jobs`        | дархостҳои харидорон          |

Бе ин сервер саҳифаҳо холӣ намоён мешаванд (хатогӣ намедиҳанд).

## Скриптҳо

```bash
npm run dev       # сервери таҳиягарӣ
npm run build     # билди production
npm run preview   # дидани билди тайёр
npm run lint      # oxlint
```

## Хабарҳо ва пурсишҳо

`alert()` ва `confirm()`-и браузер дар лоиҳа **истифода намешаванд**.
Ба ҷои онҳо як модали ягона ҳаст:

```jsx
const dialog = useDialog();          // аз "../../context/dialog"

dialog.success(t("productAdded"));   // ✅ хабари сабз
dialog.error(t("error"));            // ⚠️ хабари сурх
dialog.info(t("botAlert"));          // ℹ️ хабари оддӣ

// Пурсиш — true/false бармегардонад
const ok = await dialog.confirm({
  title: t("deleteProductConfirm"),
  description: t("actionIrreversible"),
  danger: true,
});
if (ok) { ... }
```

## Қоидаи муҳими CSS

Файлҳои `pages/*/*.css` набояд тағйирёбандаҳои shadcn-ро дар `:root`
бознависӣ кунанд (`--primary`, `--border`, `--background`, `--foreground`,
`--secondary`, `--destructive`, `--muted`, `--accent`, `--card`, `--ring`,
`--radius`). Онҳо формати HSL доранд (`145 84% 34%`), на HEX. Агар HEX
гузошта шавад, `hsl(var(--primary))` вайрон мешавад ва ҳамаи тугмаҳои
shadcn ранги худро гум мекунанд. Барои токенҳои саҳифавӣ префикси
`--pg-*` истифода баред.

## Эзоҳҳои муҳим

- **Шаҳрҳо ва категорияҳо** аз `src/lib/catalog.js` гирифта мешаванд.
  Агар шаҳри нав илова кардан хоҳед — танҳо ҳамон ҷоро тағйир диҳед,
  ҳам филтрҳо ва ҳам формаҳо якҷоя нав мешаванд.
- **Тарҷумаҳо**: ҳангоми иловаи калиди нав ӯро ба ҳар се забон
  (`tj`, `ru`, `en`) илова кунед. Дар реҷаи dev калиди гумшуда дар console
  огоҳӣ медиҳад.
- **Toкенҳои боти Telegram** дар `src/lib/telegram.js` дар коди клиент ҳастанд —
  ин барои лоиҳаи таълимӣ мувофиқ аст, вале барои истифодаи воқеӣ фиристодани
  паём бояд ба backend кӯчонида шавад.
- **Паролҳо** дар json-server бе шифр нигоҳ дошта мешаванд — низ танҳо
  барои лоиҳаи таълимӣ.
