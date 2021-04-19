# esbuild-apps-script-template

Entrypoint function name is defined by `ENTRYPOINT_FUNC_NAME` in [build.js](build.js). By default, `myFunction` is the name of the function.

As of this commit, running [esbuild](https://github.com/evanw/esbuild) with `bundle` option set to `true` makes entrypoint wrapped in IIFE, making it impossible to declare global functions.
To work around this, combine [banner](https://esbuild.github.io/api/#banner) and [footer](https://esbuild.github.io/api/#footer) to wrap IIFE with global function, so that Apps Script can recognize entrypoint function.

## Setting up

1. First, you need to install [clasp](https://www.npmjs.com/package/@google/clasp) if not installed already:  
   `npm i -g @google/clasp`
2. Enable the "Google Apps Script API" in ["Apps Script" settings](https://script.google.com/home/usersettings).
3. Create Apps Script attached to Spreadsheet.  
   `clasp create --type sheets --title <title>`

   If you have no idea which [type](https://github.com/google/clasp/blob/4464f73465dd9697ae22fab81c42370ca98232c6/src/apis.ts#L10-L18) to choose from, you can simply omit the `--type` option and you'll get the prompt to select from.

## Useful commands

```
# Open project in web browser
$ clasp open

# Build and push the script
$ npm run push

# Run myFunction in your Apps Scripts project
$ clasp run myFunction
```
