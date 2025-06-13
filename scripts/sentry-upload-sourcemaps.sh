#!/usr/bin/env bash
# Subir sourcemaps a Sentry
set -euo pipefail

VERSION="$EAS_BUILD_APP_VERSION+$EAS_BUILD_BUILD_NUMBER"

npx sentry-cli releases --org your-org --project morpheusecho new "$VERSION"
npx sentry-cli releases files "$VERSION" upload-sourcemaps ./dist --rewrite
npx sentry-cli releases finalize "$VERSION"
