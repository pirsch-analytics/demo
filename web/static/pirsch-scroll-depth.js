(function() {
    const snippet = document.getElementById("pascrode");

    if (snippet) {
        document.addEventListener("DOMContentLoaded", () => {
            let depth = 0;

            window.addEventListener("scroll", () => {
                const currentDepth = getScrollPercent();

                if (currentDepth > depth) {
                    depth = currentDepth;
                }
            });

            window.addEventListener("beforeunload", () => {
                const name = snippet.getAttribute("data-event-name") ?? "Scroll Depth";
                const steps = snippet.getAttribute("data-steps");
                const meta = {
                    depth: steps ? roundToSteps(depth, steps) : depth
                };

                for (const attr of snippet.getAttributeNames()) {
                    if (attr.startsWith("data-") && attr !== "data-event-name" && attr !== "data-steps") {
                        meta[attr.substring("data-".length)] = snippet.getAttribute(attr);
                    }
                }

                pirsch(name, {meta});
            });
        });

        function getScrollPercent() {
            const h = document.documentElement, 
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            return Math.floor((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100);
        }

        function roundToSteps(depth, steps) {
            const stepSize = 100 / steps;
            return Math.round(depth / stepSize) * stepSize;
        }
    } else {
        console.error("Pirsch Analytics scroll depth snippet not found on page!");
    }
})();
