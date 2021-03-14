# Архитектура проекта

## Файловая структура

```bash
├── src
│   ├── components # папка со всеми React компонентами
│   │   └── button
│   │       ├── button.component.tsx
│   │       ├── button.tokens.yml
│   │       ├── button.module.css
│   │       ├── button.stories.tsx
│   │       ├── button.test.tsx
│   │       └── index.ts
│   ├── hooks # кастомные React-хуки
│   │   └── useToggle
│   │       ├── useToggle.hook.ts
│   │       ├── useToggle.test.ts
│   │       └── index.ts
│   ├── types # кастомные типы
│   │   ├── config.ts # тип для конфига
│   │   └── translations.ts # типы для переводов
│   ├── global # глобальные стили
│   │   ├── styles # глобальные css-файлы
│   │   │   ├── index.css # импорт других глобальных css-файлов
│   │   │   ├── media.css # объявления breakpoint-ов postcss-custom-media
│   │   │   └── reset.css # сброс браузерных стилей по-умолчанию (margin, padding)
│   │   └── themes
│   │       ├── presets # директория с темами стилей
│   │       ├── tokens # директория с yaml файлами определения переменных стилей
│   │       │   └── typography.tokens.yml # yaml файл с определениями переменных типографии (шрифты, размеры)
│   │       ├── light.theme.json # определение соответствия токенов теме
│   │       └── presets.css # глобальный файл с импортами тем
│   ├── pages # директория с страницами Next.js
│   │   ├── _document.tsx # настройка разметки генерируемого html документа
│   │   ├── _app.tsx # настройка обертки других страниц
│   │   └── index.tsx # основная страница вебсайта
│   └── utils # директория с различными хелперами
│       ├── config.ts # конфиг приложения
│       ├── fetch.ts # метод fetch для http запросов
│       └── cn.ts # хелпер для генерирования имен CSS классов из CSS module по BEM
├── .husky # настройка git хуков с помощью husky
├── .storybook # директория настроек Storybook
│   ├── main.js # настройка Storybook: аддоны, сторисы и т.д.
│   └── preview.js # глобальные импорты для превью Storybook
├── .github # настройка автоматизации (CI) Github
│   └── workflows # настройка GitHub Actions
│       ├── chromatic.yml # GitHub Action для загрузки Storybook на Chromatic
│       └── node-ci.yml # GitHub Action для проверки кода с помощью линтеров (yarn lint) и тестов (yarn test)
│       └── docker.yml # GitHub Action для сборки Docker контейнера и пуша его в GitHub Organization Container Registry
├── public # изображения, шрифты и т.д.
├── scripts # вспомогательные bash, node, py и т.д. скрипты
│   └── prepare-translations.sh # скрипт для подготовки переводов для деплоя Chromatic
├── @types # директория с файлами декларации типов *.d.ts для добавления типизации, например, библиотекам без поддержки типов
│   └── index.d.ts
├── .env.example # пример файла с переменными окружения
├── .env.docker # переменные окружения по умолчанию для docker-compose
├── Dockerfile # файл для сборки Docker образа приложения
├── docker-compose.yml # композиция Docker-сервисов для деплоя приложения
├── nginx.conf # настройка прокси на nginx
├── README.md
├── ARCHITECTURE.md
├── package.json
└── .gitignore
```

## Компоненты

### Структура компонента

```bash
└── button
    ├── button.component.tsx # 1
    ├── button.tokens.yml # 2
    ├── button.module.css # 3
    ├── button.stories.tsx # 4
    ├── button.test.tsx # 5
    └── index.ts # 6
```

### Описание файлов

1. Файл с описанием функционального компонента

<details>
    <summary>
      Подробное описание
    </summary>

