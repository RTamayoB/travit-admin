import Image from "next/image";

export default function DeleteIconButton({
    action
  }: {
    action: () => void
  }) {
    return (
      <>
        <button
          onClick={action}
          title="Eliminar"
        >
          <Image
            src={'/images/delete.svg'}
            width={24}
            height={24}
            blurDataURL={'/images/delete.svg'}
            alt={'Elminar'}
          />
        </button>
      </>
    )
}
