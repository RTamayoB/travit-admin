import Link from "next/link";
import Image from "next/image";

export default function EditIconButton({
    href
  }: {
    href: string
  }) {
    return (
      <Link
        href={href}
        title="Editar"
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