```ts
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'; // первый импорт всегда React

import { classnames } from '@bem-react/classnames'; // импорт хелпера для комбинирования нескольких класснеймов
import { cn } from 'utils/cn'; // импорт хелпера для генерации класснеймов по методологии BEM из CSS Module файла

import styles from './button.module.css'; // импорт CSS Module

export const cnButton = cn('button', styles); // экспорт хелпера для генерации класснеймов из CSS Module

// типы пропсов компонента - все типы префиксируются T, все пропсы суффиксируются Props
export type TButtonProps = {
    view?: 'primary' | 'secondary';
    size?: 's' | 'm' | 'l';
} & DetailedHTMLProps<
    // помимо наших пропсов, кнопка должна уметь принимать нативные пропсы
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

// сам компонент - низкоуровневый, используем forwardRef, для пробрасывания ref нативному  HTML элементу
const Button = React.forwardRef<HTMLButtonElement, TButtonProps>(
    ({ view = 'secondary', size = 'm', className, ...props }, ref) => {
        return (
            <button
                {...props}
                ref={ref}
                // создаем имя класса с помощью БЕМ хелпера и комбинируем с прокидываемым извне
                className={classnames(cnButton({ view, size }), className)}
            />
        );
    },
);

// forwardRef компонентам нужен displayName
Button.displayName = 'Button';

// сам компонент всегда default экспорт из файла
export default Button;
```

</details>

2. Yaml файл с токенами, конвертируемыми в CSS-переменные

<details>
    <summary>
      Подробное описание
    </summary>

```yml
button: # верхний уровень - имя компонента
    padding: # каждый новый уровень добавляет - к имени (`button-padding`)
        value: 8px # само значение переменной
    borderRadius:
        value: 4px;
    size:
        s:
            height: # button-size-s-height
                value: 24px
        m:
            height:
                value: 32px
        l:
            height:
                value: 48px
```

</details>

3. CSS module со стилями для компонента

<details>
  <summary>
    Подробное описание
  </summary>

```css
.button {
    /* сначала идет сам блок */
    display: flex;
    height: var(--button-height);
    align-items: center;
    justify-content: center;
    padding: var(--button-padding);
    border: none;
    border-radius: var(--button-border-radius);
    outline: none;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.button:hover {
    /* далее состояния */
    box-shadow: 0 2px 0 0 #000;
    transform: translateY(-2px);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.button:focus {
    box-shadow: var(--ring-box-shadow), 0 2px 0 0 #000;
    transform: translateY(-2px);
    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
}

.button:active {
    box-shadow: none;
    transform: none;
}

.button:active:focus {
    box-shadow: var(--ring-box-shadow);
}

.button-text {
    /* элемент */
    color: var(--typography-font-color);
}

.button-text_disabled {
    /* мод элемента */
    color: var(--typography-font-disabled-color);
}

.button_view_primary {
    /* моды блока */
    background-color: var(--color-primary);
    color: #fff;
}

.button_view_secondary {
    background-color: var(--color-secondary);
}

.button_size_s {
    --button-height: var(--button-size-s-height);
}

.button_size_m {
    --button-height: var(--button-size-m-height);
}

.button_size_l {
    --button-height: var(--button-size-l-height);
}
```

</details>

4. Файл с описанием stories для Storybook. Все stories имеют snapshot тесты в Chromatic

<details>
  <summary>
    Подробное описание
  </summary>

