# Certificate pinning

Certificate pinning enhances app security by ensuring that it only communicates with trusted servers, thus preventing man-in-the-middle (MITM) attacks and the use of forged certificates. By pinning a specific certificate or set of certificates, the app verifies the server’s identity, maintaining data integrity and confidentiality. This measure ensures secure data transmission, protects sensitive information, and builds user trust in the app.

However, certificate pinning comes with challenges such as maintenance overhead, handling certificate expiry, and increased deployment complexity. Developers must regularly update the app to trust new certificates and ensure that the pinned certificate does not expire, which requires careful planning. Despite these challenges, the increased security and trustworthiness provided by certificate pinning make it a valuable addition to an app’s security measures.

- [Certificate pinning](#certificate-pinning)
  - [Basics](#basics)
  - [Adjusting allowed certificates](#adjusting-allowed-certificates)
    - [How to get the hashes for a certificate](#how-to-get-the-hashes-for-a-certificate)

## Basics

Certificate pinning involves embedding a specific certificate or set of certificates within an app, ensuring it only trusts those certificates for secure communications. When the app connects to a server, it retrieves the server’s certificate during the SSL/TLS handshake and compares it against the pinned certificate(s). If there is a match, the connection is deemed secure, and communication proceeds; if not, the connection is rejected.

This direct comparison ensures that the app only communicates with a server presenting the expected certificate, effectively preventing man-in-the-middle attacks and enhancing overall security. By enforcing this trust model, certificate pinning provides a robust layer of protection for sensitive data transmitted between the app and the server.

## Adjusting allowed certificates

These are the steps to adjust the allowed certificates:

1. Decide which certificates should be allowed. It is required to have at least 2 allowed hashes per domain. For example the hash of the end certificate of the domain and its parent certificate in the chain of thrust.
2. [Calculate the hashes of these certificates.](#how-to-get-the-hashes-for-a-certificate)
3. Adjust the hashes in `ios/AmsterdamApp/AppDelegate.mm` and `android/app/src/main/java/nl/amsterdam/app/OkHttpClientWithCertificatePinningFactory.kt`.

### How to get the hashes for a certificate

1. First you need to get the certificate for the domain. For example, download it via the certificate settings of a page on that domain in your webbrowser.
2. Save it as a .pem file, for example app.amsterdam.nl.pem
3. Calculate the base64 sha256 hash of the public key in the certificate via this command:

`openssl x509 -in ./app.amsterdam.nl.pem -pubkey | openssl pkey -pubin -outform der | openssl dgst -sha256 -binary | openssl enc -base64`

### Test the new certificate

- On Android, just add a random character to the fallback certificate hashes
- On iOS, replace the fallback hashes by the hash of another environment (eg. acc.app.amsterdam.nl when testing test.app.amsterdam.nl)
