# Навигационный портал образовательного общества "Среда"

## Подготовка окружения

1. Ставим [nodejs](https://nodejs.org/en/) (или сразу [nvm](https://github.com/nvm-sh/nvm))
2. Ставим [yarn](https://yarnpkg.com/)
3. Форкаем эту репу, клонируем себе
4. Опционально [добавляем себе SSH ключи](https://only-to-top.ru/blog/tools/2019-12-08-git-ssh-windows.html), чтобы каждый раз не вводить пароль от GitHub
5. Добавляем upstream: `git remote add upstream git@github.com:eachtech-dev/navhub.git` (или по прямой ссылке без SSH)
6. Подключаем хуки git: `yarn husky install`

## Локальная разработка

1. Устанавливаем зависимости

```bash
  yarn
  # или
  yarn deps
```

2. Для запуска сервера разработки [Next](https://nextjs.org/) используем `yarn dev`
3. Для локального поднятия [Storybook](https://storybook.js.org/) пишем `yarn storybook`
4. Для билда Next используем `yarn build`
5. Для экспорта статики Next используем `yarn export`
6. Для билда статики Storybook `yarn build:storybook`
7. Для билда отдельной версии [Docker](https://www.docker.com/) `yarn build:docker -t <TAG>`
8. Для запуска [композиции Docker-контейнеров](https://docs.docker.com/compose/) приложения с панелью администрирования `POSTGRES_PASSWORD=<pwd> <...> yarn start:docker`
9. Для экспорта статики и деплоя её в surge используем `yarn surge`. Вам будет предложено указать поддомен для деплоя в терминале. Можно оставить по-умолчанию, для быстрого просмотра результата в процессе разработки

## Переменные окружения

Для корректной работы с бэкендом нужно скопировать файл `.env.example` с именем `.env` и указать в переменной `API_URL` адрес [бэкенда](https://github.com/eachtech-dev/navhub-admin).

## Архитектура проекта

Подробно про архитектуру проекта написано в [ARCHITECTURE.md](ARCHITECTURE.md)

## Флоу разработки

Заходите в [канбан](https://github.com/eachtech-dev/navhub/projects/1) и переводите нужную таску в In Progress и превращаете в issue. Локально создаете ветку, в ней работаете, затем пушите в свой форк и создаете PR. В PR в описание добавляете [ссылку](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) на закрываемый issue. Чтобы задеплоить превью вебсайта, нужно добавить лейбл `preview` на PR. Робот автоматически запрашивает ревью от 2 коллег, одобрения которых потребуются для успешного принятия PR. Если после ревью коллег PR все еще не посмотрел мейнтейнер, то просите его заревьюить и вмерджить PR.

На различные действия локально стоят хуки: при коммите [проверяется commit message](https://commitlint.js.org/#/) и [линтятся](https://eslint.org/) файлы, добавленные в коммит. При пуше локально проверяется весь проект. На созданные PR деплоится версия Storybook и линтится и тестируется проект. На каждый пуш в main также билдится и пушится в GitHub Container Registry Docker-контейнер и заливается статика Storybook, а также раскатывается прод на [Surge.sh](https://surge.sh/).
