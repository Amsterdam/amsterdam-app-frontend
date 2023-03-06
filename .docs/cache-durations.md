# Cache durations

To decrease user's data usage, we implemented caching for each endpoint with request method `GET` .

## Durations per endpoint

The durations specify how long the data will be kept in the cache after the subscriber reference count reaches zero. Screens that are still in React Navigation's route stack count also as active subscribers.
When an endpoint isn't mentioned, RTK's default caching duration of 1 minute will be used.

| Endpoint                                          | Duration  |
| ------------------------------------------------- | --------- |
| /articles                                         | 1 minute  |
| /contact/city-offices                             | 1 hour    |
| /contact/waiting-times                            | 0 seconds |
| /project/details                                  | 1 hour    |
| /project/manager                                  | 1 second  |
| /project/news                                     | 1 hour    |
| /project/warning                                  | 1 week    |
| /projects                                         | 1 hour    |
| /projects/followed/articles                       | 1 hour    |
| /projects/search                                  | 1 hour    |
| /waste-guide/search                               | 1 day     |
| https://api.data.amsterdam.nl/atlas/search/adres  | 1 day     |
| https://api.data.amsterdam.nl/atlas/typeahead/bag | 1 day     |

## Custom interval

For some components we use an interval after which, no matter the subscriptions, the endpoint will be refetched.

| Component   | Endpoint               | Interval   |
| ----------- | ---------------------- | ---------- |
| WaitingTime | /contact/waiting-times | 15 seconds |

## App goes to foreground state

The following endpoints will be refetched each time the app goes to foreground state:

- /release/{version}
