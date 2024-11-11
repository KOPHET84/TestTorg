# Auction App 

## О проекте

Это приложение для аукциона, позволяющее пользователям делать ставки на товары в реальном времени. Администратор может управлять аукционами, включая возможность начинать и завершать торги с использованием специального пароля. Приложение построено с использованием Node.js и поддерживает работу через команду `npm run start`.

## Структура проекта

* `src` - Клиентская часть на React (если используется)
  * `components` - React компоненты
  * `index.js` - Точка входа клиентской части
* `server` - Серверная часть на Node.js
  * `server.js` - Точка входа серверной части
* `public` - Статические файлы
* `build` - Файлы, готовые к развертыванию в продакшн
* `package.json` - Настройки проекта

## Установка и запуск

### Запуск сервера

1. Запустите сервер командой:

   ```bash
   node server.js

2. Запуск клиента

    Запустите клиент с помощью команды:

    npm run start

### Основные функции
### Для пользователей
    Возможность делать ставки на товары в аукционе
    Просмотр текущих ставок и времени до завершения аукциона
    Получение уведомлений о новых ставках
### Для администратора
    Возможность начинать и завершать торги для каждого лота
    Уникальный пароль администратора для управления аукционами
**Используемые технологии**
---------------------
    Node.js
    Socket.IO 
    React 
	react-router-dom
**Конфигурация**
---------
    Пароль администратора настраивается в файле конфигурации или через переменные окружения.
    Все переменные окружения хранятся в файле .env.

**Авторы**
---------
    KOPHET84

**Лицензия**
---------
    [Информация о лицензии]

Этот README предоставляет общий обзор проекта. Если у вас есть вопросы или вам нужна дополнительная помощь, не стесняйтесь обращаться!