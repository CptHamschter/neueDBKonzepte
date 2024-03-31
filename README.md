# neueDBKonzepte
Datenbankkonzepte WWI2022B

Frontend und Backend:
Voraussetzung für das Funktionieren der Befehle ist eine aktuelle Version von Node.
Im Rootverzeichnis “neueDBKonzepte”: \GitHub\neueDBKonzepte\
npm install
Frontend: \GitHub\neueDBKonzepte\frontend-nw>
npm install -g @vue/cli
npm install jwt-decode@2.2.0
npm install axios
npm install core-js
npm install vue-router
Backend: \GitHub\neueDBKonzepte\nw-backend>
npm install express
npm install mongoose
npm install dotenv
npm install body-parser
npm install cors
npm install bcryptjs
npm install jsonwebtoken
Alle nötigen Dependencies für Frontend und Backend sollten damit
heruntergeladen sein.
Nutzung:
- Bei Bedarf: Erstes Terminal, auf dem die MongoDB Shell läuft
\GitHub\neueDBKonzepte\nw-backend> mongosh NachrichtenpageScharle
- Zweites Terminal: \neueDBKonzepte\nw-backend> node initializeDB.mjs
- Zweites Terminal: \neueDBKonzepte\nw-backend> node server.mjs
- Drittes Terminal: \neueDBKonzepte\frontend-nw> npm run serve
STRG + C bei den jeweiligen Terminals, um die Vorgänge abzubrechen
