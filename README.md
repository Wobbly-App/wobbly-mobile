# Wobbly
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Wobbly-App/wobbly-mobile)](https://dependabot.com)

## Getting started
* `yarn install && yarn start`
* Clicking log in will sign in with a default development account.
  * Our backend XMPP server is defederated so this can't be use for spam.
* Ask on our [Discord](https://discord.gg/KxC96yY) if you'd like an account on `xmpp.wobbly.app` for testing.

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

This will change: in the future, messages will be stored in an SQLite database (see [issue #47](https://github.com/Wobbly-App/wobbly-mobile/issues/47).

## Debugging
We recommend using [React Native Debugger](https://github.com/jhen0409/react-native-debugger/) (note: use version 0.10.x for compatibility with the version of React Native that we use).

🖤 🐈
