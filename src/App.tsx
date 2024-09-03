/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import TableView from './components/TableView'
import { ALL_APPOINTMENTS, CREATE_APPOINTMENT, UPDATE_APPOINTMENT } from './utils/gqlqueries'
import { IAppointment } from './types'
import Actions from './components/Actions'
import Modal from './components/Modal'
import FormAppointment from './components/FormAppointment'
import { icons } from './utils/icons/icons_store'
import { defaultAppointment, sortData } from './utils/functions'


function App(): React.ReactElement {

  const [updateAppointment] = useMutation(UPDATE_APPOINTMENT, {
    refetchQueries: [{ query: ALL_APPOINTMENTS }]
  });

  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    refetchQueries: [{ query: ALL_APPOINTMENTS }]
  });


  const { loading, error, data } = useQuery(ALL_APPOINTMENTS)
  const [formatedData, setFormatedData] = useState<IAppointment[] | unknown[]>([]);
  const [selectedItem, setSelectedItem] = useState<IAppointment | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleOpenForm = (item: IAppointment) => {
    setSelectedItem(item)
    setShowModal(true)
  }

  const openNewAppointment = () => {
    setSelectedItem(defaultAppointment)
    setShowModal(true)
  }

  const addNewAppointment = (appointment: IAppointment) => {
    console.log(appointment)
    createAppointment({
      variables: {
        date: appointment.date,
        status: appointment.status,
        patient: appointment.patient,
        specialist: appointment.specialist
      }
    })
    setShowModal(false)
  }


  const editAppointment = (appointment: IAppointment) => {
    console.log(appointment)
    updateAppointment({
      variables: {
        id: appointment.id,
        date: appointment.date,
        status: appointment.status,
        patient: appointment.patient?.id || appointment.patient,
        specialist: appointment.specialist?.id || appointment.specialist
      }
    })
    setShowModal(false)
  }


  const submitForm = (appointment: IAppointment) => {
    if (appointment.id === '')
      addNewAppointment(appointment)
    else
      editAppointment(appointment)
  }



  const formatData = (data: IAppointment[]): IAppointment[] => {
    return data.map((appointment) => {
      return {
        ...appointment,
        actions: <Actions appointment={appointment} action={handleOpenForm} />
      }
    })
  }


  useEffect(() => {
    if (data) {
      const sortedData = sortData(data.allAppointmets)
      setFormatedData(formatData(sortedData))
    }
  }, [data]);

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error</p>
  return (
    <div
      className='container mx-auto mt-10'
    >
      <button
        className='bg-green-400 px-4 py-2 rounded-md text-white'
        onClick={openNewAppointment}
      >Create a new Appointment
        <i className={icons.add}></i>
      </button>
      <TableView
        columns={[
          { field: 'date', header: 'Date' },
          { field: 'patient', header: 'Patient' },
          { field: 'specialist', header: 'Specialist' },
          { field: 'status', header: 'Status' },
          { field: 'actions', header: 'Actions' },
        ]}
        data={formatedData}
      />
      <Modal
        visible={showModal}
      >
        <FormAppointment
          appointment={selectedItem}
          show={showModal}
          closeModal={() => setShowModal(false)}
          submitForm={submitForm}
        />
      </Modal>

    </div>
  )
}

export default App
