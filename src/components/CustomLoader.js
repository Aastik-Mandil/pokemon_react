import { Backdrop, CircularProgress } from "@mui/material";

const CustomLoader = () => {
  return (
    <Backdrop
      open={true}
      style={{
        zIndex: 9999,
        color: "#fff",
        position: "absolute",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </div>
    </Backdrop>
  );
};
export default CustomLoader;
