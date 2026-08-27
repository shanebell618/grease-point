#!/bin/bash

passedStatus="✅ Passed"
failedStatus="❌ FAILED"
isError=0

echo
echo ----------------------------------------
echo     Vitest
echo

npm run test:unit

if [ $? -ne 0 ]
then
  isError=1
  vitestStatus=$failedStatus
else
  vitestStatus=$passedStatus
fi


##################################################
echo
echo ----------------------------------------
echo     Typescript check
echo

npx tsc --noEmit

if [ $? -ne 0 ]
then
  isError=1
  echo $failedStatus
  typescriptStatus=$failedStatus
else
  echo $passedStatus
  typescriptStatus=$passedStatus
fi


##################################################
echo
echo ----------------------------------------
echo     Lint
echo

npm run lint

if [ $? -ne 0 ]
then
  isError=1
  echo $failedStatus
  lintStatus=$failedStatus
else
  echo $passedStatus
  lintStatus=$passedStatus
fi


##################################################
echo
echo ----------------------------------------
echo     Prettier
echo

npm run format:check

if [ $? -ne 0 ]
then
  isError=1
  echo $failedStatus
  prettierStatus=$failedStatus
else
  echo $passedStatus
  prettierStatus=$passedStatus
fi


##################################################
# End-to-end tests aren't included here on purpose — they need a
# production build plus a Playwright browser install, which makes this
# script too slow to run before every commit. They still run in CI
# (see .github/workflows/ci.yml). Run them yourself with `npm run test:e2e`.


##################################################
echo
echo ========================================
echo     RESULTS

echo
echo vitest............. $vitestStatus
echo typescript......... $typescriptStatus
echo eslint............. $lintStatus
echo prettier........... $prettierStatus

echo
if [[ $isError -eq 1 ]]
then
  echo ❌❌ Health check FAILED ❌❌
else
  echo ✅ Health check Passed
fi

exit $isError
