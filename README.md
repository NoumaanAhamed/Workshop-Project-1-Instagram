# Workshop-Project-1-Instagram

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/NoumaanAhamed/Workshop-Project-1-Instagram.git
   ```
2. Install NPM packages

- In First Terminal
   ```sh
   cd backend
   npm install
   ```
- In Second Terminal
   ```sh
   cd frontend
   npm install
   ```
3. Inside `backend` Folder ,create a new `.env` file and copy from `.env.example` 
   ```js
   MONGODB_URI='YOUR_MONGODB_URI'
   ```
4. Start both the Frontend and Backend
- In First Terminal (inside backend)
   ```sh
   node index.js
   ```
- In Second Terminal(inside frontend)
   ```sh
   npm run dev
   ```