package nl.amsterdam.app

import com.facebook.react.modules.network.OkHttpClientFactory
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

// Needed to add certificate pinning

class OkHttpClientWithCertificatePinningFactory : OkHttpClientFactory {
    override fun createNewNetworkModuleClient(): OkHttpClient {

        val certificatePinner: CertificatePinner = CertificatePinner.Builder()
                // Individual certificates
                .add("ontw.app.amsterdam.nl", "sha256/Gy75+d3BkwDslWfDE8gxDA71rPZ/ooQNdy9cJxuELhM=")
                .add("test.app.amsterdam.nl", "sha256/phZEpdzfo4JocyH23+aQrL0QBSuoWBeJ/PfR5c5n2kE=")
                .add("acc.app.amsterdam.nl", "sha256/6fXqTLHGGwijHIfl1WGZUElGgmdQ4dZqVug9l6caJm4=")
                .add("app.amsterdam.nl", "sha256/aWo/H7b6jYpKas1mQinYbeyZptbXpKOKROf2FOQEV3s=")
                // DigiCert G2 TLS EU RSA4096 SHA384 2022 CA1 
                .add("ontw.app.amsterdam.nl", "sha256/lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=")
                .add("test.app.amsterdam.nl", "sha256/lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=")
                .add("acc.app.amsterdam.nl", "sha256/lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=")
                .add("app.amsterdam.nl", "sha256/lXt3ip5lkns+fBxV/S9MSfUx0UUdhBEmhXz5PkrAWGg=")
                // DigiCert Global Root G2
                .add("ontw.app.amsterdam.nl", "sha256/i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=")
                .add("test.app.amsterdam.nl", "sha256/i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=")
                .add("acc.app.amsterdam.nl", "sha256/i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=")
                .add("app.amsterdam.nl", "sha256/i7WTqTvh0OioIruIfFR4kMPnBqrS2rdiVPl/s2uC/CY=")
                .build()

        val clientBuilder: OkHttpClient.Builder = OkHttpClientProvider.createClientBuilder()

        return clientBuilder
                .certificatePinner(certificatePinner)
                .build()
    }
}