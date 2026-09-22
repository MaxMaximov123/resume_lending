# Сайт-резюме — Максим Смирнов

Vue 3 · Vite · Tailwind CSS v4 · GSAP · Lenis

## Локальная разработка

```bash
npm install
npm run dev
```

## Деплой на VPS (Docker)

Нужны Docker и Docker Compose v2. Скопируйте проект на сервер (git clone / scp / rsync без `node_modules`).

### Вариант 1 — HTTP, по IP

```bash
docker compose up -d --build
```

Сайт будет на `http://<IP сервера>:8300`. Другой порт: `PORT=8080 docker compose up -d --build`.

### Вариант 2 — HTTPS с доменом (автосертификат Let's Encrypt)

1. A-запись домена указывает на IP сервера, порты 80 и 443 открыты.
2. Запуск:

```bash
cp .env.example .env   # впишите DOMAIN=ваш-домен.ru
docker compose -f docker-compose.yml -f docker-compose.https.yml up -d --build
```

### Обновление

```bash
git pull   # или заново скопируйте файлы
docker compose up -d --build            # (+ -f docker-compose.https.yml для HTTPS)
```

Логи: `docker compose logs -f` · Остановить: `docker compose down`
