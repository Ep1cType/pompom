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
        <FilterItem
          key={element}
          src={`/icons/elements/${element}.webp`}
          alt={`${element} icon`}
          onClick={() => onChangeElements(element)}
          active={selectedElements.includes(element)}
        />
      ))}
      {characterPathList.map((path) => (
        <FilterItem
          key={path}
          src={`/icons/paths/${path}.png`}
          alt={`${path} icon`}
          onClick={() => onChangePaths(path)}
          active={selectedPaths.includes(path)}
        />
      ))}
    </ul>
  );
};

interface FilterItemProps {
  src: string;
  alt: string;
  onClick: () => void;
  active: boolean;
}

const FilterItem = ({ active, alt, src, onClick }: FilterItemProps) => {
  return (
    <li
      className={clsx("rounded-xl border border-blue-800 p-2 md:p-3", active && "bg-blue-800 text-orange")}
      role="button"
      onClick={onClick}
    >
      <Image className="h-4 w-4 md:h-5 md:w-5" src={src} width={20} height={20} alt={alt} />
    </li>
  );
};
