import criminal1 from "./assets/sample/Criminal1.png";
import criminal2 from "./assets/sample/Criminal2.png";
import criminal3 from "./assets/sample/Criminal3.png";
import criminal4 from "./assets/sample/Criminal4.png";
import FeatureSelector from "./FeatureSelector";

interface SampleImage {
  image: string;
  facialdata: {
    gender: string;
    hairtype: string;
    eyetype: string;
    skincolor: string;
    faceshape: string;
  };
}

const myArray: SampleImage[] = [
  {
    image: criminal1,
    facialdata: {
      gender: "Male",
      hairtype: "Straight",
      eyetype: "Black",
      skincolor: "Fair",
      faceshape: "Round",
    },
  },

  {
    image: criminal2,
    facialdata: {
      gender: "Female",
      hairtype: "Curly",
      eyetype: "Brown",
      skincolor: "Fair",
      faceshape: "Inverted Triangle",
    },
  },

  {
    image: criminal3,
    facialdata: {
      gender: "Female",
      hairtype: "Curly",
      eyetype: "Blue",
      skincolor: "Fair",
      faceshape: "Inverted Triangle",
    },
  },
  {
    image: criminal4,
    facialdata: {
      gender: "Female",
      hairtype: "Straight",
      eyetype: "Brown",
      skincolor: "Fair",
      faceshape: "Square",
    },
  },
];

const sampleArray: (object | object[])[] = [myArray[0]];
const elements = accessElements(sampleArray);
function accessElements(arr: (object | object[])[]): (object | object[])[] {
  return arr.map(
    (value: object | object[], index: number, array: (object | object[])[]) => {
      if (Array.isArray(value)) {
        return accessElements(value);
      } else {
        return value;
      }
    }
  );
}
