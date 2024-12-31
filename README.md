# Setup

## Backend

Open up terminal and navigate to `backend` folder, setup dependencies and initiate testnet by executing the following

```
cd backend
npm i
npx hardhat compile
npx hardhat node
```

Open a new terminal and Deploy the contracts by executing

```
cd backend
npx hardhat ignition deploy ./ignition/modules/ClientRegistry.ts --network localhost
```

This will create a new deployment of `ClientRegistry` and fill in `deployed_addresses.json` that will be used by the react app.

## Frontend

This project uses react + typescript + vite.

Open up a new terminal and install dependencies by executing the following (ONLY IF THIS IS YOUR FIRST TIME RUNNING THE FRONTEND)

```
npm i
```

Run the dev server for the frontend by running

```
npm run dev
```

Open up `http://localhost:5173/` in your browser and open your devtools (right click -> inspect element anywhere in the page)

Open up the console within your devtools, your smart contract address should be shown there with a console message saying `This is your deployment address: {YOUR ADDRESS HERE}`

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
