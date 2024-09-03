export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    city: string;
    role: string;
}

export interface IUserCreate {
    name: string;
    email: string;
    phone?: string;
    city?: string;
}

export interface ICreateAppointment {
    patient: string;
    specialt: string;
    date: string;
    status: string;
}

export interface IPatient {
    id: string;
    name: string;
}

export interface ISpecialist {
    id: string;
    name: string;
}

export interface IAppointment {
    id?: string;
    date: string;
    status: string;
    specialist: ISpecialist;
    patient: IPatient;
}
