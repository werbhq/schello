import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { useRef } from "react";
import { FacialData } from "../../../types/Report";
import { FeatureData } from "./FaceData";

export default function FeatureSelector({
  data,
  id,
  label,
  value,
  setValue,
}: {
  data: FeatureData[] | undefined | null;
  id: keyof FacialData;
  label: string | undefined;
  value: FacialData;
  setValue: React.Dispatch<React.SetStateAction<FacialData>>;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

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
            {data?.map((item, index) => (
              <Stack direction="column" alignItems="center" key={index}>
                <Stack direction="row" alignItems="center">
                  <FormControlLabel
                    control={<Radio />}
                    value={item.value}
                    label={item.label}
                  />
                </Stack>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.label}
                    width={"100px"}
                    ref={imageRef}
                  />
                )}
                {!item.image && (
                  <div
                    style={{
                      height: imageRef.current?.height ?? "100px",
                      width: imageRef.current?.width ?? "100px",
                    }}
                  ></div>
                )}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </RadioGroup>
    </Stack>
  );
}
