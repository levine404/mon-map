# Quasar App (mon-map)

Monastery Mapper

## Install the dependencies
Ensure Node is installed on your machine
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Deploy the app
```bash
npm run deploy
```

### Adding User Access
1) Login with FB
2) In Firebase console add authenticated user's UID to the Firebase Database collection called 'admins',
the document should have a property called 'isAdmin' and it should be set to true

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

