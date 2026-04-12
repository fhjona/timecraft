# iOS CI secrets for GitHub Actions

This file matches `.github/workflows/ios-signed-build.yml`.

## Required repository secrets

Add these in GitHub: Settings -> Secrets and variables -> Actions -> New repository secret.

- `BUILD_CERTIFICATE_BASE64`: Base64 of your `.p12` signing certificate.
- `P12_PASSWORD`: Password used when exporting the `.p12`.
- `KEYCHAIN_PASSWORD`: Any strong temporary password for CI keychain.
- `BUILD_PROVISION_PROFILE_BASE64`: Base64 of your `.mobileprovision` file.
- `APPLE_TEAM_ID`: Your Apple Developer Team ID.
- `APPLE_SIGNING_IDENTITY`: Usually `Apple Distribution`.
- `IOS_PROFILE_NAME`: Provisioning profile name exactly as shown in Apple Developer portal.

## Additional secrets for TestFlight upload workflow

These are required by `.github/workflows/ios-testflight.yml`:

- `ASC_KEY_ID`: App Store Connect API key ID.
- `ASC_ISSUER_ID`: App Store Connect API issuer ID.
- `ASC_API_KEY_BASE64`: Base64 content of `AuthKey_<KEY_ID>.p8`.

## How to generate Base64 values on macOS

```bash
base64 -i ios_distribution.p12 | pbcopy
base64 -i AppStore.mobileprovision | pbcopy
base64 -i AuthKey_ABC123XYZ.p8 | pbcopy
```

Paste each copied value into the matching GitHub secret.

## One-time checks before first CI run

- Bundle ID in Xcode/App Store Connect must be `com.fjona.datetimecalculator`.
- Provisioning profile must match the same bundle ID and signing certificate.
- App Store Connect app should already exist for this bundle ID.

## Run the workflow

1. Push your branch to GitHub.
2. Open Actions -> iOS Signed Build -> Run workflow.
3. Download `ios-ipa` artifact after completion.

## Optional: upload to TestFlight automatically

Add App Store Connect API key secrets and use `xcrun altool` or Fastlane in another workflow step.
