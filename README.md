# api-timestamp

freecodecamp project. API gives object of unix and utc timestamp of given day.

## API ENDPOINT

```
GET /api/timestamp/:datestring
GET /api/timestamp (Current timestamp)
```

## datestring FORMAT 

***yyyy-m-d*** (2014-10-5)

***yyyy-m*** (2014-10)

***d-m-yyyy*** (5-10-2014)

***Unix time*** (1412121600000)

## JSON Object :

```
{
  "unix" : <int:unix-time>,
  "utc" : <string:utc-date>
}
```
## [Try Here](https://marvin9-api-timestamp.glitch.me/)
