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
    <section className="flex flex-col items-center p-4 bg-gray-100 min-h-screen h-screen justify-center gap-5 relative">
      <div className="coolinput">
        <label htmlFor="input" className="text">
          Color:
        </label>
        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="text"
          placeholder="Enter the color here in any format , name , rgb() or #hexcode ..."
          name="input"
          className="input"
        />
      </div>
      {/* <p className="mb-2 text-lg font-semibold">Add this CSS</p> */}
      <div className="mb-4 p-2 w-full max-w-[760px] text-center bg-white border border-gray-300 rounded shadow-sm">
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
      <p className="text-sm text-gray-500 max-w-[760px] mt-4">
        <span className="text-black">UseCase:</span>
        <span>
          You can fill ur desired color in input box and generate filter of the
          color u inpur which u can us to apply color on ur desired UI
          components like SVGs and many more, by simply adding this filter css
          to ur {"<img/> "}tag
        </span>
      </p>
      <p className="text-sm text-gray-500 max-w-[760px]">
        <span className="text-black">Note:</span>
        <span>
          It is recommended that the starting color needs to be black. If your
          icon set isn't black you can prepend{" "}
          <u className=" text-blue-400">"brightness(0) saturate(100%)"</u> to
          your filter property which will first turn the icon set to black.
        </span>
      </p>
      <a
        href="https://www.linkedin.com/in/manas0410/"
        className="absolute bottom-4 right-6 text-blue-700 text-xl"
        target="_blank"
      >
        About Developer
      </a>
    </section>
  );
};

export default SVGfilterGenerator;
