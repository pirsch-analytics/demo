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
                echo 'data-hit-endpoint="'.constant('HIT_ENDPOINT').'" data-dev';
            }
            ?>
            ></script>
    </head>
    <body>
        <h1>Second Page</h1>
        <p>
            <a href="/" class="menu">Home</a>
            <a href="/page.php" class="menu menu-active">Second Page</a>
            <a href="/video.php" class="menu">Video Tracking</a>
        </p>
        <p>
            This page exists to showcase page views. It uses the <strong>pirsch.js</strong> JavaScript snippet instead of the <strong>pirsch-ext.js</strong> snippet simply because it's more lightweight.
        </p>
    </body>
</html>
