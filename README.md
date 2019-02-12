# Parcel Mario with server

## What the project does?

This application gives the parcel shipping price from any country in the world to any country in the world. At this moment is giving a prices (trough API) only from one wbesite: https://www.parcelmonkey.co.uk/. At later stage of this application, there will be more companies like parcelmonkey, so will compare the prices.
By default, weight and dimensions are set to minimum values and postcode are in UK mainland. Is possible to amend this values (by clicking into "Parcel larger than 1 m?") with selected country (source and destination), postcode, weight and dimensions.

## Technical notes

- Run `npm install` after cloning to download all dependencies
- Use `npm run go` to build application (in watch mode) and run server (with nodemon so will restart server on any changes)

## Inspiration

My personal experience, where I discovered a problem which will be solved in the next stages of the development of this application (comparing prices from different sites). Stylistics I modeled from: https://www.parcelmonkey.co.uk/

## What technologies it uses?

- html5 - BEM class names
- CSS3 (scss)
- Java Script ES6
- React
- Node.js
- Responsive Web Design (with mobile first approach)
