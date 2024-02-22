<?php include_once('config.php'); ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch Web Demo</title>
        <link rel="stylesheet" type="text/css" href="style.css" />
    </head>
    <body>
        <h1>A/B Testing</h1>
        <p>
            <a href="/" class="menu">Home</a>
            <a href="/page.php" class="menu">Second Page</a>
            <a href="/video.php" class="menu">Video Tracking</a>
            <a href="/abtesting.php" class="menu menu-active">A/B Testing</a>
        </p>
        <p>
            This page shows one way to implement client-side A/B testing. The headline below is randomly selected from two options. When the button is clicked, an event is fired that can later be combined with the tags on the page to determine which headline was more effective. The randomly selected option is kept in localStorage to prevent it from changing after the first page visit. The script snippet is constructed on site using JavaScript.
        </p>
        <h2 id="headline-experiment">Pre-filled default headline</h2>
        <button pirsch-event="Order Course">Order Now!</button>
        <p>
            Click the button below to reset the A/B test and select the headline randomly again.
        </p>
        <button id="reset">Reset A/B Test</button>
        <script>
            // Wait for the page to be fully loaded.
            document.addEventListener("DOMContentLoaded", () => {
                // List of variants. There could be more options than "A" and "B" in theory.
                const variants = [
                    "Buy Our Latest Course",
                    "Get Access to the Course"
                ];

                // Use stored variant or select one randomly from the array.
                // You could also just cancel the experiment here if the user already converted on button click.
                let variant = localStorage.getItem("headline-experiment");
                let headline = "";

                if (variant) {
                    headline = variants[variant];
                } else {
                    variant = Math.round(Math.random() * variants.length);
                    headline = variants[variant];
                }

                // Set the headline.
                document.getElementById("headline-experiment").innerText = headline;
                
                // Store the variant in localStorage.
                localStorage.setItem("headline-experiment", variant);

                // Construct the snippet.
                const snippet = document.createElement("script");
                snippet.src = "<?php echo constant('SCRIPT') ?>";
                snippet.id = "<?php echo constant('SCRIPT_ID'); ?>";
                snippet.setAttribute("data-code", "<?php echo constant('IDENTIFICATION_CODE'); ?>");

                // Only relevant in development mode...
                <?php if (constant('DEV')) { ?>
                    snippet.setAttribute("data-hit-endpoint", "<?php echo constant('HIT_ENDPOINT'); ?>");
                    snippet.setAttribute("data-event-endpoint", "<?php echo constant('EVENT_ENDPOINT'); ?>");
                    snippet.setAttribute("data-dev", "");
                <?php } ?>

                // Sets the tag for segmentation.
                snippet.setAttribute("data-tag-headline-experiment", headline);

                // Add the snippet to the site and init Pirsch.
                // Initialization must be executed to add events to elements with HTML attributes and CSS classes.
                // Usually this would happen automatically if you add the snippet to the page on your server.
                document.body.appendChild(snippet);
                snippet.addEventListener("load", () => pirschInit());

                // Reset experiment on button click.
                document.getElementById("reset").addEventListener("click", () => {
                    localStorage.removeItem("headline-experiment");
                    location.reload();
                });
            });
        </script>
    </body>
</html>
