import React, { useEffect } from 'react';
import { IAppointment } from '../types';

interface Column {
    field: string;
    header: string;
}

interface DataTableProps {
    columns: Column[];
    data: IAppointment[] | unknown[];
}

const TableView: React.FC<DataTableProps> = ({ columns, data }) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [formatedData, setFormatedData] = React.useState<IAppointment[] | any[]>([]);

    useEffect(() => {
        if (data) {
            setFormatedData(data);
        }
    }, [data]);

    return (
        <div className=''>

            <div className='mt-10 border border-gray-400 bg-slate-300 rounded-md w-fit ml-10'>
                <table className='w-full' >
                    <thead className=''>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.field}
                                    className='text-center px-4 py-2'
                                >{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            formatedData && formatedData.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {columns.map((col) => (
                                        <td key={col.field} className={`py-2 px-3 ${rowIndex % 2 === 0 ? 'bg-slate-200' : 'bg-slate-100'}`}>
                                            {
                                                (col.field === 'patient' || col.field === 'specialist')
                                                    ? row[col.field].name
                                                    : col.field === 'status'
                                                        ? <span className={`px-2 py-1 uppercase rounded-md ${row[col.field] === 'pending' ? 'bg-yellow-400' : 'bg-green-400'}`}>{row[col.field]}</span>
                                                        : row[col.field]
                                            }
                                        </td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default TableView;
