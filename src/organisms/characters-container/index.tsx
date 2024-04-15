"use client";

import React, { useEffect, useState } from "react";

import { FilterCharacters } from "features/filter-characters/ui";

import { CharacterCard } from "molecules/character-card";

import { Character, CharacterElement, CharacterPath } from "shared/api/character/type";

interface Props {
  charactersList: Character[];
}

export const CharactersContainer = ({ charactersList }: Props) => {
  const [data, setData] = useState<Character[]>(charactersList);
  const [selectedElementList, setSelectedElementList] = useState<CharacterElement[]>([]);
  const [selectedPathList, setSelectedPathList] = useState<CharacterPath[]>([]);

  useEffect(() => {
    setData(() => {
      if (!selectedElementList.length && !selectedPathList.length) {
        return charactersList;
      }
      if (!selectedElementList.length && selectedPathList.length) {
        return charactersList.filter((el) => selectedPathList.includes(el.path));
      }
      if (!selectedPathList.length && selectedElementList.length) {
        return charactersList.filter((el) => selectedElementList.includes(el.element));
      }
      return charactersList.filter(
        (el) => selectedElementList.includes(el.element) && selectedPathList.includes(el.path),
      );
    });
  }, [selectedPathList, selectedElementList, charactersList]);

  const handleElementChange = (element: CharacterElement) => {
    setSelectedElementList((prevState) => {
      if (prevState.includes(element)) {
        return prevState.filter((elem) => elem !== element);
      }
      return [...prevState, element];
    });
  };

  const handlePathChange = (path: CharacterPath) => {
    setSelectedPathList((prevState) => {
      if (prevState.includes(path)) {
        return prevState.filter((elem) => elem !== path);
      }
      return [...prevState, path];
    });
  };

  return (
    <>
      <FilterCharacters
        selectedElements={selectedElementList}
        selectedPaths={selectedPathList}
        onChangePaths={handlePathChange}
        onChangeElements={handleElementChange}
      />

      {!data.length && <h2 className="col-span-4 md:col-span-5 lg:col-span-7 xl:col-span-10">Ничего не найдено</h2>}

      <section
        itemScope
        itemType="https://schema.org/ItemList"
        className="grid grid-cols-4 gap-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10"
      >
        {data.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </section>
    </>
  );
};
