import { IAppointment } from "../types"


export const defaultAppointment: IAppointment = {
    id: '',
    date: '',
    status: '',
    specialist: {
        id: '',
        name: ''
    },
    patient: {
        id: '',
        name: '',
    }
}

export const sortData = (data: IAppointment[]): IAppointment[] => {
    const sortData = (data: IAppointment[]): IAppointment[] => {
        const now = new Date().toISOString().split('T')[0]
        const today = data.filter(item => item.date === now)
        const future = data.filter(item => item.date > now)
        const past = data.filter(item => item.date < now)
        return [...past, ...today, ...future,]
    }
    return sortData(data)
}

