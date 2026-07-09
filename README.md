# Italian Meals App

**Autore:** Alessia Masuzzo

App **Expo / React Native** che mostra piatti italiani da [TheMealDB](https://www.themealdb.com/), con login mock, navigazione, API, preferiti persistenti, stato globale, UI responsive e accessibilità.

---

## Come installare e avviare il progetto

1. `git clone <url-repo>`
2. `cd <nome-cartella>`
3. `npm install`
4. `npx expo start` (poi premi `a` per aprire su emulatore Android, oppure scansiona il QR code con l'app Expo Go sul telefono)

### Prerequisiti

- **Node.js LTS** installato sul PC
- **Expo Go** installato su device fisico, oppure un **emulatore Android** (Android Studio) configurato
- Connessione internet attiva (l'app carica i dati da un'API esterna)

---

## Endpoint API usati

Dati forniti da **TheMealDB** (uso didattico, key pubblica `1`):

- Documentazione generale: https://www.themealdb.com/documentation
- Riferimento endpoint: https://www.themealdb.com/api.php

| Endpoint              | URL                                                                 |
| ---------------------- | -------------------------------------------------------------------- |
| Lista piatti italiani  | `GET https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian`  |
| Dettaglio piatto       | `GET https://www.themealdb.com/api/json/v1/1/lookup.php?i={idMeal}` |

---

## Utenti mock (login di test)

L'autenticazione è **solo locale** (nessuna API di login reale), confrontata con un array mock in `src/services/auth.ts`.

| Email                     | Password    |
| ------------------------- | ----------- |
| mario.rossi@student.it    | React2026!  |
| giulia.bianchi@student.it | Expo2026!   |
| luca.verdi@student.it     | Mobile2026! |

---

## Deep linking

**Stato: implementato.**

Configurazione in `App.tsx` tramite `expo-linking`, con un solo `NavigationContainer` e la mappa `screens` allineata ai nomi reali delle route dello Stack Navigator:

```ts
const linking = {
  prefixes: [Linking.createURL("/"), "italian-meals-app://"],
  config: {
    screens: {
      MealsList: "meals",
      MealDetail: "meal/:idMeal",
      Favorites: "favorites",
      Settings: "settings",
      Login: "login",
    },
  },
};
```

Comando di test (con Metro avviato e app già in esecuzione su emulatore/Expo Go):

```bash
npx uri-scheme open "exp://10.0.2.2:8081/--/meal/52772" --android
```

Se `idMeal` manca o non è valido, l'app mostra un messaggio chiaro invece di crashare (vedi sezione Edge case).

---

## Google Doc (screenshot lab 13–19)

**Link:** https://docs.google.com/document/d/1RXdJJVh4GlMYAngYksM9MLcUvdgkYoO3lizdgMCK36Y/edit?tab=t.0#heading=h.wu29v8o1b6lm

---

## Scelta stato globale e motivazione

È stata usata la **Context API** di React, con tre context separati:

- `AuthContext` - sessione utente (login/logout, persistita in AsyncStorage)
- `FavoritesContext` - lista `idMeal` preferiti (persistita in AsyncStorage, chiave `app:v1:favs`)
- `ThemeContext` - tema chiaro/scuro (persistito in AsyncStorage, chiave `app:v1:theme`)

 Ogni Context espone un hook dedicato (`useAuth`, `useFavorites`, `useTheme`) usato direttamente nelle schermate.
---

## Edge case gestiti

- **Errore di rete/API**: stato `error` esplicito con messaggio e pulsante **Retry**, sia nella lista che nel dettaglio piatto
- **Login fallito**: messaggio "Email o password non validi" senza crash, form resta compilabile
- **Lista vuota**: messaggio "Nessun piatto italiano disponibile" se l'API non restituisce piatti
- **Preferiti**: chiave AsyncStorage assente o JSON corrotto → l'app parte comunque con lista preferiti vuota, senza crash
- **Font size di sistema aumentato**: titoli piatto con `maxFontSizeMultiplier={1.4}` per non rompere il layout
- **Deep link invalido**: se l'`idMeal` ricevuto dall'URL manca o non è valido, la schermata Dettaglio mostra un messaggio di errore invece di andare in crash

---

## Architettura del progetto

```
src/
  components/     Avatar, MealCard
  context/        AuthContext, FavoritesContext, ThemeContext
  screens/        LoginScreen, MealsListScreen, MealDetailScreen, FavoritesScreen, SettingsScreen
  services/       auth.ts, mealsApi.ts, storage.ts
  types/          meal.ts
  tokens.ts       colori, spacing, temi
  styles.ts       createStyles(theme)
App.tsx
PROGRESS.md
README.md
docs/screenshots/
```
