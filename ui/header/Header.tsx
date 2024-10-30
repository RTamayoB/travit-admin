import { Breadcrumbs, LinkButton } from "@/ui/components";
import styles from './header.module.scss';
import { BreadcrumbItem } from "@/ui/components/breadcrumbs";

interface TableHeaderProps {
  breadcrumbList: BreadcrumbItem[]
  actions: React.ReactNode
}

function Header({
  breadcrumbList,
  actions
}: TableHeaderProps) {
  return (
    <div className={styles.header}>
    <Breadcrumbs breadcrumbs={breadcrumbList}/>
    <div>
      {actions}
    </div>
  </div>
  )
}

export default Header;
