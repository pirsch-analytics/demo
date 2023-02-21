interface DinoSelectionProps {
    variant?: string
}

export function DinoSelection(props: DinoSelectionProps) {
    return (
        <>
            {props.variant === "A" ? (
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
