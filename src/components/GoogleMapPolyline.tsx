import { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import { useEffect } from "react";

const GoogleMapPolyline = () => {
  useEffect(() => {},[]);

  const [path, setPath] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
  });

  useEffect(() => {
    const localData = localStorage.getItem("googleMapPolyline");
    if (localData) {
      const parsedData = JSON.parse(localData);

      console.log(parsedData);
      setPath(parsedData);
    }
  }, []);

  const addPointToPath = (e) => {
    try {
      const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      const mergedData = [...path, latLng];
      console.log(mergedData);
      setPath(mergedData);
      localStorage.setItem("googleMapPolyline", JSON.stringify(mergedData));
    } catch (error) {
      console.error("addPointToPath error", error);
    }
  };

  const removeItem = (index) => {
    const arr = [...path];
    arr.splice(index, 1);
    setPath(arr);
    localStorage.setItem("googleMapPolyline", JSON.stringify(arr));
  };

  return isLoaded ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: 1200,
        }}
      >
        <div style={{ width: "60%" }}>
          <GoogleMap
            onClick={addPointToPath}
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{ lat: -10.0000000, lng: -55.0000000}}
            zoom={10}
          >
           

            {/* =====Marker===== */}
            {path.map((item, i) => (
              <Marker key={i} position={item} onClick={() => removeItem(i)} />
            ))}
          </GoogleMap>
        </div>
        <div style={{ width: "39%" }}>
          {path.map((item, i) => (
            <p key={i}>
              <button onClick={() => removeItem(i)}>X</button>{" "}
              {JSON.stringify(item)}
            </p>
          ))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default GoogleMapPolyline;