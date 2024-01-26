<?php include_once('config.php'); ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch Web Demo</title>
        <link rel="stylesheet" type="text/css" href="style.css" />

        <script defer src="<?php echo constant('SCRIPT') ?>"
            id="pirschextendedjs"
            data-code="<?php echo constant('IDENTIFICATION_CODE'); ?>"
            <?php
            if (constant('DEV')) {
                echo 'data-hit-endpoint="'.constant('HIT_ENDPOINT').'" data-event-endpoint="'.constant('EVENT_ENDPOINT').'" data-dev';
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
