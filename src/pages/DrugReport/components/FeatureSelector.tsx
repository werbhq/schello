import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { Component } from "react";

//const image2 = require('./image2.jpg');
interface FeatureData {
  image: string;
  label: string;
}
export default function FeatureSelector({ data }: { data: FeatureData[] }) {
  /*const imagesWithLabels = images.map((image) => ({
    image: require(`${image.image}`),
    label: image.label,
  }));*/

  return (
    <>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <Stack direction="column" spacing={2} width="100%">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {data.map((item, index) => {
              return (
                <Stack key={index}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value={item.label}
                      label=""
                      sx={{ margin: "0px" }}
                    />
                    <FormLabel>{item.label}</FormLabel>
                  </Stack>
                  <img
                    src={item.image}
                    alt={item.label}
                    width="100px"
                    height="150px"
                  />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </RadioGroup>
    </>
  );
}
