# Setup TypeScript with Nodejs & Express

## setup npm in you project
``npm init --yes``

## Install minimum server with Express
``npm install express dotenv``

## Installing TypeScript
``npm i -D typescript @types/express @types/node``

## Generating tsconfig.json
``npx tsc --init``

## Changing ``outDir`` in tsconfig.json

<code>
    {
    "compilerOptions": {
        "outDir": "./dist"

        // rest options remain same
    }
    }
</code>

### Install ```nodemon``` tool that helps develop Node.js based applications by automatically restarting the Node.js application when file changes in the directory are detected.


###  ```Concurrently```, allow us to run multiple commands like nodemon to watch file changes and the tsc command to compile the code.

``npm install -D concurrently nodemon``

## Modifying ``scripts`` in ``package.json``
<code>
    {
    "scripts": {
        "build": "npx tsc",
        "start": "node dist/index.js",
        "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
    }
    }
</code>

## Run dev project will create a ``dist`` folder
``npm run dev``

## Build project will update a ``dist`` folder
``npm run build``

## Run production project create a ``dist`` folder
``npm run start``
