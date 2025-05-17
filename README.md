# JobSim

Simulacijska mobilna aplikacija za raziskovanje poklicev in kariernih poti. Uporabniki lahko preizkusijo poklice, opravijo kvize, ter se informirajo o veščinah, potrebnih v različnih industrijah.

---

## 🔧 Tehnologije

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://expo.github.io/router/)
- [Clerk](https://clerk.com/) – za Google prijavo in upravljanje seje
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

---

## 🛠️ Namestitev in zagon

```bash
# 1. Kloniraj projekt
$ git clone https://github.com/username/jobsim.git
$ cd jobsim

# 2. Namesti odvisnosti
$ npm install

# 3. Ustvari .env datoteko
$ touch .env

# 4. Dodaj Clerk ključe v .env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_FRONTEND_API=your_clerk_frontend_api

# 5. Dodaj redirect URI v Clerk
# Odpri LoginScreen in prilepi ta klic:
import * as AuthSession from 'expo-auth-session';
console.log(AuthSession.makeRedirectUri());
# Kopiraj URI v Clerk pod OAuth -> Google -> Redirect URIs

# 6. Zaženi aplikacijo
$ npx expo start
```