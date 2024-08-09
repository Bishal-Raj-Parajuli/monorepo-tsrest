# Monorepo with TS-Rest

## To Create this example

Run the following command:

```sh
npx create-turbo@latest
```

### Delete Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)

### Create NestJs and ReactJs Project inside apps

```sh
cd apps
nest new server && npm create vite@latest
```
### Install Dependencies

```sh
cd ..
npm install
```

### Edit server `package.json`

```json
"start:dev": "nest start --watch",
```
to
```json
"dev": "nest start --watch",
```

### Run the app
```sh
npm run dev
```
