# Навигационный портал образовательного общества "Среда"

## Подготовка окружения

1. Ставим [nodejs](https://nodejs.org/en/)
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
4. Для билда статики используем `yarn build`
5. Для билда статики Storybook `yarn build:storybook`

## Переменные окружения

На текущий момент для корректной работы никакие переменные окружения не требуются.

## Флоу разработки

Заходите в [канбан](https://github.com/eachtech-dev/navhub/projects/1) и переводите нужную таску в In Progress и превращаете в issue. Локально создаете ветку, в ней работаете, затем пушите в свой форк и создаете PR. В PR в описание добавляете [ссылку](https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue) на закрываемый issue. Дожидаетесь CI и просите коллег провести code-review. Просите мейнтернера заревьюить и вмерджить PR после успешного CI.

На различные действия локально стоят хуки: при коммите [проверяется commit message](https://commitlint.js.org/#/) и [линтятся](https://eslint.org/) файлы, добавленные в коммит. При пуше локально проверяется весь проект. На созданные PR деплоится версия Storybook и превью статики Next льется на [Vercel](https://vercel.com). На каждый пуш в main также создаетеся production на Vercel и статика Storybook.
