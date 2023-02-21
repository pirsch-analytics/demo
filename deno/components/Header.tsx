import { Head } from "$fresh/runtime.ts";

interface HeaderProps {
    title: string
}

export function Header(props: HeaderProps) {
    return (
        <Head>
            <base href="/" />
            <title>{props.title}</title>
            <link rel="stylesheet" href="dinorder.css" />
        </Head>
    );
}
