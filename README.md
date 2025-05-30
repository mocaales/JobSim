# JobSim

Simulacijska mobilna aplikacija za raziskovanje poklicev, kariernih poti in analizo osebnih preferenc. Uporabniki lahko preizkusijo poklice, opravijo kvize, ter se informirajo o veščinah, potrebnih v različnih industrijah.

---

## 🏗️ Tehnologije

- **[Expo](https://expo.dev/)** – razvojno okolje za React Native aplikacije
- **[React Native](https://reactnative.dev/)** – za razvoj mobilne aplikacije
- **[Expo Router](https://expo.github.io/router/)** – za upravljanje navigacije
- **[Clerk](https://clerk.com/)** – avtentikacija (Google Login) in upravljanje uporabnikov
- **[FastAPI](https://fastapi.tiangolo.com/)** – backend API (Python)
- **[MongoDB](https://www.mongodb.com/)** – podatkovna baza za shranjevanje rezultatov
- **[XGBoost](https://xgboost.readthedocs.io/)** – strojno učenje za predikcijo poklicev
- **[React Native Vector Icons](https://github.com/oblador/react-native-vector-icons/)** – ikone v aplikaciji

---

## 🛠️ Namestitev in Zagon

### 📱 Frontend (React Native + Expo)

```bash
# 1. Kloniraj projekt
git clone https://github.com/username/jobsim.git
cd jobsim

# 2. Namesti odvisnosti
npm install

# 3. Ustvari .env datoteko in dodaj Clerk ključe
touch .env

# 4. Dodaj Clerk ključe v .env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_FRONTEND_API=your_clerk_frontend_api
EXPO_PUBLIC_API_URL=https://your-ngrok-url/predict

# 5. Dodaj redirect URI v Clerk
# Odpri LoginScreen in prilepi ta klic:
import * as AuthSession from 'expo-auth-session';
console.log(AuthSession.makeRedirectUri());
# Kopiraj URI v Clerk pod OAuth -> Google -> Redirect URIs

# 6. Zaženi aplikacijo z Expo
npx expo start --tunnel
```

---

### 📱 Backend (FastAPI + MongoDB)

```bash
# 1. Premakni se v backend mapo
cd backend

# 2. Ustvari virtualno okolje in aktiviraj
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# 3. Namesti odvisnosti
pip install -r requirements.txt

# 4. Ustvari .env datoteko in dodaj MongoDB URL
touch .env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/job_sim_db?retryWrites=true&w=majority

# 5. Zaženi backend
uvicorn app.main:app --reload --port 8000
```

---

## 📈 Funkcionalnosti
* Google prijava in avtentikacija (Clerk)
* Simulacija poklicev in kvizi za raziskovanje kariernih poti
* Predikcija poklica z uporabo XGBoost modela
* Shranjevanje in posodabljanje odgovorov uporabnika v MongoDB
* Prikaz rezultatov glede na pretekle vnose
* Obvestilo uporabniku, če je vprašalnik že bil rešen (in možnost ponovnega reševanja)