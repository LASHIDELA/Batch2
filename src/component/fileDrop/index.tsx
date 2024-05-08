import { Box } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Prop {
  fileUploaded: (acceptData: File[]) => void;
}

const FileDrop = ({ fileUploaded }: Prop) => {
  const onDrop = (acceptedFiles: File[]) => {
    fileUploaded(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        border: "3px dotted lightgray",
        textAlign: "center",
        borderRadius: 2,
        cursor: "pointer",
        mt: 2,
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop some file in there ...</p>
      ) : (
        <p>Drag and drop some files here, or click to select files</p>
      )}
    </Box>
  );
};

export default FileDrop;
