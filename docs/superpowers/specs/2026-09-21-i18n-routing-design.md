# Routing językowy w URL-u (`/pl`, `/en`) — design

Data: 2026-09-21 · Status: zatwierdzony w rozmowie, do implementacji

## Cel

Język jest częścią adresu każdej strony. Dziś blog ma `/blog/<lang>/<slug>`, a `/about` i `/projects` nie mają języka wcale; język żyje w `useState` w `_app` i cookie czytanym w `useEffect`, więc HTML zawsze jest po angielsku, a crawler i podglądy linków nie widzą polskiej wersji.

## Decyzje

| Temat | Decyzja |
|---|---|
| Schemat URL | Prefiks wszędzie: `/en/...`, `/pl/...` |
| Wpis bez tłumaczenia | Przełącznik na drugi język nieaktywny (`aria-disabled`, tooltip), bez przekierowania |
| Wejście na adres bez prefiksu | Wykrycie: cookie `language` → `Accept-Language` (`pl*`) → `en` |
| Status przekierowań | `302` + `cache-control: no-store` dla adresów zależnych od użytkownika (`/`, `/about`, `/projects`, `/blog`); `301` dla migracji stałych adresów |
| Implementacja | Jedno drzewo `pages/[lang]/`, nie duplikacja katalogów; wbudowane `i18n` Next.js odpada (niedostępne przy `output: "export"`) |

Stan na dziś: 11 wpisów EN, 18 PL, każdy EN ma odpowiednik PL pod tym samym slugiem, 7 wpisów tylko PL.

## Struktura stron

```
pages/
  _app.tsx                 layout + kontekst z pageProps, bez stanu języka
  _document.tsx            <Html lang> z pageProps.language
  index.tsx                awaryjny redirect po stronie klienta (tylko `next dev`;
                           w produkcji `/` obsługuje CloudFront)
  404.tsx                  jedna dwujęzyczna strona błędu
  [lang]/
    index.tsx              /en  /pl
    about.tsx
    projects.tsx
    projects/[slug].tsx
    blog.tsx               strona 1 listy
    blog/[slug].tsx
    blog/pages/[page].tsx  od strony 2 (strona 1 tylko pod /{lang}/blog)
    blog/tag/[tag].tsx
```

Każda strona ma `getStaticPaths` z `LANGUAGES`, `fallback: false`, więc `/de/...` to 404. Nieznany język i nieistniejące adresy trafiają na jedną dwujęzyczną `404.html`.

## Przepływ danych

- `utils/i18n.ts` (klient + serwer): `LANGUAGES`, `localePath`, `pageAlternates`. `lib/i18n.ts` (serwer): `getTranslations`, `getI18nProps`, `postAlternates`, `tagAlternates`.
- Każdy `getStaticProps` zwraca `{ language, translations, alternates }`; `alternates` to `{ en: string | null, pl: string | null }`. `null` znaczy „brak odpowiednika".
- `translations.json` przenosi się z `public/locales/` do `data/` (dziś trafia do `out/locales/` jako nieużywany, publiczny plik).
- Usunięte: `useState`/`useEffect` języka i strony w `_app`, `cookie-cutter`, obejście `currentPage`/`setPage` w paginacji.
- Strona główna: nagłówek ("Senior {Backend} web & app developer") i meta description do `translations.main.*`.

## Komponenty

- **Header**: linki `/${language}/...`, logo do `/${language}`.
- **LanguageSwitcher**: dwa linki z `lang`/`hreflang`; `onClick` zapisuje cookie `language=…; path=/; max-age=31536000; SameSite=Lax`. Aktywny język to zwykły tekst, brak odpowiednika to wyszarzony `<span aria-disabled>`.
- **PostItem / SearchModal / tagi**: linki `/${language}/blog/${slug}`.
- **Pagination**: bez stanu, numer z URL-a; strona 1 → `/{lang}/blog`, dalej `/{lang}/blog/pages/{n}`.
- **Projekty**: `project[lang]` z parametru trasy.
- **`components/Seo.tsx`**: tytuł, opis, canonical, `hreflang` (tylko gdy odpowiednik istnieje), `og:*`, `twitter:*`, `og:locale` (`en_US`/`pl_PL`). Zastępuje ręcznie powielane meta.

## Krawędź (CloudFront Function, viewer-request)

| Stary adres | Nowy | Status |
|---|---|---|
| `/` | `/{wykryty}` | 302 |
| `/about`, `/projects`, `/blog` | `/{wykryty}/about` itd. | 302 |
| `/blog/{lang}/{slug}` | `/{lang}/blog/{slug}` | 301 |
| `/blog/{lang}/pages/{n}` | `/{lang}/blog/pages/{n}` | 301 |
| `/blog/{lang}/tag/{tag}` | `/{lang}/blog/tag/{tag}` | 301 |
| `/blog/{lang}` | `/{lang}/blog` | 301 |
| `/blog/{slug}` | `/en/blog/{slug}` | 301 |

Ostatni wiersz może dać 404 dla 7 wpisów tylko po polsku; ten redirect nigdy nie działał na produkcji. Adresy `/{lang}/...` bez rozszerzenia dostają `.html`. Funkcja czyta cookie i `Accept-Language` przed cache'em, więc nic nie wchodzi do cache key.

## SEO

Canonical na każdej stronie; `hreflang` wzajemny; `x-default` → `/` tylko na stronie głównej; sitemap z obydwoma językami i `xhtml:link` alternates. Po wdrożeniu zgłosić nowy sitemap w Search Console (krok ręczny).

## Weryfikacja

- `terraform/functions/rewrite-uri.test.js` (`node --test`): cała mapa migracji, cookie i `Accept-Language`.
- `scripts/check-export.js` po buildzie: `<html lang>` zgodny ze ścieżką, canonical na każdej stronie, wzajemność `hreflang`, brak wewnętrznych `href` do nieistniejących plików.
- Oba kroki w CI; poza tym `tsc --noEmit`, `terraform validate` i `fmt`.
- Wizualna weryfikacja w przeglądarce po stronie właściciela (Playwright bez Chrome).

## Ryzyka

- **Okno 404 przy wdrożeniu**: w `deploy.yml` `terraform apply` idzie przed `s3 sync`, więc funkcja przekierowuje na pliki, których jeszcze nie ma. Wdrożone: `deploy.yml` robi teraz sync przed apply.
- **CSP jest dziś enforced i nieprzetestowany w przeglądarce**: wdrożone jako `Content-Security-Policy-Report-Only`; obejrzeć konsolę na żywej stronie, dopiero potem wymuszać.
- **Rankingi po zmianie adresów**: 301 je zachowują, ale Google potrzebuje czasu.

## Poza zakresem

Uzupełnienie bloga wpisami z `next-blogs.md` (PL + EN) — osobny etap po tej zmianie; rozbudowa wyszukiwarki i podstrony projektów; migracja z `<img>` na `next/image`.