```ts
import React from 'react';
import { Story, Meta } from '@storybook/react';

import Button from './button.component';

export default {
    // мета стори
    title: 'Components/Button', // имя стори (/ добавляет директорию)
    component: Button, // сам компонент
    argTypes: {
        // переключаемые в интерфейсе параметры (пропсы)
        label: { control: 'text', defaultValue: 'Click me!' },
        view: {
            control: { type: 'select', options: ['primary', 'secondary'] },
        },
        size: {
            control: { type: 'select', options: ['s', 'm', 'l'] },
            defaultValue: 'm',
        },
    },
    decorators: [
        // декораторы, для добавления дополнительной разметки/логики сторям
        (Story) => (
            <div style={{ padding: 5 }}>
                <Story />
            </div>
        ),
    ],
} as Meta;

// шаблон, используемый для всех стори
const Template: Story = ({ label, ...args }) => (
    <Button {...args}>{label}</Button>
);

// далее сами сторисы

export const Primary = Template.bind({});
Primary.args = {
    view: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
    view: 'secondary',
};

export const Large = Template.bind({});
Large.args = {
    size: 'l',
};

export const Medium = Template.bind({});
Medium.args = {
    size: 'm',
};

export const Small = Template.bind({});
Small.args = {
    size: 's',
};

// далее состояния (в идеале есть все комбинации состояний и view)

export const Hover = Template.bind({});
Hover.parameters = {
    pseudo: { hover: true },
};

export const Focus = Template.bind({});
Focus.parameters = {
    pseudo: { focus: true },
};

export const Active = Template.bind({});
Active.parameters = {
    pseudo: { active: true },
};

export const HoverActive = Template.bind({});
HoverActive.parameters = {
    pseudo: { active: true, hover: true },
};

export const FocusActive = Template.bind({});
FocusActive.parameters = {
    pseudo: { active: true, focus: true },
};

export const HoverFocusActive = Template.bind({});
HoverFocusActive.parameters = {
    pseudo: { active: true, hover: true, focus: true },
};
```

</details>

5. Файл с unit-тестами jest и react-testing-library, тестирующий внешнее поведение компонента
6. Файл, реэкспортирующий содержание button.component.tsx для сокращенного импорта (`import Button from 'components/button'`)

<details>
  <summary>
    Подробное описание
  </summary>

```ts
export { default } from './button.component'; // реэкспорт дефолтного экспорта (самого компонента)
export * from './button.component'; // реэкспорт всего остального (пропсы, хелпер класснейма и т.д.)
```

</details>

## Хуки

### Структура хука

```bash
└── useToggle
    ├── useToggle.hook.ts # 1
    ├── useToggle.test.ts # 2
    └── index.ts # 3
```

### Описание файлов

1. Файл с описанием хука

<details>
  <summary>
    Подробное описание
  </summary>

```ts
import { useCallback, useState } from 'react';

// создаем отдельный тип для хука (явно типизируем возвращаемый кортеж)
export type TUseToggle = (defaultValue?: boolean) => [boolean, () => void];

// сам хук - чистая стрелочная функция
const useToggle: TUseToggle = (defaultValue) => {
    const [value, setValue] = useState<boolean>(Boolean(defaultValue));

    const toggle = useCallback(() => {
        setValue((value) => {
            return !value;
        });
    }, [setValue]);

    return [value, toggle];
};

// дефолтный экспорт - сам хук
export default useToggle;
```

</details>

2. Файл с тестами поведения хука

<details>
  <summary>
    Подробное описание
  </summary>

```ts
/**
 * @jest-environment jsdom
 * выставляем браузерное окружение необходимое для эмуляции работы хуков
 */

import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from './useToggle.hook';

// высокоуревный test suite - describe компонента
describe('useToggle', () => {
    // тест кейс - строка описания и стрелочная функция тест
    it('has false as default value if unspecified', () => {
        // renderHook из react-testing-library/react-hooks
        const { result } = renderHook(() => useToggle());

        expect(result.current[0]).toBe(false);
    });

    // стараемся изолированно проверить все возможные состояния
    it('applies default true value', () => {
        const { result } = renderHook(() => useToggle(true));

        expect(result.current[0]).toBe(true);
    });

    it('applies default false value', () => {
        const { result } = renderHook(() => useToggle(false));

        expect(result.current[0]).toBe(false);
    });

    it('toggles value', () => {
        const { result } = renderHook(() => useToggle(false));

        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(true);

        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(false);
    });
});
```

</details>

3. Файл реэкспорта

<details>
  <summary>
    Подробное описание
  </summary>

```ts
export { default } from './useToggle.hook'; // реэкспорт дефолтного экспорта (самого хука)
export * from './useToggle.hook'; // реэкспорт всего остального
```

</details>

## Контейнеризация

