# Taggedweb Frontend

## Setup

To install dependencies run

```sh
yarn install
```

We prefer using `yarn` instead of `npm` for this repo.

## Scripts

- `yarn dev` to run a dev server
- `yarn analyze` to run webpack analyzer to understand the bundle sizes of libraries used
- `yarn build` - To build/compile the yarn application.
- `yarn format <filepath>` - To format specific files (if the file is not formatted, our code formatting checks on PRs might fail)
- Check package.json for other common scripts/targets.

**Make sure to install eslint and prettier plugin for your favorite IDE to catch errors before commiting**.

## Git Conventions

We are using [git flow](https://github.com/nvie/gitflow/wiki/Installation) for this repository. It would be best to go through this [branching model](https://nvie.com/posts/a-successful-git-branching-model/) before opening any PRs and the following doc describing the [gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) we are using. You can install git flow via these [Installation Instructions](https://github.com/nvie/gitflow/wiki/Installation).

The overall highlights of the model we are using for this repository are:

- A develop branch is created from main
- A release branch is created from develop
- Feature branches are created from develop
- When a feature is complete it is merged into the develop branch
- When the release branch is done it is merged into develop and main
- If an issue in main is detected a hotfix branch is created from main
- Once the hotfix is complete it is merged to both develop and main

#### Feature branch

Create a feature branch when you are working on a feature such as implementation of a new UI component.

```sh
git flow feature start feature_branch
```

#### Hotfix branch

Maintenance or “hotfix” branches are used to quickly patch production releases.

```sh
git flow hotfix start hotfix_branch
```

### Environment Variables

We follow practices defined in: https://nextjs.org/docs/basic-features/environment-variables
Most of the defaults are set so you shouldn't have to do anything but if you have to override environment variables copy over .env.local.dist to .env.local in your respective environment and override the settings. .env.local has the highest override precedence.

### Deploying to Staging

To log into the staging node run the following:

```
ssh ubuntu@staging.taggedweb.com

# After you log in, switch to the taggedweb-fronted directory with the following command:
cd taggedweb-frontend
```

DM Pranjal or Sarthak to grant your ssh public keys access to the staging node. (We use a single node for our staging setup).

We are running the staging deploys on Unix screens. To resume the screen running the frontend code run:

```
# The screen should be running for it to be resumed
screen -r frontend

# To detach from a screen without killing the process run Ctrl (pressed) + A + D

# To kill screen (which will stop the process we do Ctrl + D, but avoid doing this unless you remember to start the screen back)

# Let's say the frontend screen is not running we will run
screen -S frontend

# To list all the running screens
screen -list
```
