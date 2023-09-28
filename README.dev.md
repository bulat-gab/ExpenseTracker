# Creating APK

## Debug version

From the root of the project:
`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res`

`cd android`
`./gradlew assembleDebug`

APK file will be in the following folder:
`./android/app/build/outputs/apk/debug/app-debug.apk`

# Publishing to Google Play

Reference: [https://reactnative.dev/docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android)

## 1. Generate an upload key

From Java installation folder (ex. `C:\Program Files\Java\jdkx.x.x_x\bin`) run:  
`keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000`

## 2. Setup Gradle variables

Place the `my-upload-key.keystore` file under the `android/app`

Edit `~/.gradle/gradle.properties` and add the following:

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=qwerty123
MYAPP_UPLOAD_KEY_PASSWORD=321qwerty
```

## 3. Update Gradle config

Edit the file `android/app/build.gradle` and the following to the release section:

```
...
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```

## 4. Create bundle

```
cd android
./gradlew bundleRelease
```

The file will be created at:  
`android/app/build/outputs/bundle/release/app-release.aab`

Upload it to the Google Play
