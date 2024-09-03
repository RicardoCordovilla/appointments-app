import React from "react";
import IconButton from "./IconButton"
import { IAppointment } from "../types";

interface ActionsProps {
    appointment: IAppointment;
    action: (item: IAppointment) => void;
}

const actions = ['edit']

const Actions: React.FC<ActionsProps> = ({ appointment, action }) => {

    return (
        <div>
            {actions.map((act, index) => (
                <IconButton
                    key={index}
                    icon={act}
                    onClick={() => action(appointment)}
                />
            ))}

        </div>
    )
}

export default Actions