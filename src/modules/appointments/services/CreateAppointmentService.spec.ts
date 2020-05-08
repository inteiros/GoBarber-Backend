import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
    it('should be able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointment.execute({
            date: new Date(),
            provider_id: `12345678910`,
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe(`12345678910`);
    });

    // it('should not be able to create a new appointment at the same time', () => {
    //     expect(1).toBe(1);
    // });
});
