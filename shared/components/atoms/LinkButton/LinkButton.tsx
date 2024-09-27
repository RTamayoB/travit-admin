import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import './linkButton.scss'

interface LinkButtonProps {
    label: string;
    href: Url;
}

export const LinkButton = ({
        label = '',
        href
    }: LinkButtonProps) => {
    return (
        <Link
            href={href}
            className='link-button'
            style={{ textDecoration: 'none' }}
        >
            {label}
        </Link>
    )
}
