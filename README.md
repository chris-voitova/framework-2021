# Kottans framework task

A simple app for getting advice from the universe using [Advice API](https://api.adviceslip.com/).

Made for Kottans front-end course.

## Planned Features:

1. Geting random advice
2. Generating advice from random id
3. Searching advice
4. Getting advice by ID
5. Sharing advice result in social media

<!-- ## Project source code structure -->

```
/src                    -- project source code
├── components             -- app UI components
│   ├── App.js                -- root app component
│   ├── SearchByCity.js       -- search by city name component
│   ├── UnitSwitch.js         -- measuring units switch
│   └── WeatherResults.js     -- weather search results visualization components
├── data                   -- app data
│   ├── dataStore.js          -- app data store
│   ├── openWeatherMapAPI.js  -- OpenWeatherMap API wrappers
│   └── weatherData.js        -- app data specific to weather
├── framework              -- app UI handling methods
│   └── render.js             -- UI rendering methods
├── index.html             -- app web presentation root document
├── index.js               -- bootstrapping code and app entry point
├── [ secrets.js ]         -- app secrets (required, yet not tracked by git)
├── secrets.template.js    -- app secrets template file
└── utils.js               -- shared utility methods and constants
```

## Development

`npm install` to install dependencies.
Ignore npm audit warnings.
If any changes appear on `package-lock.json` just commit those.

Create `src/secrets.js` from `src/secrets.template.js` and populate
it with API keys and other secrets as appropriate.

`npm start` to launch dev server, app would be served at http://localhost:1234/

`npm run lint` to lint and prettify your code

The project implements a pre-commit hook that launches staged files linting.
If your IDE reports a commit failure then run `npm run lint` and/or `npm run lint:staged`
and fix reported issues. Note that [`.eslintrc.js`](./.eslintrc.js) allows
`console.error` and `console.warn`.

`npm run build` to build production distribution package

`npm run deploy` to publish built app
