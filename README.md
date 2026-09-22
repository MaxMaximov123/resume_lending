# Сайт-резюме — Максим Смирнов

Vue 3 · Vite · Tailwind CSS v4 · GSAP · Lenis

## Локальная разработка

```bash
npm install
npm run dev
```

## Деплой на VPS (Docker, HTTPS)

Нужны Docker и Docker Compose v2. Скопируйте проект на сервер (без `node_modules` и `dist`):

```bash
rsync -av --exclude node_modules --exclude dist --exclude certs ./ user@IP:~/cv-site/
```

Положите файлы сертификата провайдера в папку `certs/` **на сервере**:

```
certs/fullchain.pem   # сертификат сайта + промежуточные сертификаты (цепочка), в таком порядке
certs/privkey.pem     # приватный ключ, без пароля
```

```bash
chmod 600 certs/privkey.pem
docker compose up -d --build
```

Сайт откроется по `https://<домен>`, запросы на `http://` перенаправляются на HTTPS.
Другие порты: `HTTP_PORT=8080 HTTPS_PORT=8443 docker compose up -d --build`.

После обновления сертификата (раз в год): заменить файлы в `certs/` и выполнить `docker compose restart`.

Обновление сайта — скопировать новые файлы и повторить `docker compose up -d --build`.
Логи: `docker compose logs -f` · Остановить: `docker compose down`
