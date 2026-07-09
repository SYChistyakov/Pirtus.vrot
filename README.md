# PIRTUS.VROT investor site

Статический investor-facing сайт состава Heroes of the Storm. Сборка не требуется: HTML, CSS и JavaScript готовы для GitHub Pages.

**Live:** https://sychistyakov.github.io/Pirtus.vrot/

## Локальный просмотр

Из папки `investor-site`:

```powershell
python -m http.server 4173
```

Откройте `http://localhost:4173`.

## Публикация

Каждый push в `main` автоматически публикуется через workflow `.github/workflows/pages.yml`.

Сайт не зависит от CDN или серверной части. PDF-отчёт лежит в `assets/pirtus-vrot-scouting-report.pdf`.

## Ограничение данных

Визуализация построена по одному replay. Tier и аналитические индексы — скаутинговая интерпретация, а не официальный рейтинг. Это намеренно и явно указано на сайте.
