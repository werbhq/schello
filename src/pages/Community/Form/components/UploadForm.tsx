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
import Editor from "./Editor";
import { LoadingButton } from "@mui/lab";
import DialogBox from "../../../../components/ui/CustomDialogBox";
import { CommunityArticle, CommunityVideo } from "../../../../models/Community";
import { PlatForm } from "../../../../util/Platfrom";
import { addCommunityForm } from "../../../../api/community";

type CommunityForm = Omit<
  CommunityVideo & CommunityArticle,
  "id" | "timestamp" | "visible" | "redirect_url" | "news_type"
>;
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
  const defaultFormVars: CommunityForm = {
    title: "",
    description: "",
    author: "",
    email: "",
    platform: "YOUTUBE",
    url: "",
    thumbnail: "",
  };

  const [editorHtml, setEditorHtml] = useState("");
  const [type, setType] = useState<"VIDEO" | "ARTICLE">("VIDEO");
  const [formVars, setFormVars] =
    React.useState<CommunityForm>(defaultFormVars);
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

    const formData = { ...formVars, description: editorHtml };

    const { email, url } = formVars;

    // Add error handling here
    setError([]);
    const new_errors = [];

    if (!email?.includes("@")) new_errors.push("Provide a valid email");
    if (type === "VIDEO" && !isValidUrl(url))
      new_errors.push("Provide a valid url");
    if (editorHtml === "") new_errors.push("Please enter the description");

    if (new_errors.length > 0) {
      setError(new_errors);
      return;
    }

    try {
      setSubmitLoading(true);
      await addCommunityForm(formData, type);
      setDialogData(DIALOG_MESSAGES.SUCCESS);
    } catch (error) {
      setDialogData(DIALOG_MESSAGES.FAILED);
    }

    setDialogOpen(true);
    setSubmitLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Stack direction="column" margin={2} spacing={2}>
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
            value={type}
            onChange={(e) => setType(e.target.value as "VIDEO" | "ARTICLE")}
            required
          >
            <MenuItem value="VIDEO">Video</MenuItem>
            <MenuItem value="ARTICLE">Article</MenuItem>
          </Select>

          {type === "VIDEO" && (
            <>
              <InputLabel>Platform</InputLabel>
              <Select
                label="Platform"
                defaultValue={"YOUTUBE"}
                name="platform"
                onChange={(e) => {
                  const thumbnail = PlatForm.getThumbnailUrl(
                    formVars.url,
                    e.target.value as typeof formVars.platform
                  );
                  setFormVars({
                    ...formVars,
                    platform: e.target.value as typeof formVars.platform,
                    thumbnail,
                  });
                }}
                required
              >
                <MenuItem value="YOUTUBE">Youtube</MenuItem>
                <MenuItem value="REELS">Reels</MenuItem>
                <MenuItem value="DAILY-MOTION">Daily Motion</MenuItem>
                <MenuItem value="GOOGLE-DRIVE">Google Drive</MenuItem>
              </Select>

              <TextField
                label="Link"
                variant="filled"
                name="url"
                onBlur={(e) => {
                  const thumbnail = PlatForm.getThumbnailUrl(
                    e.target.value,
                    formVars.platform
                  );
                  setFormVars({ ...formVars, thumbnail, url: e.target.value });
                }}
                required
              />
              {formVars.thumbnail !== "" && (
                <img
                  src={formVars.thumbnail}
                  style={{ maxHeight: "400px" }}
                  alt="Please Provide correct link to load thumbnail"
                />
              )}
            </>
          )}

          <InputLabel>Description</InputLabel>
          <Editor
            placeholder="Enter the description of the event"
            setEditorHtml={setEditorHtml}
          />

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
            sx={{ width: "100%", marginTop: "50px", alignSelf: "center" }}
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
