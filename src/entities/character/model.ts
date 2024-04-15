import { createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";

import { CharacterApi } from "shared/api/character";
import { Character, CharacterElement, CharacterPath } from "shared/api/character/type";
import { LocaleParams, ResponseDataItem } from "shared/api/types";

const Api = new CharacterApi();

export const selectElementFilter = createEvent<CharacterElement>();
export const selectPathFilter = createEvent<CharacterPath>();

export const fetchCharactersListFx = createEffect(
  async ({ locale, paths, elements }: LocaleParams & CharacterListParams) => {
    // return await Api.getCharactersList({ locale, paths, elements });
  },
);

export const $selectedCharacterFilterList = createStore<{
  elements: CharacterElement[];
  paths: CharacterPath[];
}>({
  elements: [],
  paths: [],
})
  .on(selectElementFilter, (state, payload) => {
    if (state.elements.includes(payload)) {
      return {
        ...state,
        elements: state.elements.filter((item) => item !== payload),
      };
    } else {
      return {
        ...state,
        elements: [...state.elements, payload],
      };
    }
  })
  .on(selectPathFilter, (state, payload) => {
    if (state.paths.includes(payload)) {
      return {
        ...state,
        paths: state.paths.filter((item) => item !== payload),
      };
    } else {
      return {
        ...state,
        paths: [...state.paths, payload],
      };
    }
  });

export const $charactersList = createStore<ResponseDataItem<Character>[]>([]).on(
  fetchCharactersListFx.doneData,
  (_, payload) => {
    // return payload.data.data;
  },
);

$selectedCharacterFilterList.watch((state) => {
  fetchCharactersListFx({ elements: state.elements, paths: state.paths });
});

export const CharacterGate = createGate();

$selectedCharacterFilterList.reset(CharacterGate.close);
$charactersList.reset(CharacterGate.close);

interface CharacterListParams {
  paths?: CharacterPath[];
  elements?: CharacterElement[];
}
