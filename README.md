
![Alt text](doc/header.png?raw=true "Title")

<center>
  <img src="https://img.shields.io/badge/status-dev-yellow" alt="" />
</center>

For setup and running the client execute following commands.

The Application is than available under ``localhost:4200``.

```bash
$ git clone git@github.com:arturbiko/recipe-book.git
$ cd recipe-book
$ npm ci
$ npm start
```


To set-up the server switch to the ``server`` directory and execute following commands.
Make sure you have an instance of CouchDB running. Don't forget to edit the newly created .env file
with your specific local values.

```bash
$ cd server
$ cp .env.dev .env
$ vi .env
$ npm ci
$ npm start
```
