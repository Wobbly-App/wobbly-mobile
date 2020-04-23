# Wobbly

## Libraries
* The core library we use is [Expo](https://expo.io/).
* [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat) for the chat UI
* Redux with [redux-toolkit](https://redux-toolkit.js.org/) for state
* We think of our components in terms of [atomic design](http://atomicdesign.bradfrost.com/chapter-2/)
* [xmpp.js](https://github.com/xmppjs/xmpp.js) for communicating with the backend XMPP server

## Style guide
We generally try to follow [Redux best practices](https://redux.js.org/style-guide/style-guide/).

## State
State is stored in a number of different places.
* Credentials are stored in Expo's [SecureStore](https://docs.expo.io/versions/latest/sdk/securestore/).
* Everything else is stored in Redux.

This will change: in the future, messages will be stored in an SQLite database. Media, if we implement it,
will be stored in the filesystem. This raises the question of whether it's a good idea to keep Redux at all,
or to move as many things as we can into SQLite.

## Developing
We recommend using [React Native Debugger](https://github.com/jhen0409/react-native-debugger/) (note: use version 0.10.x for compatibility with the version of React Native that we use).

🖤 🐈