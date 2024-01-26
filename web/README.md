# Pirsch Analytics Web Demo

This demo shows how you can use Pirsch on your website using JavaScript. Appart from tracking page views, it also showcases more advanced features, including:

* custom events
* outbound link tracking
* tracking file downloads
* tracking 404 pages
* events to track the scroll depth
* tracking video playback time

## Configuration

This demo requires PHP.

Copy and rename `config_sample.php` to `config.php` in `static` and update it with your identification code and set `dev` to `FALSE` if you're not testing locally.

## Usage

Use any PHP server you like to serve the `static` directory. Here is an example using the command line.

```php
cd demo/web/static
php -S localhost:8080
```

Open `localhost:8080` in your browser.
