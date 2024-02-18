import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useStore from "@/zustand/store";

const Location = () => {
  const update = useStore((state) => state.update);
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_mapAccessToken;
    const map = new mapboxgl.Map({
      container: "map", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // corrected style URL
      center: [85.8161, 20.3555], // starting position [lng, lat]
      zoom: 15, // starting zoom
      // maxBounds: boundsN
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      placeholder: "Search for places", // Placeholder text for search box
      countries: "in", // Limit search to India
      autocomplete: false,
    });

    map.addControl(geocoder);

    map.on("style.load", function () {
      const createGeoJSONCircle = function (center, radiusInKm, points) {
        if (!points) points = 64;

        const coords = {
          latitude: center[1],
          longitude: center[0],
        };

        const km = radiusInKm;

        const ret = [];
        const distanceX =
          km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
        const distanceY = km / 110.574;

        let theta, x, y;
        for (let i = 0; i < points; i++) {
          theta = (i / points) * (2 * Math.PI);
          x = distanceX * Math.cos(theta);
          y = distanceY * Math.sin(theta);

          ret.push([coords.longitude + x, coords.latitude + y]);
        }
        ret.push(ret[0]);

        return {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Polygon",
                  coordinates: [ret],
                },
              },
            ],
          },
        };
      };

      // Define an array of polygon coordinates
      const polygonCoordinates = [
        [85.812629, 20.354031],
        [85.8136, 20.3539],
        [85.827579, 20.356502],
        [85.810526, 20.353293],
        // Add more coordinates here as needed
      ];

      // Loop through the polygon coordinates and add sources and layers to the map
      polygonCoordinates.forEach((coord, index) => {
        const sourceName = `polygon${index}`;
        map.addSource(sourceName, createGeoJSONCircle(coord, 0.1));

        map.addLayer({
          id: sourceName,
          type: "fill",
          source: sourceName,
          layout: {},
          paint: {
            "fill-color": "red",
            "fill-opacity": 0.4,
          },
        });

        // Add click event listener to the layer
        map.on("click", sourceName, function (e) {
          // Get the coordinates of the center of the circle
          const centerCoordinates = e.lngLat.toArray();
          console.log("Center Coordinates:", centerCoordinates);
        });

        function getRandomColor() {
          return "#" + Math.floor(Math.random() * 16777215).toString(16);
        }
      });

      map.on("click", function (e) {
        const clickedCoords = e.lngLat.toArray();
        console.log("Clicked Coordinates:", clickedCoords);
        updateCoordinates(clickedCoords);
        const marker = new mapboxgl.Marker()
          .setLngLat(clickedCoords)
          .addTo(map);
      });
    });
    return () => map.remove();
  }, []);

  const updateCoordinates = (clickedCoords) => {
    update(clickedCoords[1], clickedCoords[0]);
  };

  const bears = useStore((state) => state);
  console.log("Bears:", bears);

  return (
    <div id="map" className={`w-full h-full transition-all duration-500`}></div>
  );
};

export default Location;