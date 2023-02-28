import logo from "./logo.svg";
import Button from "@mui/material/Button";
import CustomButton from "../CustomButton/CustomButton";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#195aff",
        alignItems: "center",
        padding: "15px 30px",
      }}
    >
      <div>
        <img style={{ width: "120px" }} src={logo} alt="clarifia" />
      </div>
      {isSignedIn ? (
        <CustomButton color="#006dff" onClick={() => onRouteChange("signin")}>
          Sign Out
        </CustomButton>
      ) : route == "signin" ? (
        <CustomButton
          variant="contained"
          color="#006dff"
          fontSize="2px"
          onClick={() => onRouteChange("register")}
        >
          sign up
        </CustomButton>
      ) : (
        <CustomButton color="#006dff" onClick={() => onRouteChange("signin")}>
          sign in
        </CustomButton>
      )}
    </nav>
  );
};

export default Navigation;
