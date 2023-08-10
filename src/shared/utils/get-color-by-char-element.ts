import { CharacterElementList } from "shared/api/character/type";

export const getColorByCharElement = (
  element: CharacterElementList,
  type: "background" | "text",
) => {
  switch (element) {
    case "lightning":
      return type === "background"
        ? "bg-elements-lightning"
        : "text-elements-lightning";
    case "physical":
      return type === "background"
        ? "bg-elements-physical"
        : "text-elements-physical";
    case "quantum":
      return type === "background"
        ? "bg-elements-quantum"
        : "text-elements-quantum";
    case "fire":
      return type === "background" ? "bg-elements-fire" : "text-elements-fire";
    case "ice":
      return type === "background" ? "bg-elements-ice" : "text-elements-ice";
    case "wind":
      return type === "background" ? "bg-elements-wind" : "text-elements-wind";
    case "imaginary":
      return type === "background"
        ? "bg-elements-imaginary"
        : "text-elements-imaginary";
    default:
      return "";
  }
};
