/* eslint-disable react-hooks/exhaustive-deps */
import { Autocomplete, Button, TextField } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import type { MapData } from "../../../models/MapData";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { MyLocation } from "@mui/icons-material";
import Notification from "../../../components/Notification";

function AutocompleteCustom({
  options,
  setInput,
  formVars,
  setFormVars,
  loading,
  locationUsed,
}: {
  options: MapData[];
  setInput: any;
  formVars: any;
  setFormVars: any;
  loading: boolean;
  locationUsed: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(locationUsed);
  }, [locationUsed]);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Autocomplete
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        loading={loading}
        options={options}
        onInputChange={(e, value: any) => setInput(value)}
        isOptionEqualToValue={(option: MapData, value: MapData) => true}
        getOptionLabel={(option: MapData) => option.title}
        style={{ width: 300 }}
        noOptionsText="No Place Found"
        onChange={(e, value) => setFormVars({ ...formVars, location: value })}
        renderInput={(params) => <TextField {...params} />}
      />
    </Stack>
  );
}

export function PlaceSearch(props: any) {
  const { formVars, setFormVars } = props;
  const [input, setInput] = React.useState<string>("kerala");
  const [data, setData] = React.useState<MapData[]>([]);
  const [locationUsed, setLocationUsed] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState({
    show: false,
    message: "",
  });

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({ apiKey: process.env.REACT_APP_API_KEY });

  const { geocode } = new google.maps.Geocoder();

  React.useMemo(() => {
    const getPlaces = (
      id: string
    ): Promise<google.maps.places.PlaceResult | null> => {
      return new Promise((resolve) => {
        placesService?.getDetails({ placeId: id }, (a, b) => resolve(a));
      });
    };

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
      setLocationUsed(false);
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

  const getCurrentLocation = () => {
    const options = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const location = {
          lat: coords.latitude,
          lng: coords.longitude,
        };

        geocode({ location }, (res) => {
          setData(
            res.length === 0
              ? []
              : [
                  {
                    id: res[0].place_id,
                    title: res[0].formatted_address,
                    lat: location.lat,
                    lon: location.lng,
                  },
                ]
          );
          setLocationUsed(true);
        });
      },
      (err) => setShowMessage({ show: true, message: err.message }),
      options
    );
  };

  return (
    <Stack direction="row" spacing={1}>
      <AutocompleteCustom
        options={data}
        setInput={setInput}
        formVars={formVars}
        setFormVars={setFormVars}
        loading={isPlacePredictionsLoading}
        locationUsed={locationUsed}
      />
      <Button startIcon={<MyLocation />} onClick={getCurrentLocation} />
      <Notification showMessage={showMessage} setShowMessage={setShowMessage} />
    </Stack>
  );
}
