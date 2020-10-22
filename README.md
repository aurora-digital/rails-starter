# Aurora Rails Starter

This repo contains our basic Rails and React boilerplate. Most of our projects revolved around this setup, with Postgres as a database, Rails as our backend framework with a React SPA at the front.

It includes some sane defaults, including a heavily customized Webpack config, user authentication using Sorcery, testing using Rspec and an Administrate engine to manage Users and other backend models.

You can replace the app name `railsstarter` with your own name, and use it to setup a new project. Use `sed` or another tool to replace instances of `railsstarter` and `RailsStarter`.

## Requisites

To run this project you will need the following tools and runtimes:

- Ruby 2.6.6
- Node 10.\*
- Postgres 10 and greater
- Chromedriver

Here at our team, we use [asdf-vm](https://github.com/asdf-vm/asdf) to manage our Ruby and Node versions, we recommend that heavily. You can install Postgres with `homebrew` and Chromedriver with `homebrew cask`.

Our `bin/setup` script will handle installing Ruby and Node if you have [asdf-vm](https://github.com/asdf-vm/asdf) properly installed.

## Architecture

This default starter configure Webpacker with a single entry point for the frontend app, that being `frontend/index.js`. From there you can do anything. Here we bundle a React application, but you can replace that with any kind of frontend library. There is no server-side rendering.

The main premise of this starter is really simple. Get simple authentication with Sorcery up and running, and use sensible Webpack and feature testing defaults.

## Frontend

The most specialized part of this boilerplate is the frontend build, which is vastly different from a default Rails one (even the Webpacker default).

We use React as our UI framework, but that can be replaced if need be. With our Webpacker config, the following features are enabled:

- All of the frontend building is done by [Webpacker](https://github.com/rails/webpacker). Check their docs for info.
- Some special rules we use are enabled on the Babel config. **Class properties**, **react-imported-component** which allows us to use the package with the same name to async load React components, and **legacy decorators** for the ocasional high order component. Also, the base `preset-react` and `preset-env` are also enabled. Check `.browserlistrc` to check which browsers are being targeted.
- Code splitting is achieved with the Babel config mentioned above and `react-imported-component`. Check the example frontend app for usage.
- `storybook` to mantain the ocasional styleguide. It's configured for React, but again, can be used with other frontend library or framework.
- Optional `node_modules` transpilation. Visit the `nodeModules.js` on the config folder to add dependencies to the allowlist. Those dependencies will be transpiled.

### Browser support

This starter is tested in Chrome, Firefox, Safari and IE11, but we can safely assume that it works in all browsers covered by our `browserslist` specification. We include both `core-js` and `regenerator-runtime` on our frontend bundle. Babel then converts that on individual polyfills, so we only include polyfills we actually need.

Check used polyfills on `frontend/shared/polyfills.js`.

## Backend
The only backend logic present is the user authentication. We created a custom session controller to handle logins and logouts using the Sorcery gem. By default the Sorcery gem only:
- protects against brute force attacks
- tracks logins and logouts (time and location)
- session timeouts

We use Rails Session to persist user information, which in turn uses HTTP cookies. The session is valid for exactly one week and it's refreshed everytime a user completes an action (basically on every page visit). When logging out, we can pass a `everywhere` param set to `true` to invalid all of the user sessions.

If you want more Sorcery modules, check out their documentation and implement it. Open up a PR if you think a given task should be already implemented by default. We do not have user confirmation emails, neither forget password logic. Sorcery can handle that but you have to implement it by hand.

Administrate is also installed, allowing users with the admin role to create accounts, as user registrations are disabled by default. The admin dashboard is present at `/admin`.

We don't include CORS configuration as this starter is to be used on a single domain. If you need to enable CORS please install and configure the `rack-cors` gem. Even with the default restrictive behavior from Rails you can still make server-to-server requests, and most native mobile apps can still make requests (webview technologies like Ionic and PhoneGap will need CORS).

## Testing

- Uses Rspec as a testing framework, using FactoryBot and Faker to generate records for testing
- Feature tests interacting with the Webpacker bundle using Capybara and Chromedriver
- Sorcery backdoor to bypass authentication during feature tests

Run the script `bin/ci` to run all tests, linters. It's a copy of what you should do on your CI system.

# Developing

Run `bin/setup` to get everything up and running. Then `bin/server` to start hammering away at it.

Also don't forget to setup the default admin user with `rake populate:admin_user`. The default credentials are `admin@mail.com`, the password being `foobar`.

`react-refresh` should reload everything you need as you edit stuff in the `frontend` folder. On the Rails side, everything is interpreted live, so no need to restart the server every time you change code, unless you change configs or initializers.

**DISCLAIMER** Check the `react-refresh` docs on [this link](https://reactnative.dev/docs/fast-refresh) (yes it's from `reactnative`, trust us) for limitations on the hot loader. For example, only function components work now.

## Production

This starter is made with Heroku in mind, but if you want to deploy elsewhere we recommend the included Dockerfile (which is meant for production and not development). The Docker image of this repo uses Alpine Linux to produce a very small image. It builds the backend and the frontend serving the assets from the Rails app itself.

You should deploy the image made by this repo to DockerHub, or any other container registry, then on the production server just pull it there. There is a included `docker-compose.yml`. Just change the `build: .` line with `image: your-docker-hub-image` on production.
There are a couple of important environment variables that need changing, namely the postgres password and Rails secret key base. Use a secure password generator for those.

Then do the usual:
```
docker-compose pull
docker-compose stop # to stop existing containers
docker-compose up -d
docker-compose exec web rake db:migrate
```

You can do the usual `rails console` and regular rake tasks using `docker-compose exec web <your command>`.

# About

This starter kit is maintained by [Aurora](http://auroradigital.co).
