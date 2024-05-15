# Pirsch Analytics Web Redirect Demo

This demo shows how you can use Pirsch to create a rollup view for two domains and keep the original referrer/source.

## Configuration

This demo requires PHP.

Copy and rename `config_sample.php` to `config.php` in `hotel` and `booking` and update it with your identification code and set `dev` to `FALSE` if you're not testing locally.

On the Pirsch dashboard, set up one dashboard for `hotel` and add `booking` as an additional domain.

## Usage

Use any PHP server you like to serve the `hotel` and `booking` directory. Here is an example using the command line. The domains are configured to loop back to localhost.

```php
cd demo/web-redirect/hotel
php -S hotel.localhost.com:8081
```

```php
cd demo/web-redirect/booking
php -S booking.localhost.com:8082
```

Open `hotel.localhost.com:8081` in your browser.
