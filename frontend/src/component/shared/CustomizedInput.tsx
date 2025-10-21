import TextField, { TextFieldProps } from "@mui/material/TextField";

type Props = TextFieldProps & {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = ({ name, type, label, sx, ...rest }: Props) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      type={type}
      margin="normal"
      variant="outlined"
      InputLabelProps={{
        style: { color: "#94a3b8", fontWeight: 500 },
      }}
      InputProps={{
        style: {
          borderRadius: 10,
          fontSize: 16,
          color: "#e2e8f0",
          backgroundColor: "#111111",
        },
      }}
      sx={{
        width: "100%",
        maxWidth: "400px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#00fffc" },
          "&:hover fieldset": { borderColor: "#00fffccc" },
        },
        ...sx, 
      }}
      {...rest}
    />
  );
};

export default CustomizedInput;
