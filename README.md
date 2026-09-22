# Сайт-резюме — Максим Смирнов

Vue 3 · Vite · Tailwind CSS v4 · GSAP · Lenis

## Локальная разработка

```bash
npm install
npm run dev
```

## Деплой на VPS (Docker)

Нужны Docker и Docker Compose v2. Скопируйте проект на сервер (без `node_modules` и `dist`):

```bash
rsync -av --exclude node_modules --exclude dist ./ user@IP:~/cv-site/
```

Запуск на 80 порту:

```bash
cd ~/cv-site
docker compose up -d --build
```

Сайт будет доступен по `http://<домен или IP>`. Другой порт: `PORT=8080 docker compose up -d --build`.

Обновление — скопировать новые файлы и повторить `docker compose up -d --build`.
Логи: `docker compose logs -f` · Остановить: `docker compose down`
