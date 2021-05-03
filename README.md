# Node js foundation .
## To create ssl certificate.
```
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out certificate.pem
```
> buffer! Stream! fs/promise * http2