import hairStraight from "../../assets/hair/straight.png";
import hairWavy from "../../assets/hair/wavy.png";
import hairCurly from "../../assets/hair/curly.png";
import hairKinky from "../../assets/hair/kinky.png";

import skinBrown from "../../assets/skin/brown.png";
import skinFair from "../../assets/skin/fair.png";
import skinDarkBrown from "../../assets/skin/dark-brown.png";
import skinOlive from "../../assets/skin/olive.png";
import skinLightBrown from "../../assets/skin/light-brown.png";

import eyeBlack from "../../assets/eye/black.png";
import eyeBlue from "../../assets/eye/blue.png";
import eyeGreen from "../../assets/eye/green.png";
import eyeSilver from "../../assets/eye/silver.png";
import eyeBrown from "../../assets/eye/brown.png";

import shapeDiamond from "../../assets/shape/diamond.png";
import shapeOval from "../../assets/shape/oval.png";
import shapeInvertedTriangle from "../../assets/shape/inverted-triangle.png";
import shapeTriangle from "../../assets/shape/triangle.png";
import shapeSquare from "../../assets/shape/square.png";
import shapeRound from "../../assets/shape/round.png";

import genderMale from "../../assets/gender/male.png";
import genderFemale from "../../assets/gender/female.png";

import { FacialData } from "../../../../types/Report";

export interface FeatureData {
  image: string | null;
  label: string;
  value: string;
}

const GENDER: {
  image: string | null;
  label: string;
  value: FacialData["gender"];
}[] = [
  { image: genderMale, label: "Male", value: "MALE" },
  { image: genderFemale, label: "Female", value: "FEMALE" },
  { image: null, label: "None", value: "NONE" },
];

const HAIR: {
  image: string | null;
  label: string;
  value: FacialData["hairType"];
}[] = [
  { image: hairStraight, label: "Straight", value: "STRAIGHT" },
  { image: hairWavy, label: "Wavy", value: "WAVY" },
  { image: hairCurly, label: "Curly", value: "CURLY" },
  { image: hairKinky, label: "Kinky", value: "KINKY" },
  { image: null, label: "None", value: "NONE" },
];

const SKIN: {
  image: string | null;
  label: string;
  value: FacialData["skinColor"];
}[] = [
  { image: skinFair, label: "Fair", value: "FAIR" },
  { image: skinOlive, label: "Olive", value: "OLIVE" },
  { image: skinLightBrown, label: "Light Brown", value: "LIGHT-BROWN" },
  { image: skinBrown, label: "Brown", value: "BROWN" },
  { image: skinDarkBrown, label: "Dark Brown", value: "DARK-BROWN" },
  { image: null, label: "None", value: "NONE" },
];

const EYE: {
  image: string | null;
  label: string;
  value: FacialData["eyeColor"];
}[] = [
  { image: eyeBlack, label: "Black", value: "BLACK" },
  { image: eyeBlue, label: "Blue", value: "BLUE" },
  { image: eyeGreen, label: "Green", value: "GREEN" },
  { image: eyeSilver, label: "Silver", value: "SILVER" },
  { image: eyeBrown, label: "Brown", value: "BROWN" },
  { image: null, label: "None", value: "NONE" },
];

const SHAPE: {
  image: string | null;
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
  { image: null, label: "None", value: "NONE" },
];

const FACE_DATA = new Map<
  keyof FacialData,
  { data: FeatureData[]; label: string }
>([
  ["gender", { data: GENDER, label: "Gender" }],
  ["skinColor", { data: SKIN, label: "Skin Color" }],
  ["hairType", { data: HAIR, label: "Hair Type" }],
  ["eyeColor", { data: EYE, label: "Eye Color" }],
  ["faceShape", { data: SHAPE, label: "Face Type" }],
]);

export default FACE_DATA;
