# Pirsch Analytics Web Demo

This demo shows how you can use Pirsch on your website using JavaScript. Appart from tracking page views, it also showcases more advanced features, including:

* custom events
* outbound link tracking
* tracking file downloads
* tracking 404 pages

## Configuration

Adjust the snippets in `static/index.html` and `static/page.html` with your identification code and remove the `data-dev` and `data-*-endpoint` attributes.

## Usage

Use any HTTP server you like to serve the `static` directory. Here is an example using PHP.

```php
cd demo/web/static
php -S localhost:8080
```

Open `localhost:8080` in your browser.
