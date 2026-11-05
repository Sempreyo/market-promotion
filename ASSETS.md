# Источники изображений и иконок

## Фотографии

Обе фотографии взяты с **Pexels** и используются по [Pexels License](https://www.pexels.com/license/)
(бесплатно, в том числе для коммерческого использования, без обязательной атрибуции).

| Файл | Источник |
| --- | --- |
| `promo-team.jpg` | Pexels, photo 7688336 — деловая встреча / работа с метриками |
| `promo-cta.jpg` | Pexels, photo 325229 — дата-центр, серверные стойки |

Изображения загружены локально (без hotlink) и оптимизированы: JPG + WebP (качество 82)
генерируется gulp-задачей `imagesWebp`.

## Логотипы

Логотипы компаний и логотип CNewsMarket загружены с публичного сайта CNews Market
(static2.cnews.ru / filearchive.cnews.ru) и используются как демонстрационный контент
раздела «Предложение месяца». Для продакшена права на использование логотипов должны
быть подтверждены партнёрами размещения.

| Файл | Источник |
| --- | --- |
| `logo-cnewsmarket.png` | filearchive.cnews.ru/img/cnews/2020/04/15/logomarket.png |
| `logos/bpm.png` | static2.cnews.ru/img/market/company/logo/62d158532165e.png |
| `logos/megafon.png` | static2.cnews.ru/img/market/company/logo/644bf97d36e71.png |
| `logos/mtt.png` | static2.cnews.ru/img/market/company/logo/603f8c2d00d66.png |
| `logos/cloud.png` | filearchive.cnews.ru/img/market/company/logo/69317fadf2c0f.png |

## Иконки

Иконки в `src/icons/` нарисованы для проекта в стиле [Lucide](https://lucide.dev) (лицензия ISC):
контур 1.6 px, сетка 24×24. Собираются в спрайт `public/images/sprite.svg`
(gulp-задача `icons`) и подключаются миксином `+icon('name')`.

## Шрифты

**Open Sans** (400–700) и **Montserrat** (600–700) — Google Fonts, лицензия SIL Open Font License 1.1.
Файлы woff2 (cyrillic + latin) лежат в `src/fonts/google/` и подключены локально,
без запросов к внешним CDN.