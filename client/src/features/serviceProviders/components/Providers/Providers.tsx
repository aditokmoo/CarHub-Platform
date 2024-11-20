import useArchiveProviders from '../../../../hooks/useArchiveProviders';
import Card from '../../../../components/Card/Card';
import { User } from '../../../../types';
import styles from './Providers.module.scss';

interface PropTypes {
  data: {
    users: User[];
  };
}

export default function Providers({ data }: PropTypes) {
  const { archive, toggleArchive } = useArchiveProviders();

  return (
    <div className={styles.providers}>
      <div className="container">
        <div className={styles.providersLayout}>
          {data?.users?.map((user: User) => (
            <Card user={user} toggleArchive={toggleArchive} archive={archive} key={user.name} />
          ))}
        </div>
      </div>
    </div>
  );
}
