//imports
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns'
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository{
  //BD do fake
  private appointments: Appointment[] = []
  
  //metodo
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    );

    return findAppointment;
  };

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    //criação de agendamento
    const appointment = new Appointment();

    Object.assign(appointment, 
    { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository;