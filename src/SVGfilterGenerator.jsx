import React, { useEffect, useState } from "react";
import icon from "./assets/icon.svg";
import { getFilter } from "./filterGeneratorcode";
import colorName from "color-name";
import { CopyToClipboard } from "react-copy-to-clipboard";

const parseColor = (color) => {
  let rgb;

  // Check if the color is in hex format
  if (color.startsWith("#")) {
    // Convert hex to RGB
    const hex = color.replace("#", "");
    const bigint = parseInt(hex, 16);
    rgb = [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  } else if (color.startsWith("rgb")) {
    // Extract the RGB values from the string
    rgb = color.match(/\d+/g).map(Number);
  } else if (colorName[color.toLowerCase()]) {
    // Handle named colors
    rgb = colorName[color.toLowerCase()];
  } else {
    throw new Error(
      "Invalid color format! Please use a named color, hex, or rgba."
    );
  }

  return rgb;
};

const SVGfilterGenerator = () => {
  const [Filter, setFilter] = useState("");
  const [color, setColor] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (color) {
      try {
        const rgb = parseColor(color);
        setFilter(getFilter(rgb));
        setCopied(false); // Reset copied state when color changes
      } catch (e) {
        console.error(e.message);
      }
    }
  }, [color]);

  return (
    <section className="flex flex-col items-center p-4 bg-gray-100 min-h-screen h-screen justify-center gap-5">
      <div className="coolinput">
        <label htmlFor="input" className="text">
          Color:
        </label>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="text"
          placeholder="Enter the color here..."
          name="input"
          className="input"
        />
      </div>
      {/* <p className="mb-2 text-lg font-semibold">Add this CSS</p> */}
      <div className="mb-4 p-2 w-[770px] text-center bg-white border border-gray-300 rounded shadow-sm">
        filter: {Filter}
      </div>
      <div className="flex gap-6 items-center">
        <CopyToClipboard
          text={`filter: ${Filter};`}
          onCopy={() => setCopied(true)}
        >
          <button className=" px-4 py-2 bg-indigo-500 text-white rounded shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {copied ? "Copied!" : "Copy Filter CSS"}
          </button>
        </CopyToClipboard>
        <img
          src={icon}
          alt="icon"
          style={{ filter: Filter }}
          height={40}
          width={40}
          className=" rounded shadow-sm"
        />
      </div>
    </section>
  );
};

export default SVGfilterGenerator;
