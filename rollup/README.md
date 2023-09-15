# Pirsch Analytics Web Demo

This demo shows how you can use Pirsch on your website using JavaScript to create roll-up views.

## Configuration

Adjust the snippets in `static/index.html` and `static/page.html` with your identification code and remove the `data-dev` and `data-*-endpoint` attributes.

## Usage

Use any HTTP server you like to serve the `bar.com` and `foo.com` directories. Here is an example using PHP on `bar.com` and `foo.com`. Edit your `hosts` file to create a loop back for the two domains so that they point to localhost.

```php
cd demo/rollup/bar.com
php -S bar.com:8081
```

In a second terminal:

```php
cd demo/rollup/foo.com/dir
php -S foo.com:8082
```

Open `bar.com:8081` in your browser.
