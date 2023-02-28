import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <>
      <Typography variant="h3" color="inherit">
        Facial Recognition
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Deliver unparalleled levels of security, safety and performance with
        Clarifai's Facial Recognition AI solutions.
      </Typography>

      <TextField
        onChange={onInputChange}
        id="outlined-basic"
        label="image link"
        variant="outlined"
      />

      <Button variant="outlined" onClick={onSubmit}>
        Detect
      </Button>
    </>
  );
};

export default ImageLinkForm;
