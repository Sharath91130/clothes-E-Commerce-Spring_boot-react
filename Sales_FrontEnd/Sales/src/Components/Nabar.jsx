import {Link} from "react-router";

export default function NavBar(){
    return(
        <>
            <Link to={"/"}> Register </Link>
            <Link to={"/login"}> Login</Link>
            <Link to={"/customerhome"}>CustomerHome</Link>

        </>
    )
}