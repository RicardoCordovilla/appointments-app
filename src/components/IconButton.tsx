import 'boxicons/css/boxicons.min.css'
import { icons } from '../utils/icons/icons_store';
interface IconButtonProps {
    icon: string;
    onClick: () => void;
}


const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
    return (
        <button
            className='p-1'
            onClick={onClick}
        >
            <span className='text-slate-950'>
                <i className={icons[icon]}></i>
            </span>
        </button>
    )
}

export default IconButton


