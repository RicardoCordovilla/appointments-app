import { useForm, Controller } from 'react-hook-form'
import { IAppointment, IPatient, ISpecialist } from "../types"
import { useQuery } from '@apollo/client';
import { LIST_PATIENTS, LIST_SPECIALISTS } from '../utils/gqlqueries';
import { defaultAppointment } from '../utils/functions';
import Swal from 'sweetalert2';


interface FormProps {
    appointment?: IAppointment | null;
    show: boolean;
    closeModal: () => void;
    submitForm: (appointment: IAppointment) => void;
}



const FormAppointment = ({ appointment, closeModal, show, submitForm }: FormProps) => {

    const { data: dataSpecialists } = useQuery(LIST_SPECIALISTS);
    const { data: dataPatients } = useQuery(LIST_PATIENTS);
    const { handleSubmit, formState: { errors }, control } = useForm({ values: appointment || defaultAppointment });

    const onSubmit = async (body: IAppointment) => {
        if (!body?.date) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a date' }) 
            return
        }
        if(!body?.patient) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a patient' }) 
            return
        }
        if(!body?.specialist) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a specialist' }) 
            return
        }
        if(!body?.status) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: 'Please select a status' }) 
            return
        }

        submitForm(body);
    }

    return (
        <div
            className={
                `bg-white rounded-lg shadow-lg p-6 w-1/3 mx-auto ease-in-out duration-300 delay-75 relative
    ${show ? 'opacity-100 scale-100' : 'opacity-40 scale-60 invisible duration-400 delay-200'}
    `
            }
        >
            <i
                className="bx bx-x absolute top-2 right-2 size-10 text-3xl cursor-pointer"
                onClick={closeModal as () => void}
            ></i>
            <h2 className="text-2xl font-semibold">Modal</h2>
            <p className="text-gray-500">This is a modal</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4"
            >
                <div
                    className="flex flex-col mb-4"
                >

                    <label className="block text-sm">Date</label>
                    <Controller name='date' control={control} render={({ field }) => (
                        <input
                            type="date"
                            className="w-full border border-gray-400 rounded-md px-2 py-1"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )} />

                    {
                        errors.date && <span className="text-red-500">This field is required</span>
                    }
                </div>

                <div
                    className="flex flex-col mb-4"
                >

                    <label className="block text-sm">Patient</label>
                    <Controller
                        name="patient"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <span>{field.value.name}</span>
                                <select
                                    className="w-full border border-gray-400 rounded-md px-2 py-1"
                                    value={field.value.id}
                                    onChange={field.onChange}
                                >
                                    {
                                        dataPatients?.listPatients.map((patient: IPatient) => (
                                            <option key={patient.id} value={patient.id}>{patient.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
                    />
                    {
                        errors.patient && <span className="text-red-500">This field is required</span>
                    }

                </div>


                <div
                    className="flex flex-col mb-4"
                >

                    <label className="block text-sm">Patient</label>
                    <Controller
                        name="specialist"
                        control={control}
                        render={({ field }) => (
                            <div>
                                <span>{field.value.name}</span>
                                <select
                                    className="w-full border border-gray-400 rounded-md px-2 py-1"
                                    value={field.value.id}
                                    onChange={field.onChange}
                                >
                                    {
                                        dataSpecialists?.listSpecialists.map((specialist: ISpecialist) => (
                                            <option key={specialist.id} value={specialist.id}>{specialist.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        )}
                    />
                    {
                        errors.patient && <span className="text-red-500">This field is required</span>
                    }

                </div>

                <div
                    className="flex flex-col mb-4"
                >

                    <label className="block text-sm">Status</label>
                    <Controller name='status' control={control} render={({ field }) => (
                        <select
                            className="w-full border border-gray-400 rounded-md px-2 py-1"
                            value={field.value}
                            onChange={field.onChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                        </select>
                    )} />
                    {
                        errors.status && <span className="text-red-500">This field is required</span>
                    }
                </div>

                <div
                    className="flex flex-col mt-5"
                >
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                </div>

            </form >


        </div >
    )
}

export default FormAppointment