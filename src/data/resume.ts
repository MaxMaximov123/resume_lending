import type { Component } from 'vue'
import {
  Bot,
  BrainCircuit,
  ChartLine,
  Code,
  Database,
  GitBranch,
  Monitor,
  Server,
  Workflow,
} from 'lucide-vue-next'

export const profile = {
  firstName: 'Максим',
  lastName: 'Смирнов',
  roles: ['Архитектор', 'Разработчик', 'Аналитик'],
  about: [
    'Занимаюсь разработкой более пяти лет, работаю на стыке web-разработки и анализа данных. Создаю backend-системы, frontend-интерфейсы, Telegram-ботов, внутренние desktop-инструменты, а также решаю задачи обработки данных — от предобработки до визуализации.',
    'Сторонник аккуратной инженерии: ясной архитектуры, прозрачной логики и решений, которые удобно масштабировать и поддерживать.',
  ],
  hobbies: ['Хакатоны и олимпиады', 'Проектная деятельность', 'Спорт'],
}

export const stats = [
  { value: 5, suffix: '+', label: 'лет в разработке' },
  { value: 20, suffix: '+', label: 'завершённых проектов' },
  { value: 96, suffix: '', label: 'баллов ЕГЭ по математике' },
  { value: 115, suffix: '/120', label: 'рейтинг в Лицее Яндекса' },
]

export interface Skill {
  title: string
  icon: Component
  accent: string
  description: string
  tags: string[]
}

export const skills: Skill[] = [
  {
    title: 'Языки',
    icon: Code,
    accent: '#ff2d55',
    description: 'Основной стек для backend, скриптов и анализа данных.',
    tags: ['JavaScript', 'Python', 'Go · beginner'],
  },
  {
    title: 'Web & Frontend',
    icon: Monitor,
    accent: '#a855f7',
    description: 'Интерфейсы и серверная логика на JavaScript-экосистеме.',
    tags: ['Node.js', 'Express', 'Vue.js', 'Quasar.js', 'Vuetify'],
  },
  {
    title: 'Анализ данных',
    icon: ChartLine,
    accent: '#22d3ee',
    description: 'От предобработки сырых данных до наглядной визуализации.',
    tags: ['NumPy', 'Pandas', 'Matplotlib'],
  },
  {
    title: 'Базы данных',
    icon: Database,
    accent: '#3b82f6',
    description: 'Проектирование схем, запросы, кеширование и ORM.',
    tags: ['PostgreSQL', 'MySQL', 'SQLite', 'Redis', 'Knex', 'SQLAlchemy'],
  },
  {
    title: 'API',
    icon: Workflow,
    accent: '#ff4fd8',
    description: 'Синхронное и real-time взаимодействие сервисов.',
    tags: ['REST', 'WebSocket'],
  },
  {
    title: 'DevOps',
    icon: GitBranch,
    accent: '#f97316',
    description: 'Контейнеризация, деплой и автоматизация поставки.',
    tags: ['Git', 'Docker', 'Nginx', 'CI/CD', 'GitLab', 'GitHub'],
  },
  {
    title: 'Telegram-боты',
    icon: Bot,
    accent: '#38bdf8',
    description: 'Боты для частного и коммерческого использования.',
    tags: ['aiogram', 'python-telegram-bot', 'pyTelegramBotAPI'],
  },
  {
    title: 'Desktop',
    icon: Server,
    accent: '#10b981',
    description: 'Внутренние инструменты с нативным интерфейсом.',
    tags: ['PyQt'],
  },
  {
    title: 'Архитектура',
    icon: BrainCircuit,
    accent: '#eab308',
    description: 'Микросервисы, IoT и обработка видеопотоков.',
    tags: ['Микросервисы', 'ESP8266', 'Arduino', 'RTSP / CV'],
  },
]

export interface TimelineItem {
  period: string
  title: string
  place?: string
  text: string
  kind: 'work' | 'edu'
  highlight?: string
}

export const experience: TimelineItem[] = [
  {
    period: '2022 — 2026',
    title: 'Фриланс',
    kind: 'work',
    highlight: '20+ проектов',
    text: 'Более 20 успешно завершённых проектов разной сложности: Telegram-боты для частного и коммерческого использования, дашборды для малого бизнеса, системы автоматического сбора, анализа и хранения информации.',
  },
  {
    period: '2023 — 2024',
    title: 'Стартап: маппинг спортивных событий',
    kind: 'work',
    text: 'Разработка системы связывания спортивных событий разных букмекеров на основе хронологии коэффициентов.',
  },
  {
    period: 'Pet-проект',
    title: 'Проект умного дома',
    kind: 'work',
    text: 'Система умного дома на базе контроллеров ESP8266 и Arduino с собственной микросервисной архитектурой. Распознавание и обработка образов с RTSP-потока.',
  },
  {
    period: 'Pet-проекты',
    title: 'Личные проекты',
    kind: 'work',
    text: 'Несколько успешных пет-проектов, часть из них — в активной разработке.',
  },
]

export const education: TimelineItem[] = [
  {
    period: 'Сентябрь 2025 — Август 2029',
    title: 'МГТУ им. Н. Э. Баумана',
    place: 'Кафедра ИУ7',
    kind: 'edu',
    text: 'Направление «Программная инженерия».',
  },
  {
    period: '2021 — 2023',
    title: 'Лицей Академии Яндекса',
    kind: 'edu',
    highlight: '108 и 115 / 120',
    text: 'Два диплома с отличием, рейтинговые баллы: 108 и 115 из 120.',
  },
  {
    period: 'Выпуск 2025',
    title: 'МАОУ Лицей №131, г. Казань',
    kind: 'edu',
    highlight: 'ЕГЭ 96 · 90 · 92 · 94',
    text: 'Баллы ЕГЭ: математика 96, информатика 90, физика 92, русский язык 94.',
  },
]

export const contacts = {
  phone: '+7 (917) 879-11-39',
  phoneHref: 'tel:+79178791139',
  email: 'maxss.kzn@gmail.com',
  telegram: '@kotik594',
  telegramHref: 'https://t.me/kotik594',
  github: 'MaxMaximov123',
  githubHref: 'https://github.com/MaxMaximov123',
}
