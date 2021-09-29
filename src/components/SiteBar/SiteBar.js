import Navigation from '../Navigation/Navigation';
import styles from './SiteBar.module.css';

export default function SiteBar() {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
}
