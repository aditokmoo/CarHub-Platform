import axios from "../../../../api/http";
import { Appointment } from "../../../../types";

export async function createAppointment(appointmentData: Appointment) {
    try {
        const res = await axios.post('/api/appointment/create', appointmentData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        
        return res.data;
    } catch (error) {
        console.error('Error creating appointment:', error);
        return error;
    }
}

export async function getAppointments(token: string) {
    console.log(token)
    try {
        const res = await axios.get('/api/appointment/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            withCredentials: true,
        });
        
        return res.data.appointments;
    } catch (error) {
        console.error('Error getting appointments:', error);
        return error;
    }
}