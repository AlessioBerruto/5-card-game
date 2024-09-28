import { Link } from "react-router-dom";
import '../styles/Navbar.scss';


function Navbar() {
	return (
		<div className="Navbar">
			<ul>
				<li>
					<Link to="/" className="navbar-link">						
						Home
					</Link>
				</li>
				<li>
					<Link to="/game" className="navbar-link">						
						Game
					</Link>
				</li>
				<li>
					<Link to="/profile" className="navbar-link">						
						Profile
					</Link>
				</li>
			</ul>			
		</div>
	);
}

export default Navbar;
