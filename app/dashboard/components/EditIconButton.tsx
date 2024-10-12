import Link from "next/link";
import Image from "next/image";

export default function EditIconButton({
    href,
    className
  }: {
    href: string,
    className?: string
  }) {
    return (
      <Link
        href={href}
        title="Editar"
        className={className}
      >
        <Image
          src={'/images/edit.svg'}
          width={24}
          height={24}
          blurDataURL={'/images/edit.svg'}
          alt="Editar"
        />
      </Link>
    )
}
