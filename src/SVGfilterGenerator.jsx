import React, { useEffect, useState } from "react";
import icon from "./assets/icon.svg";

// Utility function to convert named colors to RGB
const colorNameToRgb = (color) => {
  const ctx = document.createElement("canvas").getContext("2d");
  if (ctx) {
    ctx.fillStyle = color;
    return ctx.fillStyle;
  }
  return null;
};

const SVGfilterGenerator = () => {
  const [Filter, setFilter] = useState("");
  const [color, setColor] = useState("");

  const generateFilter = (color) => {
    let r = 0,
      g = 0,
      b = 0;

    // Handle named colors
    const namedColor = colorNameToRgb(color);
    if (namedColor) {
      color = namedColor;
    }

    if (color.startsWith("#")) {
      const hex = color.slice(1);
      if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      } else if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      }
    } else if (color.startsWith("rgb")) {
      const rgb = color.match(/\d+/g);
      if (rgb) {
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);
      }
    }
    return `invert(1) sepia(1) saturate(10000%) hue-rotate(${Math.round(
      (Math.atan2(g - b, r - g) * 180) / Math.PI
    )}deg) brightness(0.9) contrast(0.85)`;
  };

  useEffect(() => {
    setFilter(generateFilter(color));
  }, [color]);
  console.log(Filter);
  return (
    <section>
      <input
        type="text"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        placeholder="enter color"
      />
      <p>Add this css</p>
      <div>filter:"{Filter}"</div>
    </section>
  );
};

export default SVGfilterGenerator;
