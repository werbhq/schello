import * as React from "react";
import {
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Alert,
} from "@mui/material";

import { useState } from "react";
import Editor from "./EventDescription";
import { LoadingButton } from "@mui/lab";
import DialogBox from "../../../components/ui/CustomDialogBox";

interface FormVars {
  title: string | null;
  author: string | null;
  email: string | null;
  type: "VIDEO" | "ARTICLE";
  platform: string | null;
  link: string | null;
  description: string;
}

const DIALOG_MESSAGES = {
  SUCCESS: {
    title: "Success",
    description: "Your report has been submitted",
  },
  FAILED: {
    title: "Failed",
    description: "Your report has not been submitted",
  },
};

function UploadVideoArticleForm() {
  const defaultFormVars: FormVars = {
    title: "",
    description: "",
    author: "",
    email: "",
    type: "VIDEO",
    platform: "Youtube",
    link: "",
  };

  const [editorHtml, setEditorHtml] = useState("");
  const [formVars, setFormVars] = React.useState<FormVars>(defaultFormVars);
  const [submitLoading, setSubmitLoading] = React.useState(false);

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogData, setDialogData] = React.useState(DIALOG_MESSAGES.SUCCESS);
  const [error, setError] = React.useState<string[]>([]);

  const isValidUrl: any = (str: string) => {
    let url;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };

  const handleForm = async (e: any) =>
    setFormVars({ ...formVars, [e.target.name]: e.target.value });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormVars = { ...formVars, description: editorHtml };

    const { email, link } = formVars;

    // Add error handling here
    setError([]);
    const new_errors = [];

    if (!email?.includes("@")) new_errors.push("Provide a valid email");

    if (!isValidUrl(link)) {
      new_errors.push("Provide a valid url");
    }

    if (editorHtml === "") new_errors.push("Please enter the description");

    if (new_errors.length > 0) {
      setError(new_errors);
      return;
    }

    try {
      setSubmitLoading(true);
      // Add post handler
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setFormVars(defaultFormVars);
      setDialogData(DIALOG_MESSAGES.SUCCESS);
    } catch (error) {
      setDialogData(DIALOG_MESSAGES.FAILED);
    }

    setDialogOpen(true);
    setSubmitLoading(false);
  };

  return (
    <div>
      <form
        style={{ maxWidth: "40rem", padding: "1.5rem" }}
        onSubmit={handleSubmit}
      >
        <Stack direction="column" spacing={2}>
          <TextField
            label="Title"
            variant="filled"
            name="title"
            onChange={handleForm}
            required
          />
          <TextField
            label="Author Name"
            variant="filled"
            name="author"
            onChange={handleForm}
            required
          />
          <TextField
            label="Email"
            variant="filled"
            name="email"
            onChange={handleForm}
            required
          />
          <InputLabel>Type</InputLabel>
          <Select
            label="Type"
            name="type"
            value={formVars.type}
            onChange={handleForm}
            required
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="ARTICLE">Article</MenuItem>
          </Select>
          {formVars.type === "VIDEO" && (
            <>
              <InputLabel>Platform</InputLabel>
              <Select
                label="Platform"
                defaultValue={"YOUTUBE"}
                name="Platform"
                onChange={handleForm}
                required
              >
                <MenuItem value="YOUTUBE">Youtube</MenuItem>
                <MenuItem value="REELS">Reels</MenuItem>
                <MenuItem value="DAILY_MOTION">Daily Motion</MenuItem>
                <MenuItem value="G_DRIVE">Google Drive</MenuItem>
              </Select>

              <TextField
                label="Link"
                variant="filled"
                name="link"
                onChange={handleForm}
                required
              />
            </>
          )}

          <InputLabel>Description</InputLabel>
          <Editor
            placeholder="Enter the description of the event"
            setEditorHtml={setEditorHtml}
          ></Editor>

          {error.length > 0 && (
            <Alert severity="error">
              {error.map((e) => {
                return (
                  <>
                    {e}
                    <br />
                  </>
                );
              })}
            </Alert>
          )}

          <LoadingButton
            type="submit"
            loading={submitLoading}
            variant="contained"
            sx={{ width: "8rem", marginTop: "50px" }}
          >
            Submit
          </LoadingButton>
        </Stack>
      </form>
      <DialogBox
        title={dialogData.title}
        description={dialogData.description}
        openFlag={dialogOpen}
        handleOpen={setDialogOpen}
      />
    </div>
  );
}

export default UploadVideoArticleForm;
