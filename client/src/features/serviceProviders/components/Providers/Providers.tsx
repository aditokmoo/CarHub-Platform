import useArchiveProviders from '../../../../hooks/useArchiveProviders';
import Card from '../../../../components/Card/Card';
import { ImFileEmpty } from 'react-icons/im';
import { UserResponse } from '../../../auth/types/authTypes';
import styles from './Providers.module.scss';

interface PropTypes {
  data: {
    users: UserResponse[];
  };
}

export default function Providers({ data }: PropTypes) {
  const { archive, toggleArchive } = useArchiveProviders();

  return (
    <div className={styles.providers}>
      <div className="container">
        <div className={styles.providersLayout}>
          {data?.users?.map((user: UserResponse) => (
            <Card user={user} toggleArchive={toggleArchive} archive={archive} key={user.name} />
          ))}
        </div>
        <div className={styles.noProviders}>
          {data?.users?.length === 0 && (
            <h2 className={styles.message}><ImFileEmpty /> No service providers found</h2>
          )}
        </div>
      </div>
    </div>
  );
}
