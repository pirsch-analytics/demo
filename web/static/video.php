<?php include_once('config.php'); ?>

<!DOCTYPE html>
<html>
    <head>
        <title>Pirsch Web Demo</title>
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

        <!-- Add the YouTube iframe API script. -->
        <script src="https://www.youtube.com/iframe_api"></script>

        <!-- Add the Vimeo player.js script -->
        <script src="https://player.vimeo.com/api/player.js"></script>
    </head>
    <body>
        <h1>Video Tracking</h1>
        <p>
            <a href="/" class="menu">Home</a>
            <a href="page.php" class="menu">Second Page</a>
            <a href="/video.php" class="menu menu-active">Video Tracking</a>
            <a href="/abtesting.php" class="menu">A/B Testing</a>
        </p>
        <p>
            Track whether a video, YouTube video, or Vimeo video was started, and completed, and how long it played. If you have multiple videos on a site, change the event name for each of them or add the title in the metadata.
        </p>

        <!-- HTML video example. -->
        <h2>HTML Video</h2>
        <video id="video" width="640" height="360" controls>
            <source src="/video/video.mp4" type="video/mp4" />
            <source src="/video/video.ogg" type="video/ogg" />
            Your browser does not support the video tag.
        </video>
        <script>
            (function() {
                // Add an event listener to wait until the page has fully loaded.
                document.addEventListener("DOMContentLoaded", () => {
                    // Initialize the player and set up event handlers for state changes.
                    // The progress will be tracked as a number between 0 and 100%.
                    // The started and completed states are tracked as 0 or 1.
                    const player = document.getElementById("video");
                    let progress = 0;
                    let started = 0;
                    let completed = 0;
                    
                    player.addEventListener("playing", () => {
                        started = 1;

                        // debugging
                        console.log("Video playback started.");
                    });

                    player.addEventListener("pause", () => {
                        const p = Math.round(player.currentTime / player.duration * 100);

                        if (p > progress) {
                            progress = p;
                        }

                        // debugging
                        console.log("Video playback paused.", progress);
                    });

                    player.addEventListener("ended", () => {
                        progress = 100;
                        completed = 1;

                        // debugging
                        console.log("Video playback ended.");
                    });

                    // Send the progress when the page is navigated away from or the tab/window is closed.
                    window.addEventListener("beforeunload", () => {
                        if (started) {
                            pirsch("Video Playback", {
                                meta: {
                                    progress,
                                    started,
                                    completed
                                }
                            });
                        }
                    });
                });
            })();
        </script>

        <!-- YouTube example. The div will be replaced with the player. -->
        <h2>YouTube</h2>
        <div id="youtube"></div>
        <script>
            (function() {
                // Initialize the player and set up event handlers for state changes.
                // The progress will be tracked as a number between 0 and 100%.
                // The started and completed states are tracked as 0 or 1.
                let player;
                let progress = 0;
                let started = 0;
                let completed = 0;

                // Wait until the YouTube iframe API is ready. This function must have this name!
                function onYouTubeIframeAPIReady() {
                    player = new YT.Player("youtube", {
                        height: "360",
                        width: "640",
                        videoId: "dQw4w9WgXcQ",
                        events: {
                            "onStateChange": event => {
                                if (event.data === YT.PlayerState.PLAYING) {
                                    started = 1;

                                    // debugging
                                    console.log("YouTube video playback started.");
                                } else if (event.data === YT.PlayerState.PAUSED) {
                                    const p = Math.round(player.getCurrentTime() / player.getDuration() * 100);

                                    if (p > progress) {
                                        progress = p;
                                    }
                                    
                                    // debugging
                                    console.log("YouTube video progress: ", progress);
                                } else if (event.data === YT.PlayerState.ENDED) {
                                    progress = 100;
                                    completed = 1;

                                    // debugging
                                    console.log("YouTube video playback ended.");
                                }
                            }
                        }
                    });
                }

                // Send the progress when the page is navigated away from or the tab/window is closed.
                window.addEventListener("beforeunload", () => {
                    if (started) {
                        pirsch("YouTube Playback", {
                            meta: {
                                progress,
                                started,
                                completed
                            }
                        });
                    }
                });
            })();
        </script>

        <!-- Vimeo example. The div will be replaced with the player. -->
        <h2>Vimeo</h2>
        <div id="vimeo"></div>
        <script>
            (function() {
                // Initialize the player and set up an event handler for state changes.
                // The progress will be tracked as a number between 0 and 100%.
                // The started and completed state are tracked as 0 or 1.
                let player;
                let progress = 0;
                let started = 0;
                let completed = 0;

                document.addEventListener("DOMContentLoaded", () => {
                    var iframe = document.querySelector("#vimeo");
                    player = new Vimeo.Player(iframe, {
                        id: 76979871, // video ID
                        width: 640
                    });

                    // Event listener for the play progress.
                    player.on("timeupdate", data => {
                        const p = Math.round(data.percent * 100);

                        if (p > progress) {
                            progress = p;

                            if (p >= 100) {
                                progress = 100;
                                completed = 1;

                                // debugging
                                console.log("Vimeo video playback ended.");
                            }
                        }

                        // debugging
                        console.log("Vimeo video progress: ", progress);
                    });

                    // Event listener triggered when the video is started.
                    player.on("play", () => {
                        started = 1;

                        // debugging
                        console.log("Vimeo video playback started.");
                    });
                });

                // Send the progress when the page is navigated away from or the tab/window is closed.
                window.addEventListener("beforeunload", () => {
                    if (started) {
                        pirsch("Vimeo Playback", {
                            meta: {
                                progress,
                                started,
                                completed
                            }
                        });
                    }
                });
            })();
        </script>
    </body>
</html>
