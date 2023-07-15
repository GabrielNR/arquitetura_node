import { startOfHour } from 'date-fns'
import {inject, injectable } from 'tsyringe'

import AppError from "@shared/errors/AppError";

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ){}

  //1 metodo apenas
  public async execute({date, provider_id}: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    //se tiver agendamento mesmo horario da um erro
    if (findAppointentInSameDate) {
      throw new AppError('This appointment is already booked')
  }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}

export default CreateAppointmentService