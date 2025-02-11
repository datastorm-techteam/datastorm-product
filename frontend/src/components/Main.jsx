import { React, useState } from "react";
import USAMap from "react-usa-map";

const Main = () => {
  const [hoveredState, setHoveredState] = useState(null);

  const mapHandler = (event) => {
    alert(event.target.dataset.name);
  };

  // Default colors and hover customization
  const mapCustomization = () => ({
    fill: "#FF0000",
    CA: { fill: "#FF0000" },
    TX: { fill: "#32CD32" },
    VA: { fill: "#0000FF" },
  });

  return (
    <div className="flex justify-center align-center">
      <USAMap customize={mapCustomization()} onClick={mapHandler} width="100dvw" height="75dvh" />
    </div>
  );
};

export default Main;
