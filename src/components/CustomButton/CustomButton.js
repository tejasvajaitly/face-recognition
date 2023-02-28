import Button from "@mui/material/Button";

export default function CustomButton({ children, color, onClick, ...rest }) {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: color,
        borderRadius: "12px",
        padding: ".625rem 1rem",
      }}
      variant="contained"
      {...rest}
    >
      {children}
    </Button>
  );
}
