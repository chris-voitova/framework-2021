# Kottans framework task

A simple app for getting advice from the universe using [Advice API](https://api.adviceslip.com/).

Made for Kottans front-end course.

## Planned Features:

1. Geting random advice
2. Getting advice by ID
3. Searching advice
4. Generating advice from random id
5. Sharing advice result in social media

## Development

`npm install` to install dependencies.
Ignore npm audit warnings.
If any changes appear on `package-lock.json` just commit those.

`npm start` to launch dev server, app would be served at http://localhost:1234/

`npm run lint` to lint and prettify your code

The project implements a pre-commit hook that launches staged files linting.
If your IDE reports a commit failure then run `npm run lint` and/or `npm run lint:staged`
and fix reported issues. Note that [`.eslintrc.js`](./.eslintrc.js) allows
`console.error` and `console.warn`.

`npm run build` to build production distribution package

`npm run deploy` to publish built app
