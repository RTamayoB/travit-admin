import { Breadcrumbs } from "@/ui/components";
import styles from "./header.module.scss";
import { BreadcrumbItem } from "@/ui/components/breadcrumbs";

interface HeaderProps {
  breadcrumbList: BreadcrumbItem[];
  actions?: React.ReactNode;
}

function Header({
  breadcrumbList,
  actions,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <Breadcrumbs breadcrumbs={breadcrumbList} />
      <div>
        {actions}
      </div>
    </header>
  );
}

export default Header;
