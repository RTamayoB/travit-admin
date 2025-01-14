import { Typography } from "@/ui/components";
import styles from './requestdetails.module.scss'

function LabelValuePair({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className={styles.item}>
      <Typography className={styles.label} variant="bodyLarge">
        {label}
      </Typography>
      <Typography className={styles.value} variant="bodyMedium">
        {value}
      </Typography>
    </div>
  );
}

export default LabelValuePair;
