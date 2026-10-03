# Ответы на вопросы

## ПР1
1. Рабочая папка, индекс, репозиторий.
2. git add — в индекс, commit — фиксирует, push — отправляет.
3. Информативные сообщения помогают понимать историю.
4. add имя_файла — один файл; add . — все.
5. git status показывает состояние.
6. remote add origin URL — привязка к удалённому.
7. -u устанавливает upstream.
8. main или master.
9. git log — история.
10. Изменения не попадут в коммит без add.

## ПР2
1. Теги по смыслу, SEO, доступность.
2. article — сам блок, section — раздел.
3. Могут использоваться несколько раз.
4. main — основной контент.
5. nav — навигация.
6. datetime — машинная дата.
7. figure/figcaption — подпись.
8. aside — дополнительный контент.
9. Улучшает SEO и доступность.
10. header, nav, main, article, section, aside, footer.

## ПР3
1. Класс — многократно, ID — уникальный.
2. важность -> специфичность -> порядок.
3. ul li.important = 0,1,2; #site-title = 1,0,0; .content > .featured-post = 0,2,0.
4. Наследуются: color, font-family, line-height. Нет: margin, padding, border.
5. > — прямой потомок, пробел — любой.
6. :hover — наведение; :nth-child() — по порядку.
7. Переопределяет всё, осторожно.
8. ::before/::after добавляют контент.
9. Последнее правило побеждает.
10. DevTools показывают применённые стили.

## ПР4
1. display: flex.
2. justify-content — главная, align-items — поперечная.
3. flex-direction задаёт ось.
4. flex: 1 = grow:1, shrink:1, basis:0.
5. flex-wrap переносит.
6. align-content для многострочных.
7. order меняет порядок.
8. main / cross axis.
9. Через flex-wrap и flex-basis.
10. gap удобнее margin.

## ПР5
1. display: grid.
2. grid-template-columns — явные, grid-auto-columns — неявные.
3. repeat, minmax, auto-fit.
4. Упрощают разметку.
5. Нумерация с 1.
6. gap без margin.
7. Выравнивание внутри ячеек.
8. auto-fill оставляет пустые, auto-fit растягивает.
9. Визуальное описание макета.
10. Удобнее для двумерных макетов.

## ПР6
1. Корректное масштабирование.
2. Fluid, Adaptive, Responsive.
3. Сначала мобильные стили.
4. rem, %, vw/vh, clamp.
5. Адаптивный шрифт.
6. 1200 / 1024 / 768 / 480.
7. @media.
8. max-width для десктопа, min-width для Mobile First.
9. max-width: 100%.
10. Режим адаптивного дизайна.

## ПР7
1. required, minlength, pattern, type.
2. Отключает встроенную валидацию.
3. label с for.
4. email, tel, password, date.
5. Регулярное выражение.
6. blur, input, submit.
7. aria-live, role="alert".
8. fieldset/legend.
9. Сравнение в JS.
10. :valid, :invalid, :focus.

## ПР8
1. Inspect, Dev Mode.
2. CSS-переменные в :root.
3. Размеры, отступы, шрифты, цвета.
4. Grid/Flexbox по макету.
5. px vs rem.
6. Медиа-запросы.
7. DevTools.
8. SVG, PNG, WebP.
9. Веб-безопасные или Google Fonts.
10. Дизайн-токены.

## ПР9
1. O(n) — линейная, O(n^2) — квадратичная.
2. Делит массив пополам — O(log n).
3. Простая, но медленная.
4. До sqrt(n).
5. Рекурсия / итерация.
6. console.log, debugger.
7. O(log n).
8. Пустые массивы, отрицательные.
9. Set.
10. Читаемость, комментарии.

## ПР10
1. Declaration поднимается, Expression — нет.
2. rest — массив, arguments — объект.
3. Доступ к внешней области.
4. Рекурсия / итерация.
5. map, filter, reduce.
6. Разбиение на унарные.
7. Кэш результатов.
8. debounce откладывает, throttle ограничивает.
9. yield, ленивые.
10. Чистые функции.

## ПР11
1. innerHTML — HTML, textContent — текст.
2. Обработчик на родителе.
3. getElementById, querySelector, querySelectorAll.
4. preventDefault.
5. classList методы vs className строка.
6. createElement + appendChild.
7. Всплытие, stopPropagation.
8. FormData.
9. input / change / keyup.
10. DocumentFragment.

## ПР12
1. preventDefault / stopPropagation.
2. Меньше обработчиков.
3. Capturing -> target -> bubbling.
4. target источник, currentTarget где обработчик.
5. new CustomEvent.
6. debounce / throttle.
7. removeEventListener.
8. onerror, onload.
9. Несколько обработчиков.
10. Делегирование, passive.

## ПР13
1. then/catch vs async/await.
2. Все или ошибка.
3. all / race / allSettled.
4. Retry с задержкой.
5. Одновременный доступ.
6. Кэш с TTL.
7. Параллельно, кэш.
8. .catch() в конце.
9. Читаемость.
10. Network, Sources.

## ПР14
1. Fetch промисы, XHR события.
2. Fetch не reject при 404.
3. GET, POST, PUT, PATCH, DELETE.
4. Headers API.
5. PUT полная, PATCH частичная.
6. Bearer / Basic.
7. AbortController.
8. .json(), .text(), .blob(), .formData().
9. Promise.all, кэш.
10. Обработка ошибок, таймауты, retry.
