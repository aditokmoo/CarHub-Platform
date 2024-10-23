import Card from '../../components/Card/Card';
import useArchiveProviders from '../../hooks/useArchiveProviders';
import { User } from '../../types';
// SCSS
import styles from './SavedProviders.module.scss'

export default function SavedProviders() {
  const { archive, toggleArchive } = useArchiveProviders();

  return (
    <div className={styles.savedProvidersLayout}>
      <h2 className={styles.title}>Saved Providers</h2>
      <div className={styles.savedProviders}>
        {archive.map((user: User) => (
          <Card user={user} toggleArchive={toggleArchive} archive={archive} key={user.name} />
        ))}
      </div>
    </div>
  )
}
