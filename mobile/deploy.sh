#! /usr/bin/env bash

set -e # exit entire script when command exits with non-zero status

yarn install

# Publish `production` release 
exp publish --release-channel production --non-interactive

# Start building standalone android build using `production` release channel
exp build:android --release-channel production --non-interactive --no-publish

# Download the artifact to current directory as `app.apk`
curl -o app.apk "$(exp url:apk --non-interactive)"

# Submit and publish standalone Android app to the Google Play Store ####
fastlane supply --track 'production' --json_key './json_key.json' --package_name "com.cardefense.cardefense" --apk "app.apk" --skip_upload_metadata --skip_upload_images --skip_upload_screenshots
