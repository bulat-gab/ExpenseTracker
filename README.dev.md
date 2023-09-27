# Creating APK

From the root of the project:
`  npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

`cd android`
`./gradlew assembleDebug`

APK file will be in the following folder:
`./android/app/build/outputs/apk/debug/app-debug.apk`
