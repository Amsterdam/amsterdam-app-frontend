# Everything you need to know about the module construction-work-editor

## Access with deeplink

The module is activated and accessed by a deeplink. Next, the user needs to acquire an access token to be able to use the module.

### Users

Users login with the deeplink without params. Once this deeplink is followed, the user enters a webview to our admin website. Here, the user logs in with Entra ID and after success redirects back to the app with an access-token. The access-token is used to pass the login boundary in the module after which the user is authorized by the module and ready to use.

### Testing

For testing, it's also possible to follow the deeplink with an access-token as parameters. As a result, the testing agent skips the login process and immediately gives access to the contents of the module. This is safe because the testing device is controlled and doesn't contain malicious apps that can hijack the token.
