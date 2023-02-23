import hairStraight from "../assets/hair/straight.png";
import hairWavy from "../assets/hair/wavy.png";
import hairCurly from "../assets/hair/curly.png";
import hairKinky from "../assets/hair/kinky.png";

import skinBrown from "../assets/skin/brown.png";
import skinFair from "../assets/skin/fair.png";
import skinDarkBrown from "../assets/skin/dark-brown.png";
import skinOlive from "../assets/skin/olive.png";
import skinLightBrown from "../assets/skin/light-brown.png";

import eyeBlack from "../assets/eye/black.png";
import eyeBlue from "../assets/eye/blue.png";
import eyeGreen from "../assets/eye/green.png";
import eyeSilver from "../assets/eye/silver.png";
import eyeBrown from "../assets/eye/brown.png";

import shapeDiamond from "../assets/shape/diamond.png";
import shapeOval from "../assets/shape/oval.png";
import shapeInvertedTriangle from "../assets/shape/inverted-triangle.png";
import shapeTriangle from "../assets/shape/triangle.png";
import shapeSquare from "../assets/shape/square.png";
import shapeRound from "../assets/shape/round.png";

import { FacialData } from "../../../models/Report";

const HAIR: {
  image: string;
  label: string;
  value: FacialData["hairType"];
}[] = [
  { image: hairStraight, label: "Straight", value: "STRAIGHT" },
  { image: hairWavy, label: "Wavy", value: "WAVY" },
  { image: hairCurly, label: "Curly", value: "CURLY" },
  { image: hairKinky, label: "Kinky", value: "KINKY" },
];

const SKIN: {
  image: string;
  label: string;
  value: FacialData["skinColor"];
}[] = [
  { image: skinFair, label: "Fair", value: "FAIR" },
  { image: skinOlive, label: "Olive", value: "OLIVE" },
  { image: skinLightBrown, label: "Light Brown", value: "LIGHT-BROWN" },
  { image: skinBrown, label: "Brown", value: "BROWN" },
  { image: skinDarkBrown, label: "Dark Brown", value: "DARK-BROWN" },
];

const EYE: {
  image: string;
  label: string;
  value: FacialData["eyeColor"];
}[] = [
  { image: eyeBlack, label: "Black", value: "BLACK" },
  { image: eyeBlue, label: "Blue", value: "BLUE" },
  { image: eyeGreen, label: "Green", value: "GREEN" },
  { image: eyeSilver, label: "Silver", value: "SILVER" },
  { image: eyeBrown, label: "Brown", value: "BROWN" },
];

const SHAPE: {
  image: string;
  label: string;
  value: FacialData["faceShape"];
}[] = [
  { image: shapeDiamond, label: "Diamond", value: "DIAMOND" },
  { image: shapeOval, label: "Oval", value: "OVAL" },
  { image: shapeRound, label: "Round", value: "ROUND" },
  { image: shapeSquare, label: "Square", value: "SQUARE" },
  { image: shapeTriangle, label: "Triangle", value: "TRIANGLE" },
  {
    image: shapeInvertedTriangle,
    label: "Inverted Triangle",
    value: "INVERTED_TRIANGLE",
  },
];

const FACE_DATA = {
  HAIR,
  SKIN,
  EYE,
  SHAPE,
};

export default FACE_DATA;
