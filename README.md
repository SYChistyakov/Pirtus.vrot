# PIRTUS.VROT investor site

Статический investor-facing сайт состава Heroes of the Storm. Сборка не требуется: HTML, CSS и JavaScript готовы для GitHub Pages.

## Локальный просмотр

Из папки `investor-site`:

```powershell
python -m http.server 4173
```

Откройте `http://localhost:4173`.

## Публикация на GitHub Pages

1. Создайте GitHub-репозиторий и поместите содержимое этой папки в его корень.
2. В GitHub откройте **Settings → Pages**.
3. В **Build and deployment** выберите **Deploy from a branch**.
4. Выберите ветку `main`, папку `/ (root)` и нажмите **Save**.

Сайт не зависит от CDN или серверной части. PDF-отчёт лежит в `assets/pirtus-vrot-scouting-report.pdf`.

## Ограничение данных

Визуализация построена по одному replay. Tier и аналитические индексы — скаутинговая интерпретация, а не официальный рейтинг. Это намеренно и явно указано на сайте.
