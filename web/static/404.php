<?php include_once('config.php'); ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch Web Demo</title>
        <link rel="stylesheet" type="text/css" href="style.css" />

        <!-- Adjust the data-code attribute with your identification code and remove the data-hit-endpoint, data-event-endpoint, and data-dev attribute. -->
        <script defer src="https://localhost.com:9999/pirsch-extended.js"
            id="pirschextendedjs"
            data-code="<?php echo constant('IDENTIFICATION_CODE'); ?>"
            <?php
            if (constant('DEV')) {
                echo 'data-hit-endpoint="https://localhost.com:9999/hit" data-event-endpoint="https://localhost.com:9999/event" data-dev';
            }
            ?>
            ></script>
    </head>
    <body>
        <h1>Error 404 - Page Not Found</h1>
        <p>
            <a href="/">Back to Home</a>
        </p>
        <script>
            window.addEventListener("load", () => {
                console.log("Track 404 Page");
                pirschNotFound();
            });
        </script>
    </body>
</html>
