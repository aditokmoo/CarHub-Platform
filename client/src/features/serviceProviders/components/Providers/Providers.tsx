import Card from '../../../../components/Card/Card';
import { ImFileEmpty } from 'react-icons/im';
import { UserResponse } from '../../../auth/types';
import styles from './Providers.module.scss';

interface PropTypes {
  data: {
    users: UserResponse[];
  };
}

export default function Providers({ data }: PropTypes) {
  console.log(data)
  return (
    <div className={styles.providers}>
      <div className="container">
        <div className={styles.providersLayout}>
          {data?.users?.map((user: UserResponse) => (
            <Card user={user} key={user.name} />
          ))}
        </div>
        {data?.users?.length === 0 && (
          <div className={styles.noProviders}>
            <h2 className={styles.message}><ImFileEmpty /> No service providers found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
