#!/usr/bin/env bash

## install dependencies to ensure lockfile changes are caught by uncommitted changes check
yarn install

## check for uncommitted changes
CHANGES=$(git diff --no-ext-diff --quiet --exit-code)
if [[ $CHANGES != 0 ]]; then
  echo "You have uncommitted changes. Exiting."
  exit $CHANGES
fi

## make sure repo is synced with remote
git fetch --tags
git pull --quiet
git push || git push -u origin HEAD

## ensure the build is the newest version and is added to the repo
yarn run build
git add lib

## make a coverage badge and add it to the repo
npx make-coverage-badge
git add coverage/badge.svg

## commit new build and coverage badge, if there are any changes
git diff-index --quiet HEAD || git commit -m "Publish new build"

echo "***********************************"
echo "* Finished preparing for release *"
echo "***********************************"
echo ""
echo "Execute the following command to bump the version and push your changes:"
echo ""
echo "yarn version && git push && git push --tags"
echo ""
echo ""
