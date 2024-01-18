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
            data-tag-Author="John",
            data-tag="foo,Bar"
            <?php
            if (constant('DEV')) {
                echo 'data-hit-endpoint="https://localhost.com:9999/hit" data-event-endpoint="https://localhost.com:9999/event" data-dev';
            }
            ?>
            ></script>
    </head>
    <body>
        <h1>Welcome to the Pirsch Web Demo!</h1>
        <p>
            <a href="/" class="menu menu-active">Home</a>
            <a href="/page.php" class="menu">Second Page</a>
            <a href="/video.php" class="menu">Video Tracking</a>
        </p>
        <p>
            This demo shows how you can use Pirsch on your website. Appart from tracking page views, it also showcases more advanced features, including:
            <ul>
                <li>custom events</li>
                <li>outbound link tracking</li>
                <li>tracking file downloads</li>
                <li>tracking 404 pages</li>
            </ul>
        </p>
        
        <!-- Custom event tracking using JavaScript, HTML attributes, and CSS classes. -->
        <h2>Custom Events</h2>
        <p>
            Click the buttons below to trigger custom events. There are three methods available to add events to your page:
            <ul>
                <li>using JavaScript, manually triggering an event on an action</li>
                <li>adding a HTML attribute to certain elements, triggering events on click</li>
                <li>adding a CSS class name to certain elements, triggering events on click</li>
            </ul>
        </p>
        <p>
            <button id="event-trigger">
                Trigger Custom Event (JavaScript)
            </button>
        </p>
        <p>
            <button pirsch-event="HTML Button Clicked" pirsch-meta-key="meta value" pirsch-duration="2">
                Trigger Custom Event (HTML)
            </button>
        </p>
        <p>
            <button class="btn pirsch-event=CSS+Button+Clicked pirsch-meta-key=meta+value pirsch-duration=3">
                Trigger Custom Event (CSS)
            </button>
        </p>
        <script>
            // Wait until the page has fully loaded.
            document.addEventListener("DOMContentLoaded", () => {
                // Get the button using the id attribute and add a click event handler.
                document.getElementById("event-trigger").addEventListener("click", () => {
                    // Send the event to Pirsch.
                    pirsch("JS Button Clicked", {
                        duration: 1,
                        meta: {
                            key: "meta value"
                        }
                    });

                    // Log to console for debugging.
                    console.log("JS button clicked");
                });
            });
        </script>

        <!-- Track outbound links. -->
        <h2>Outbound Link Tracking</h2>
        <p>
            Outbound link tracking helps you to identify which links to other websites are clicked the most. Outbound link tracking is automatically added to all external links. Click the link below to trigger an outbound link click event.
        </p>
        <p>
            <a href="https://pirsch.io" target="_blank">Visit pirsch.io (target=_blank)</a><br />
            <a href="https://docs.pirsch.io">Visit docs.pirsch.io</a>
        </p>
        <p>
            The outbound links below will be ignored, since they have the pirsch-ignore attriube or CSS class set.
        </p>
        <p>
            <a href="https://pirsch.io" target="_blank" pirsch-ignore>Visit pirsch.io</a><br />
            <a href="https://pirsch.io" target="_blank" class="pirsch-ignore">Visit pirsch.io</a>
        </p>
        <p>
            Empty and broken links will also be ignored.
        </p>
        <p>
            <a href="">Empty link</a><br />
            <a href=".http:broken">Broken link</a>
        </p>
        <p>
            External links with additional event tracking will trigger two events.
        </p>
        <p>
            <a href="https://docs.pirsch.io" pirsch-event="Two events on one click">Visit docs.pirsch.io</a>
        </p>

        <!-- Track file downloads. -->
        <h2>Tracking File Downloads</h2>
        <p>
            Pirsch will automatically track an event for each link that contains a file extension. Downloading the PDF below will trigger an event, letting you know which file was downloaded. You can add file extensions by setting the data-download-extensions attribute.
        </p>
        <p>
            <a href="/download/sample.pdf">PDF Download</a>
        </p>

        <!-- Track 404 pages. -->
        <h2>Tracking 404 Pages</h2>
        <p>
            Pages that cannot be found can simply be tracked by calling the pirschNotFound JavaScript function. They will be displayed as an event on the Pirsch dashboard. The button below will simulate the behaviour. Usually you would just add a simple JavaScript snippet to trigger the function.
        </p>
        <p>
            <button onclick="pirschNotFound()">404 Page Not Found</button>
        </p>

        <!-- Track programmatic URL changes. -->
        <h2>Programmatic URL changes</h2>
        <p>
            Clicking the following button will change the URL without changing the page.
        </p>
        <p>
            <button id="url-change">Change URL</button>
            <button id="url-reset">Reset URL</button>
        </p>
        <script>
            // Wait until the page has fully loaded.
            document.addEventListener("DOMContentLoaded", () => {
                // Get the button using the id attribute and add a click event handler.
                document.getElementById("url-change").addEventListener("click", () => {
                    // Change the URL.
                    history.pushState(null, "", "/test");

                    // Log to console for debugging.
                    console.log("URL change button clicked");
                });

                document.getElementById("url-reset").addEventListener("click", () => {
                    history.pushState(null, "", "/");
                    console.log("URL reset button clicked");
                });
            });
        </script>

        <!-- Track forms. -->
        <h2>Form Submissions</h2>
        <p>
            Submitting the following form will create an event with metadata.
        </p>
        <form method="post" id="form">
            <label>Enter a message:</label>
            <br />
            <input type="text" name="message" id="message" required />
            <br />
            <input type="submit" value="Submit" />
        </form>
        <script>
            // Wait until the page has fully loaded.
            document.addEventListener("DOMContentLoaded", () => {
                // Get the form using the id attribute and add a submission event handler.
                document.getElementById("form").addEventListener("submit", e => {
                    // Get the message and send the event.
                    const input = document.getElementById("message");
                    pirsch("Form Submission", {
                        meta: {
                            message: input.value
                        }
                    });
                });
            });
        </script>

        <!--
            Track the scroll depth. You can configure how many events are being tracked by modifiying the "steps" variable.
            100% scroll / steps = number of events.
        -->
        <script>
            const steps = 5;

            document.addEventListener("DOMContentLoaded", () => {
                let depth = 0;
                let step = 0;

                window.addEventListener("scroll", () => {
                    const currentDepth = getScrollPercent();

                    if (currentDepth > depth) {
                        depth = currentDepth;
                        const currentStep = Math.round(depth/(100/steps));

                        if (currentStep > step) {
                            step = currentStep;
                            pirsch("Scroll Depth", {meta: {depth: step*(100/steps)+"%"}});
                        }
                    }
                });
            });

            function getScrollPercent() {
                const h = document.documentElement, 
                    b = document.body,
                    st = 'scrollTop',
                    sh = 'scrollHeight';
                return Math.floor((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
            }
        </script>
    </body>
</html>