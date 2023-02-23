import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FacialData } from "../../../models/Report";

interface FeatureData {
  image: string;
  label: string;
  value: string;
}

export default function FeatureSelector({
  data,
  id,
  label,
  value,
  setValue,
  imageProps,
}: {
  data: FeatureData[];
  id: keyof FacialData;
  label: string;
  value: FacialData;
  setValue: React.Dispatch<React.SetStateAction<FacialData>>;
  imageProps?: { width: string; height: string };
}) {
  return (
    <Stack>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup
        aria-labelledby={id}
        name={id + "-group"}
        value={value[id]}
        onChange={(_, e) => setValue({ ...value, [id]: e })}
      >
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={4} alignItems="center">
            {data.map((item, index) => (
              <Stack direction="column" alignItems="center" key={index}>
                <Stack direction="row" alignItems="center">
                  <FormControlLabel
                    control={<Radio />}
                    value={item.value}
                    label={item.label}
                  />
                </Stack>
                <img
                  src={item.image}
                  alt={item.label}
                  width={imageProps ? imageProps.width : "100px"}
                  height={imageProps ? imageProps.height : "150px"}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
