import styles from "./avatar.module.scss";
import Image from "next/image";

interface AvatarProps {
  src: string;
  size?:
    | "extra-small"
    | "small"
    | "regular"
    | "medium"
    | "large"
    | "extra-large";
}

function Avatar({
  src,
  size = "regular",
}: AvatarProps) {
  const sizeMap = {
    "extra-small": 16,
    "small": 24,
    "regular": 32,
    "medium": 40,
    "large": 48,
    "extra-large": 64,
  };

  const dimension = sizeMap[size];

  return (
    <div
      className={styles.avatar}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src={src}
        alt="Profile Picture"
        width={dimension}
        height={dimension}
        className={styles.avatar}
      />
    </div>
  );
}

export default Avatar;
