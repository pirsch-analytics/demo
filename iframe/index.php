<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch iframe Demo</title>
    </head>
    <body style="display: flex;justify-content: center;align-items: center;">
        <iframe src="https://pirsch-dev.localhost.com:8888/?access=<?php echo getenv('PIRSCH_ACCESS_CODE'); ?>&ui=hide&interval=30d&scale=day&mode=light" width="1200" height="800" />
    </body>
</html>
