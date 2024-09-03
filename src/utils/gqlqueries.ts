import { gql } from '@apollo/client';

export const ALL_USERS = gql`
query {
  allUsers {
    id
    name
    email
    phone
    city
    role
  }
}
`

export const ALL_APPOINTMENTS = gql`
query {
  allAppointmets {
    id
    date
    patient {
      id
      name
    }
    specialist {
      id
      name
    }
    status
    date
  }
}
`

export const UPDATE_APPOINTMENT = gql`
mutation ($id: ID!, $patient: ID!, $specialist: ID!, $date: String!, $status: String!) {
  updateAppointment(id: $id, patient: $patient, specialist: $specialist, date: $date, status: $status) {
    id
    status
  }
}
`

export const LIST_SPECIALISTS = gql`
query {
  listSpecialists {
    id
    name
  }
}
`

export const LIST_PATIENTS = gql`
query {
  listPatients {
    id
    name
  }
}
`

export const CREATE_APPOINTMENT = gql`
mutation ($patient: ID!, $specialist: ID!, $date: String!, $status: String!) {
  addAppointment(patient: $patient, specialist: $specialist, date: $date, status: $status) {
    id
    status
  }
}
`

