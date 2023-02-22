import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";

interface FeatureData {
  image: string;
  label: string;
  value: string;
}

export default function FeatureSelector({
  data,
  id,
  label,
}: {
  data: FeatureData[];
  id: string;
  label: string;
}) {
  return (
    <Stack>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup aria-labelledby={id} name={id + "-group"}>
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
                  width="100px"
                  height="150px"
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
