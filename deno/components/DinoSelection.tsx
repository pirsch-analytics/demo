export function DinoSelection() {
    // TODO read A/B testing cookie to decide which version to display.
    const variant = "A";

    return (
        <>
            {variant === "A" ? (
                <>
                    <div class="dinos">
                        <div>
                            <img src="triceratops.png" alt="Ankylosaurus" />
                            <a href="/dinos/ankylosaurus">Get an Ankylosaurus!</a>
                        </div>
                        <div>
                            <img src="brachiosaurus.png" alt="Ankylosaurus" />
                            <a href="/dinos/brachiosaurus">Get a Brachiosaurus!</a>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div class="dinos">
                        <div>
                            <img src="brachiosaurus.png" alt="Ankylosaurus" />
                            <a href="/dinos/brachiosaurus">Get a Brachiosaurus!</a>
                        </div>
                        <div>
                            <img src="triceratops.png" alt="Ankylosaurus" />
                            <a href="/dinos/ankylosaurus">Get an Ankylosaurus!</a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
