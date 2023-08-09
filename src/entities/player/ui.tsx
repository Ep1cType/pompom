import React from "react";
import { useStore } from "effector-react";
import { $playersList } from "./model";
import { Player } from "shared/api/player/types";
import { ResponseDataItem } from "shared/api/types";

export const PlayerList = () => {
  const data = useStore($playersList);

  return (
    <table className="max-w-[500px] border-collapse border border-amber-300 text-sm">
      {data.map((el) => (
        <PlayerRow key={el.id} player={el} />
      ))}
    </table>
  );
};

type PlayerRowPros = {
  player: ResponseDataItem<Player>;
};
export const PlayerRow = ({ player }: PlayerRowPros) => {
  const birth = player.attributes.birth?.slice(0, 4);

  return (
    <tr className="cursor-pointer hover:opacity-50 [&>td]:border [&>td]:border-amber-300 [&>td]:p-1">
      <td>
        {player.attributes.surname} {player.attributes.name}
      </td>
      <td>{birth}</td>
      <td>{player.attributes.rank}</td>
      <td>{player.attributes.city}</td>
    </tr>
  );
};
