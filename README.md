# geo2ip
 geo2ip is an IP Address Geolocation API. 
 
 #### Standard Geo Lookup
  To look up all IP addresses within a radius of a given location, pass the longitude, latitude, radius (in meters) and your API key in the query string.
  ```
 https://your.server/v1/geo2ip?lon=-89.644273&lat=43.110954&radius=1000&key=YOUR_API_KEY
  ```

## API Response
 
An example API response:

```
{
  "status": "success",
  "status_code": 200,
  "time_elapsed": 2,
  "request": {
    "request_id": "0b23f72f-306c-4103-a115-cf8e61804832",
    "request_ts": "2020-03-09 05:06:21.118000",
    "source_ip": "8.8.8.8",
    "is_desktop": false,
    "is_mobile": false,
    "is_smart_tv": false,
    "is_tablet": false
  },
  "lon": -89.644273,
  "lat": 43.110954,
  "radius": 1000,
  "ips": [
    "137.27.69.208/30",
    "137.27.69.228/30",
    "137.27.69.232/29",
    "137.27.69.248/30",
    "159.189.73.0/25"
  ]
}
```

## Design Considerations

Speed and Scalability

API responses are served by AWS Lambda functions, written in NodeJS. 

All request authorization and API response data resides in Redis.



