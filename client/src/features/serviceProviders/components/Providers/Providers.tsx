import Card from '../../../../components/Card/Card';
import { ImFileEmpty } from 'react-icons/im';
import { UserResponse } from '../../../auth/types';
import styles from './Providers.module.scss';
import { InfiniteData } from '@tanstack/react-query';

interface Page {
  users: UserResponse[];
  currentPage: number;
  hasMore: boolean;
}

interface PropTypes {
  data?: InfiniteData<Page, unknown>;
}

export default function Providers({ data }: PropTypes) {
  const allUsers = data?.pages.flatMap((page) => page.users) ?? [];

  return (
    <div className={styles.providers}>
      <div className="container">
        <div className={styles.providersLayout}>
          {allUsers.map((user: UserResponse) => (
            <Card user={user} key={user._id} />
          ))}
        </div>

        {allUsers.length === 0 && (
          <div className={styles.noProviders}>
            <h2 className={styles.message}><ImFileEmpty /> No service providers found</h2>
          </div>
        )}
      </div>
    </div>
  );
}
