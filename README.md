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

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
