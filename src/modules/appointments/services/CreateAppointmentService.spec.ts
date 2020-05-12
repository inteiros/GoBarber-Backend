import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to create a new appointment', async () => {
        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: '123456',
            provider_id: `12345678910`,
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe(`12345678910`);
    });

    it('should not be able to create a new appointment at the same time', async () => {
        const appointmentsDate = new Date(2020, 4, 10, 11);

        await createAppointment.execute({
            date: appointmentsDate,
            user_id: '123456',
            provider_id: `12345678910`,
        });

        await expect(
            createAppointment.execute({
                date: appointmentsDate,
                user_id: '123456',
                provider_id: `12345678910`,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
