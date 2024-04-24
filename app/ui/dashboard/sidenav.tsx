import Link from 'next/link';
//import AcmeLogo from '@/app/ui/acme-logo';
//import { PowerIcon } from '@heroicons/react/24/outline';
//import { signOut } from '@/auth';
import styles from "./sidenav.module.scss"
import { Button } from '@/shared/components';
import NavLinks from './nav-links';

export default function SideNav() {
  return (
    <div className={styles.sidenavContent}>
      <Link
        className={styles.logoLink}
        href="/"
      >
        <div>
            Travit
        </div>
      </Link>
      <div className={styles.navLinksContainer}>
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
            className={styles.form}
            action="auth/signout"
            method="post"
        >
            <Button type="submit">Sign Out</Button>
        </form>
      </div>
    </div>
  );
}