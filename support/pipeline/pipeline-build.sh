#!/bin/bash

#### Init
cd "${TRAVIS_BUILD_DIR}" || exit

#### Test
printf "Running tests"
npm run lint || exit
