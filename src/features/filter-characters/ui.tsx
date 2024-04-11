import Image from "next/image";

import clsx from "clsx";

import { CharacterElement, CharacterPath } from "shared/api/character/type";

const characterElementList: CharacterElement[] = [
  "quantum",
  "fire",
  "ice",
  "imaginary",
  "lightning",
  "physical",
  "wind",
];

const characterPathList: CharacterPath[] = [
  "harmony",
  "hunt",
  "abundance",
  "destruction",
  "erudition",
  "nihility",
  "preservation",
];

interface Props {
  selectedElements: CharacterElement[];
  selectedPaths: CharacterPath[];
  onChangeElements: (element: CharacterElement) => void;
  onChangePaths: (path: CharacterPath) => void;
}

export const FilterCharacters = ({ selectedElements, selectedPaths, onChangeElements, onChangePaths }: Props) => {
  return (
    <ul className="mb-10 flex flex-wrap justify-center gap-2 md:mb-20 md:flex-nowrap md:justify-normal">
      {characterElementList.map((element) => (
        <li
          key={element}
          className={clsx(
            "rounded-xl border border-blue-800 p-2 md:p-3",
            selectedElements.includes(element) && "bg-blue-800 text-orange",
          )}
          onClick={() => onChangeElements(element)}
        >
          <Image
            className="h-4 w-4 md:h-5 md:w-5"
            src={`/icons/elements/${element}.webp`}
            width={20}
            height={20}
            alt={`${element} icon`}
          />
        </li>
      ))}
      {characterPathList.map((path) => (
        <li
          className={clsx(
            "rounded-xl border border-blue-800 p-2 md:p-3",
            selectedPaths.includes(path) && "bg-blue-800 text-orange",
          )}
          key={path}
          role="button"
          onClick={() => onChangePaths(path)}
        >
          <Image
            className="h-4 w-4 md:h-5 md:w-5"
            src={`/icons/paths/${path}.png`}
            width={108}
            height={108}
            alt={`${path} icon`}
          />
        </li>
      ))}
    </ul>
  );
};
