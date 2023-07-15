//imports
import { EntityRepository, Repository, getRepository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';


class AppointmentsRepository implements IAppointmentRepository{
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  
  //metodo
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.ormRepository.findOne({
      // encontar um appointment
      where: { date }, // aonde a data seja igual a data passada no findByDate
    });

    return findAppointment || null;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    //Criação de Appointment
    const appointment = this.ormRepository.create({ 
     provider_id,
     date
    });

    //Salvando appointment
    await this.ormRepository.save(appointment);

    return appointment
  }
}

export default AppointmentsRepository;