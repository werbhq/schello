import {
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import FeatureSelector from "./face/FeatureSelector";
import FACE_DATA from "./face/FaceData";
import { FacialData } from "types/Report";

type Props = {
  enableFacialFeatures: boolean;
  setEnableFacialFeatures: React.Dispatch<React.SetStateAction<boolean>>;

  facialData: FacialData;
  setFacialData: React.Dispatch<React.SetStateAction<FacialData>>;
};

export const FacialField = ({
  enableFacialFeatures,
  setEnableFacialFeatures,
  facialData,
  setFacialData,
}: Props) => {
  return (
    <Stack spacing={2}>
      <FormLabel>Facial Features</FormLabel>
      <Stack spacing={2} paddingLeft={2}>
        <Typography variant="body1">
          This is optional. But helps us identify the person better. Select all
          the information you see fit
        </Typography>
        <FormControl>
          <FormLabel id="face-flag">Have you seen the face?</FormLabel>
          <RadioGroup
            aria-labelledby="face-flag"
            value={enableFacialFeatures}
            name="face-flag-group"
            onChange={(e, value) => {
              const currentVal = value === "true";
              setEnableFacialFeatures(currentVal);
            }}
          >
            <Stack direction="row">
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </Stack>
          </RadioGroup>
        </FormControl>

        <Collapse in={enableFacialFeatures}>
          <Stack spacing={2} paddingBottom={2}>
            {Array.from(FACE_DATA.keys()).map((e, index) => (
              <FeatureSelector
                data={FACE_DATA.get(e as keyof FacialData)?.data}
                label={FACE_DATA.get(e as keyof FacialData)?.label}
                id={e as keyof FacialData}
                value={facialData}
                setValue={setFacialData}
                key={index}
              />
            ))}
          </Stack>
        </Collapse>
      </Stack>
    </Stack>
  );
};
