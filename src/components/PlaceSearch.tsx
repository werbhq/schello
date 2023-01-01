import { Autocomplete, TextField } from "@mui/material";
import * as React from "react";

interface PlaceAPIResponse {
  display_name: string;
  place_id: string;
  lat: string;
  lon: string;
}

export interface PlaceData {
  title: string;
  id: string;
  lat: string;
  lon: string;
}

export function PlaceSearch(props: any) {
  const { formVars, setFormVars } = props;
  const [options, setOptions] = React.useState<PlaceData[]>([]);
  const previousController = React.useRef<AbortController>();

  const getData = (searchTerm: string) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    fetch(
      `https://nominatim.openstreetmap.org/search.php?q=${searchTerm}&accept-language=en&countrycodes=IN&format=jsonv2`,
      {
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const updatedOptions = json.map(
          ({ display_name, place_id, lat, lon }: PlaceAPIResponse) => {
            return { title: display_name, id: place_id, lat, lon };
          }
        );
        setOptions(updatedOptions);
      });
  };

  const onInputChange = (event: any, searchTerm: string) => {
    if (searchTerm) {
      getData(searchTerm);
    } else {
      setOptions([]);
    }
  };

  React.useEffect(() => {
    getData("Kerala");
  }, []);

  return (
    <Autocomplete
      options={options}
      onInputChange={onInputChange}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      noOptionsText={"Enter a place to search"}
      onChange={(e, value) => {
        console.log(formVars);

        setFormVars({ ...formVars, location: value });
      }}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
