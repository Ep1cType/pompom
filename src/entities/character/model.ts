import { createEffect, createEvent, createStore } from "effector";
import { CharacterApi } from "shared/api/character";
import { LocaleParams, ResponseDataItem } from "shared/api/types";
import {
  Character,
  CharacterElementList,
  CharacterPathList,
} from "shared/api/character/type";
import { createGate } from "effector-react";

const Api = new CharacterApi();

export const selectElementFilter = createEvent<CharacterElementList>();
export const selectPathFilter = createEvent<CharacterPathList>();

export const fetchCharactersListFx = createEffect(
  async ({ locale, paths, elements }: LocaleParams & CharacterListParams) => {
    return await Api.getCharactersList({ locale, paths, elements });
  },
);

export const $selectedCharacterFilterList = createStore<{
  elements: CharacterElementList[];
  paths: CharacterPathList[];
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

export const $charactersList = createStore<ResponseDataItem<Character>[]>(
  [],
).on(fetchCharactersListFx.doneData, (_, payload) => {
  return payload.data.data;
});

$selectedCharacterFilterList.watch((state) => {
  fetchCharactersListFx({ elements: state.elements, paths: state.paths });
});

export const CharacterGate = createGate();

$selectedCharacterFilterList.reset(CharacterGate.close);
$charactersList.reset(CharacterGate.close);

interface CharacterListParams {
  paths?: CharacterPathList[];
  elements?: CharacterElementList[];
}
