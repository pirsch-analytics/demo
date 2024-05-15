<?php
include_once('config.php');

// Extract the original referrer/source from the hotel site.
// Of course, if you have subsequent page requests these should be stored in a cookie or localStorage (using JS for the second).
$referrer = $_GET['ref'];
$utmSource = $_GET['utm_source'];
$utmMedium = $_GET['utm_medium'];
$utmCampaign = $_GET['utm_campaign'];
$utmContent = $_GET['utm_content'];
$utmTerm = $_GET['utm_term'];
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch Booking Demo</title>
        <link rel="stylesheet" type="text/css" href="style.css" />

        <!-- Note that this has a "/booking" prefix to distinguish the sites. -->
        <script defer src="<?php echo constant('SCRIPT') ?>"
            id="<?php echo constant('SCRIPT_ID'); ?>"
            data-code="<?php echo constant('IDENTIFICATION_CODE'); ?>"
            data-path-prefix="/booking"
            <?php
            if (constant('DEV')) {
                echo 'data-hit-endpoint="'.constant('HIT_ENDPOINT').'" data-event-endpoint="'.constant('EVENT_ENDPOINT').'" data-dev';
            }
            ?>
            ></script>
    </head>
    <body>
        <h1>Booking</h1>
        <p>Please enter your details to book a room. You'll be redirect afterwards.</p>
        <label for="name">Name</label>
        <br />
        <input type="text" name="name" id="name" />
        <br />
        <!-- Attach referrer/source data to URL to keep the session between the hotel and the booking sites. -->
        <a href="http://hotel.localhost.com:8081?ref=<?php echo $referrer; ?>&utm_source=<?php echo $utmSource; ?>&utm_medium=<?php echo $utmMedium; ?>&utm_campaign=<?php echo $utmCampaign; ?>&utm_content=<?php echo $utmContent; ?>&utm_term=<?php echo $utmTerm; ?>" class="button">Confirm</a>
    </body>
</html>
