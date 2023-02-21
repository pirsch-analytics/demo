interface DinoSelectionProps {
    variant?: string
}

export function DinoSelection(props: DinoSelectionProps) {
    return (
        <>
            {props.variant === "A" ? (
                <>
                    <div class="dinos">
                        <div class="card">
                            <a href="/dinos/brachiosaurus" class="card-content">
                                <img src="brachiosaurus.png" alt="Ankylosaurus" />
                                <span>Brachiosaurus</span>
                            </a>
                        </div>
                        <div class="card">
                            <a href="/dinos/ankylosaurus" class="card-content">
                                <img src="ankylosaurus.png" alt="Ankylosaurus" />
                                <span>Ankylosaurus</span>
                            </a>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div class="dinos">
                        <div class="card">
                            <a href="/dinos/brachiosaurus" class="card-content">
                                <img src="brachiosaurus.png" alt="Ankylosaurus" />
                                <span>Brachiosaurus</span>
                            </a>
                        </div>
                        <div class="card">
                            <a href="/dinos/ankylosaurus" class="card-content">
                                <img src="ankylosaurus.png" alt="Ankylosaurus" />
                                <span>Ankylosaurus</span>
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
