import React, { useEffect, useRef, useState } from "react";

const MapComponent = ({ location }) => {
  const mapRef = useRef(null);
  const [style, setStyle] = useState({
    justifyContent: 'center',
    alignItems: 'center',
    height: '45vh',
    display: 'flex',
    width: '450px',
    margin: '-330px 2px 100px 1100px',
    position: 'fixed',
  });

  useEffect(() => {
    const updateStyle = () => {
      const width = window.innerWidth;
  
      if (width <= 480) {
        setStyle(prevStyle => ({
          ...prevStyle,
          height: '30vh',
          width: '100%',
          margin: '0 auto',
          position: 'relative',
        }));
      } else if (width <= 768) { 
        setStyle(prevStyle => ({
          ...prevStyle,
          height: '35vh',
          width: '90%',
          margin: '0 auto',
          position: 'relative',
        }));
      } else if (width <= 1024) {
        setStyle(prevStyle => ({
          ...prevStyle,
          height: '40vh',
          width: '80%',
          margin: '0 auto',
          position: 'relative',
        }));
      } else if (width <= 1440) { // Para monitores entre 1024px e 1440px
        setStyle(prevStyle => ({
          ...prevStyle,
          height: '45vh',
          width: '70%',
          margin: '0 auto',
          position: 'relative',
        }));
      } else { 
        setStyle(prevStyle => ({
          ...prevStyle,
          height: '38vh',
          width: '400px',
          margin: '-330px 2px 100px 1100px',
          position: 'fixed',
        }));
      }
    };

    updateStyle();

    window.addEventListener('resize', updateStyle);

    return () => window.removeEventListener('resize', updateStyle);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.js";
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://api.mqcdn.com/sdk/mapquest-js/v1.3.2/mapquest.css";
    document.head.appendChild(link);

    script.onload = () => {
      if (window.L && window.L.mapquest) {
        window.L.mapquest.key = "i4hC6TffzNfHk0q84UUrXHDDYr1RXrvj";

        mapRef.current = window.L.mapquest.map("map", {
          center: [-15.7801, -47.9292], // aleatorio, coloquei o de BRasilia
          layers: window.L.mapquest.tileLayer("map"),
          zoom: 12,
        });

        mapRef.current.addControl(window.L.mapquest.control());
      }
    };

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current && location) {
      const [lat, lng] = [location.coord.lat, location.coord.lon];
      mapRef.current.setView([lat, lng], 14);
    }
  }, [location]);

  return <div id="map" style={style}></div>;
};

export default MapComponent;
