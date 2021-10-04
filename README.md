# lc-experiment-start-chat-as-customer
An experiment that demonstrates how to start a chat as a customer in LiveChat

## Set up

```shell
yarn install
yarn start
```

**NOTE 1**: Make sure that you've loaded the environment variable named "REACT_APP_CLIENT_ID" with the value of Livechat Client ID. Scopes needed: "chats--access:rw, chats.conversation--access:rw, chats.conversation--all:rw, chats.conversation--my:rw, customers:own, customers:rw"

**NOTE 2**: Take a look at license and group, make sure that they are the ones you need. (Check both `index.html` and `start-chat-as-customer.js`)