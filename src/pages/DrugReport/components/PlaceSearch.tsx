/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import type { MapData } from "../../../models/MapData";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";

function AutocompleteCustom({
  options,
  setInput,
  formVars,
  setFormVars,
  loading,
}: {
  options: MapData[];
  setInput: any;
  formVars: any;
  setFormVars: any;
  loading: boolean;
}) {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Autocomplete
        loading={loading}
        options={options}
        onInputChange={(e, value: any) => {
          setInput(value);
        }}
        isOptionEqualToValue={(option: MapData, value: any) => true}
        getOptionLabel={(option: MapData) => option.title}
        style={{ width: 300 }}
        noOptionsText={"No Place Found"}
        onChange={(e, value) => {
          setFormVars({ ...formVars, location: value });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}

export function PlaceSearch(props: any) {
  const { formVars, setFormVars } = props;
  const [input, setInput] = React.useState<string>("kerala");
  const [data, setData] = React.useState<MapData[]>([]);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({ apiKey: process.env.REACT_APP_API_KEY });

  React.useMemo(() => {
    const getPlaces = (
      id: string
    ): Promise<google.maps.places.PlaceResult | null> =>
      new Promise((resolve) => {
        placesService?.getDetails({ placeId: id }, (a, b) => resolve(a));
      });

    Promise.all(
      placePredictions.map(async (e) => {
        const location = await getPlaces(e.place_id);

        return {
          id: e.place_id,
          title: e.description,
          lat: location?.geometry?.location?.lat(),
          lon: location?.geometry?.location?.lng(),
        };
      })
    ).then((e) => {
      setData(e as MapData[]);
    });
  }, [isPlacePredictionsLoading]);

  React.useMemo(() => {
    getPlacePredictions({
      input,
      componentRestrictions: { country: "in" },
      types: ["geocode", "establishment"],
    });
  }, [input]);

  return (
    <AutocompleteCustom
      options={data}
      setInput={setInput}
      formVars={formVars}
      setFormVars={setFormVars}
      loading={isPlacePredictionsLoading}
    />
  );
}
