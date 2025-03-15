import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        
        <header className="w-full h-[65px] shadow-xl flex justify-center items-center relative bg-accent text-white">
            <img src="/logo.png" alt="logo" className="w-[55px] h-[55px] object-cover absolute left-1 bg-secondary"/>
            <Link to="/" className="text-[15px] font-bold m-2">Home</Link>
            <Link to="/contacts" className="text-[15px] font-bold m-2">Contacts</Link>
            <Link to="/gallery" className="text-[15px] font-bold m-2">Gallery</Link>
            <Link to="/items" className="text-[15px] font-bold m-2">Items</Link>
            <Link to="/booking" className="text-[25px] font-bold m-2 absolute right-5"><FaShoppingCart/></Link>
            
        </header>
        
    );
}
