# voices-of-healing

A lightweight audio player for daily readings.

Primary development for android, and some testing with web-version.
Using Vue + Capacitor.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run run
npm run android (on windows)
```

### Test in Android Studio:
in vscode:
----------
npm run android

in android studio terminal, when emulator is running:
-----------------------------------------------------
adb uninstall com.kaiiu.voicesofhealing
adb install app/build/outputs/apk/debug/app-debug.apk

for android device testing:
--------------------
device > settings > about > build > click 7 times
device > settings > system > develper > enable usb debugging
connect device via usb
device > select file transfer
device > allow usb debugging
adb devices
npx cap run android --target=WCR0218609003673
adb -s WCR0218609003673  logcat Capacitor:D *:S

in android studio terminal, browse to android folder and go
- adb uninstall com.kaiiu.voicesofhealing
- adb install app/build/outputs/apk/debug/app-debug.apk
- adb install -r app/build/outputs/apk/debug/app-debug.apk // reinstall, without uninstall first

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### How to create a capacitor plugin:
- install capacitor cli with: npm install -g @capacitor/cli
- cd to main project folder - creating plugin will create subfolder
- run: npm init @capacitor/plugin
- answer questions like this:
-- npm package: <plugin-name>
-- directory: <plugin-name>
-- package-id: com.kaiiu.<pluginname> // no "-"
-- class name: <PluginName>
-- repository: <provide a github repo>
-- author: <any string>
-- license: <any that fits>
-- short description: <any that fits>
- do the coding
-- src/defintions.ts
-- src/web.ts // web version
-- android/../*.java
- rename rollup.config.js to *.mjs and update package.json
- build with: npm run build
- provide as tgz: npm pack

## user a selfmade plugin in the app:
- cd to project dir
- install tgz with: npm install /path/to/<plugin>.tgz
- sync capacitor plugins: npx cap sync
- use in code, with import: import { PluginName } from 'plugin-name';



