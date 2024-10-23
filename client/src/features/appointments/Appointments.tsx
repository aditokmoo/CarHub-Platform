import { useGetAppointments } from './api/hooks/useAppointment'
import Table from './components/Table/Table';
import styles from './Appointments.module.scss';

export default function Appointments() {
  const { data: appointments, isLoading: isLoadingAppointments } = useGetAppointments();

  if(isLoadingAppointments) return <h2>Loading...</h2>

  console.log(appointments)

  return (
    <div className={styles.appointmentsLayout}>
      <Table appointments={appointments} />
    </div>
  )
}
