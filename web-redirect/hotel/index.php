<?php
session_start();
include_once('config.php');

// Store the referrer/source to use it on subsequent page views to keep the session when redirecting to the booking engine.
$referrer = $_SERVER['HTTP_REFERER'];

if (!empty($_GET['ref'])) {
    // Overwrite referrer header with query parameter if present.
    $referrer = $_GET['ref'];
}

$utmSource = $_GET['utm_source'];
$utmMedium = $_GET['utm_medium'];
$utmCampaign = $_GET['utm_campaign'];
$utmContent = $_GET['utm_content'];
$utmTerm = $_GET['utm_term'];

if (!isset($_COOKIE['pirsch_source'])) {
    // Create cookie if it does not exist yet.
    setPirschCookie();
} else {
    // Extract referrer/source from cookie.
    $cookie = json_decode($_COOKIE['pirsch_source']);

    if (!empty($referrer) && $cookie->referrer != $referrer ||
        !empty($utmSource) && $cookie->utm_source != $utmSource ||
        !empty($utmMedium) && $cookie->utm_medium != $utmMedium ||
        !empty($utmCampaign) && $cookie->utm_campaign != $utmCampaign ||
        !empty($utmContent) && $cookie->utm_content != $utmContent ||
        !empty($utmTerm) && $cookie->utm_term != $utmTerm) {
        // Update cookie with new referrer data.
        setPirschCookie();
    } else {
        // Use cookie data.
        $referrer = $cookie->referrer;
        $utmSource = $cookie->utm_source;
        $utmMedium = $cookie->utm_medium;
        $utmCampaign = $cookie->utm_campaign;
        $utmContent = $cookie->utm_content;
        $utmTerm = $cookie->utm_term;
    }
}

function setPirschCookie() {
    setcookie('pirsch_source', json_encode([
        'referrer' => $referrer,
        'utm_source' => $utmSource,
        'utm_medium' => $utmMedium,
        'utm_campaign' => $utmCampaign,
        'utm_content' => $utmContent,
        'utm_term' => $utmTerm
    ]), 0, '/');
}
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch Hotel Demo</title>
        <link rel="stylesheet" type="text/css" href="style.css" />

        <script defer src="<?php echo constant('SCRIPT') ?>"
            id="<?php echo constant('SCRIPT_ID'); ?>"
            data-code="<?php echo constant('IDENTIFICATION_CODE'); ?>"
            <?php
            if (constant('DEV')) {
                echo 'data-hit-endpoint="'.constant('HIT_ENDPOINT').'" data-event-endpoint="'.constant('EVENT_ENDPOINT').'" data-dev';
            }
            ?>
            ></script>
    </head>
    <body>
        <h1>Welcome to Our Hotel!</h1>
        <p>Book your room now!</p>
        <p>
            Your referrer is: <?php echo $referrer; ?><br />
            Your UTM parameters are: <?php echo $utmSource.' '.$utmMedium.' '.$utmCampaign.' '.$utmContent.' '.$utmTerm; ?>
        </p>
        <!-- Attach referrer/source data to URL to keep the session between the hotel and the booking sites. -->
        <a href="http://booking.localhost.com:8082?ref=<?php echo $referrer; ?>&utm_source=<?php echo $utmSource; ?>&utm_medium=<?php echo $utmMedium; ?>&utm_campaign=<?php echo $utmCampaign; ?>&utm_content=<?php echo $utmContent; ?>&utm_term=<?php echo $utmTerm; ?>" class="button">Book Now</a>
    </body>
</html>
