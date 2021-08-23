# Taggedweb Frontend

It is a monorepo containing

- `apps/web-client` - `nextjs` codebase for [taggedweb](https://taggedweb.com)
- `libs/ui` - codebase containing the `ui` components used in the app

## Setup

To install dependencies run

```sh
yarn install
```

Please use `yarn` instead of `npm` for this codebase.

## Scripts

- `yarn start` - Runs the nextjs application
- `yarn format --all` - Formats the entire codebase using the prettier. _Make sure to run this command before commiting any changes_
- `yarn format <project-name>` - Formats code for only particular project (such as _web-client_ or _ui_)
- `yarn lint` - Lint the entire codebase using `eslint`.
- `yarn cz` - To commit the changes using [commitizen](https://github.com/commitizen/cz-cli)

**Make sure to install eslint and prettier plugin for your favorite IDE to catch errors before commiting**.

## Git Conventions

We are using [git flow](https://nvie.com/posts/a-successful-git-branching-model/) for this repository. Please go through the [doc](https://nvie.com/posts/a-successful-git-branching-model/) before working on anything.

We use [gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for managing git. It is recommended to use [gitflow](https://github.com/nvie/gitflow/wiki/Installation) plugin.

The overall flow of Gitflow is:

- A develop branch is created from master
- A release branch is created from develop
- Feature branches are created from develop
- When a feature is complete it is merged into the develop branch
- When the release branch is done it is merged into develop and master
- If an issue in master is detected a hotfix branch is created from master
- Once the hotfix is complete it is merged to both develop and master

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
