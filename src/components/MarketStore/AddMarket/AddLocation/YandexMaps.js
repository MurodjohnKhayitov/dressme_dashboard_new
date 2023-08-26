import React, { useRef, useState, useEffect } from "react";
import "../../../../index.css";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,
  FullscreenControl,
  Clusterer,
} from "react-yandex-maps";
import {
  MapLocationIcon,
  MenuCloseIcons,
  SearchIcon,
  StarIcon,
  marketIcons,
} from "../../../../assets/icons";
import { MdLocationOn } from "react-icons/md";
import "./yandexMaps1.css";
import { GrClose } from "react-icons/gr";
import { clsx } from "clsx";

const mapOptions = {
  modules: ["geocode", "SuggestView"],
  defaultOptions: { suppressMapOpenBlock: true },
};

const geolocationOptions = {
  defaultOptions: { maxWidth: 128 },
  defaultData: { content: "Determine" },
};

const initialState = {
  title: "",
  center: [41.311151, 69.279737],
  zoom: 12,
};

export default function YandexMaps() {
  const [state, setState] = useState({ ...initialState });
  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);
  const [fullScreenMaps, setFullScreenMaps] = useState(false);

  // submits
  const handleSubmit = () => {
    console.log({ title: state.title, center: mapRef.current.getCenter() });
  };

  // reset state & search
  const handleReset = () => {
    setState({ ...initialState });
    // setState({ ...initialState, title: "" });
    searchRef.current.value = "";
    // mapRef.current.setCenter(initialState.center);
    mapRef.current.setZoom(initialState.zoom);
  };

  // search popup
  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setState((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };
  return (
    <div className={`w-full `}>
      <div className={"mapRoot"}>
        <YMaps
          query={{
            apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
            lang: "uz",
          }}
        >
          <Map
            className={` overflow-hidden w-full h-full`}
            {...mapOptions}
            state={state}
            onLoad={setMapConstructor}
            onBoundsChange={handleBoundsChange}
            instanceRef={mapRef}
          >
            <div className="h-fit p-[10px] absolute top-2 z-40 gap-x-5 mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-3 rounded-lg">
              <div className="w-[100%] h-full flex items-center justify-between bg-white  border border-textLightColor px-3 rounded-lg">
                <input
                  ref={searchRef}
                  placeholder="Введите адрес"
                  name="s"
                  disabled={!mapConstructor}
                  className="w-full outline-none text-sm font-AeonikProMedium mr-3 h-10  rounded-lg "
                />

                <div
                  className={clsx(["titleBox"], {
                    ["titleBox_show"]: Boolean(state.title.length),
                  })}
                >
                  {state.title}
                </div>
                {state?.title.length ? (
                  <button
                    onClick={handleReset}
                    className="cursor-pointer flex items-center h-10 justify-center "
                  >
                    <GrClose />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="cursor-pointer flex items-center h-10 justify-center "
                  >
                    <SearchIcon />
                  </button>
                )}
              </div>
              <button
                type="button"
                className="border cursor-pointer  px-[35px] h-10 bg-textBlueColor text-white rounded-lg text-sm font-AeonikProMedium"
                onClick={handleSubmit}
                disabled={Boolean(!state.title.length)}
              >
                Подтверждено
              </button>
            </div>
            {/* <div
              className={
                "w-full h-fit border border-black relative flex items-center justify-center bg-transparent"
              }
            >
              <div className="absolute top-0 left-0 z-[50]" title={state.title}>
                {state.title}
              </div>
              <button onClick={handleReset}>
                <MenuCloseIcons />
              </button>
            </div>
          */}
            <span className={"placemark"}>
              <MapLocationIcon color="primary" />
            </span>
            <ZoomControl
              options={{
                float: "right",
                position: { bottom: 200, right: 10, size: "small" },
                size: "small",
              }}
            />{" "}
            <GeolocationControl
              options={{
                float: "right",
                position: { bottom: 60, right: 10 },
                size: "small",
              }}
            />
          </Map>
        </YMaps>
      </div>
    </div>
  );
}