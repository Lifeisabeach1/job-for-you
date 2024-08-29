import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="navbar">
        <div className="left-section">
          <h3 className="cv-for-you">CV for you</h3>
          
        </div>
            <div className="infomation">
      
        
              <NavLink className="personal-letter" to="/">Personligt brev</NavLink>
              <NavLink className="cv" to="/cv">Cv</NavLink>
              <NavLink className="product" to="/summary">Produkt</NavLink>
              <NavLink className="cvsummary" to="/cvsummary">CvSummary</NavLink>
            </div>
          </div>
    </nav>
  );
};

export default NavBar;
