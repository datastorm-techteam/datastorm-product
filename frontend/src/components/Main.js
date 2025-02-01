import { React, useState } from "react";
import USAMap from "react-usa-map";

const Main = () => {
  const [hoveredState, setHoveredState] = useState(null);

  // Default colors and hover customization
  const mapCustomization = () => {
    return {
      [hoveredState]: {
        fill: "#FF6347", // Hover color for a specific state
      },
    };
  };

  const handleMouseEnter = (event) => {
    const stateId = event.target.dataset.name;
    setHoveredState(stateId);
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  return (
    <div>
      <USAMap
        customize={mapCustomization()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default Main;
