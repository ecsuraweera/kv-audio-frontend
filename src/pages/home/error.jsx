import { Link } from "react-router-dom";

export default function ErrorNotFound() {
    return (
        <div>
            <h1>404 Error. Not found</h1>
            <Link classname="bg-red-900" to="/">Go Back to Home</Link>
        </div>
    );
}