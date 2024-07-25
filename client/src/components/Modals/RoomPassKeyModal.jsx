import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  TextField,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const RoomPassKeyCopyModal = ({ roomPass, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
        maxWidth: 400,
        bgcolor: "background.paper",
        borderRadius: "5px",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Room Pass Key
      </Typography>
      <TextField
        value={roomPass || "EmptyField"}
        readOnly
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <CopyToClipboard text={roomPass} onCopy={handleCopy}>
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"} arrow>
                  <IconButton>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
            </InputAdornment>
          ),
        }}
      />
      {copied && (
        <Typography color="secondary" variant="body2" sx={{ mt: 1 }}>
          Copied to clipboard.
        </Typography>
      )}
    </Box>
  );
};

export default RoomPassKeyCopyModal;
