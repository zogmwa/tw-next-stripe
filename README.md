# Taggedweb Frontend

## Setup

To install dependencies run

```sh
yarn install
```

We prefer using `yarn` instead of `npm` for this repo.

## Scripts

- `yarn dev` to run a dev server
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