Для приложения собирается отдельный образ при помощи Dockerfile и пушится в GitHub Container Registry на каждый пуш в ветку `main`. Такая же процедура происходит для панели администрирования. Собранные образы используются в `docker-compose.yml`. Для проксирования запросов между приложениями используется прокси на [nginx](https://nginx.org/) и файл конфигурации `nginx.conf`.

<details>
  <summary>
    Подробное описание
  </summary>

```yml
version: '3.1'

services:
    # прокси для переадресации запросов в соответствии с запрошенным URI
    nginx:
        image: nginx:latest
        # подключаем собственную настройку nginx
        volumes:
            - ./nginx.conf:/etc/nginx/conf.d/default.conf
        # делаем доступным наружу порт 80
        ports:
            - 80:80
        # nginx зависит от hosts, выставляемым в внутренней сети Docker при запуске других контейнеров
        depends_on:
            - web
            - admin
    # Next.js приложение
    web:
        image: ghcr.io/eachtech-dev/navhub:${WEB_TAG}
        environment:
            # используем адрес другого контейнера
            - API_URL=http://admin:8000
            - PORT=3000
        ports:
            - 3000:3000
        # для запуска требует, чтобы контейнер с админкой был уже запущен
        depends_on:
            - admin
    # бэк/панель администрирвоания
    admin:
        image: ghcr.io/eachtech-dev/navhub-admin:${ADMIN_TAG}
        environment:
            # собираем URL для подключения к базе posgres из переменных окружения
            - DATABASE_URL=postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
            - PORT=8000
        ports:
            - 8000:8000
        # ждем запуска базы данных до запуска админки
        depends_on:
            - db
    # база данных postgres
    db:
        image: postgres:11.2
        # передаем переменные окружения для настройки БД
        environment:
            - POSTGRES_USER=${POSTGRES_USER}
            - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
            - POSTGRES_DB=${POSTGRES_DB}
        volumes:
            # подключаем постоянный volume для сохранения данных
            - db-data:/var/lib/postgresql/data
        ports:
            - 5432:5432

# постоянный volume для хранения данных
volumes:
    db-data:
```

```bash
server {
    listen 80;
    listen [::]:80;

    access_log stdout;
    error_log stderr;

    # проксируем запросы по регулярному выражению
    location ~ ^/(admin|content-manager|content-type-builder|upload|users-permissions)/ {
      proxy_pass http://admin:8000;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

    # все остальные запросы проксируем на приложение Next.js
    location / {
      proxy_pass http://web:3000;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }

}

```

</details>

## Страницы

Вебсайт представлен одной единственной страницей `src/pages/index.tsx`. Страницы статична и использует incremental static rendering - страница периодически ревалидируется, подгружая новую информацию с бекенда.

## Переводы

Весь текст на сайте должен быть легко редактируем без пересборки и деплоя проекта. Для этого используется ревалидация статических страниц и интернационализация [react-intl](https://formatjs.io/docs/react-intl). Текст можно разместить прямо в разметке jsx с помощью компонента `FormattedMessage` (например, `<FormattedMessage id="index.title-block.heading" />`). В том числе поддерживаются значения по умолчанию и переменные внутри текста (шаблонные выражения вместе со склонениями). Для легкого редактирования ссылок также используется react-intl и хук `useIntl()`, который позволяет получить объект `intl` и его методы форматирования сообщений.

Схема объекта переводов следующая:

```json
{
    "ru": {
        "index.title-block.heading": "Добро пожаловать!",
        "index.title-block.description": "Lorem ipsum dolore sit ame",
        "index.title-block.link": "https://eachtech.online"
    },
    "en": {}
}
```

В качестве ключей для переводов используются lowercase строки на английском языке, кратко описывающие иерархию текстов.

## Бэкенд (REST API)

Для бэкенда и по совместительству для админки используется Headless CMS [Strapi](https://strapi.io) в отдельном [репозитории](https://github.com/eachtech-dev/navhub-admin). Для запуска вебсайта требуется проставить переменную окружения `API_URL` в `.env`.
