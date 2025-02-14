import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import BarChart from "./components/BarChart"; 

const StatePage = () => {
  const { stateAbbr } = useParams();
  const [stateData, setStateData] = useState([]);
  const [chartData, setChartData] = useState([]);

  const stateMapping = {
    ID: "idaho",
    CA: "california",
    TX: "texas",
    FL: "florida",
    NY: "new york",
  };

  useEffect(() => {
    console.log("Fetching CSV file...");

    fetch("/data/Idaho_data.csv")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        console.log("CSV Data Loaded:", data.substring(0, 100));

        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            console.log("Parsed CSV Data:", result.data);
            console.log("State Abbreviation from URL:", stateAbbr);

            const normalizedState = stateMapping[stateAbbr] || stateAbbr.toLowerCase();
            const filteredData = result.data.filter(row => 
              row.state.trim().toLowerCase() === normalizedState
            );

            console.log("Filtered Data:", filteredData);
            setStateData(filteredData);

            const yearCounts = {}; 

            filteredData.forEach((row) => {
              const year = row.year?.trim();
              const statute = row.statute_name?.trim(); 
            
              if (year && statute && year.toLowerCase() !== "n/a") { 
                const uniqueKey = `${year}-${statute}`; 
            
                if (!yearCounts[year]) {
                  yearCounts[year] = new Set(); 
                }
            
                yearCounts[year].add(uniqueKey); 
              }
            });
            
            const formattedChartData = Object.keys(yearCounts).map(year => ({
              year: year,
              statutes: yearCounts[year].size // Get the count of unique statutes for each year
            }));
            
            console.log("Chart Data:", formattedChartData);
            setChartData(formattedChartData);
          },
        });
      })
      .catch((error) => console.error("Error loading CSV:", error));
  }, [stateAbbr]);

  return (
    <div>
      <h1>State: {stateAbbr}</h1>
      <h2>Number of Statutes Introduced Per Year</h2>
      
      {chartData.length > 0 ? (
        <BarChart data={chartData} />
      ) : (
        <p>No data available for {stateAbbr}.</p>
      )}
    </div>
  );
};

export default StatePage;
