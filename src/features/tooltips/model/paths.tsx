import { CharacterPathList } from "shared/api/character/type";
import { ChildrenType } from "react-tooltip";

interface Path {
  id: CharacterPathList;
  content: ChildrenType;
}

export const paths: Path[] = [
  {
    id: "hunt",
    content: (
      <p className="max-w-[300px]">
        Обладают способностями{" "}
        <span className="text-orange">
          наносить огромный урон по одной цели
        </span>
        , наносят основной урон в бою с элитными противниками.
      </p>
    ),
  },
  {
    id: "abundance",
    content: (
      <p className="max-w-[300px]">
        Могут <span className="text-orange">исцелять</span> союзников и
        обеспечивают поддержку отряда восстанавливающими способностями.
      </p>
    ),
  },
  {
    id: "erudition",
    content: (
      <p className="max-w-[300px]">
        Обладают способностями{" "}
        <span className="text-orange">
          наносить большой урон по нескольким целям
        </span>
        , могут атаковать нескольких противников одновременно.
      </p>
    ),
  },
  {
    id: "destruction",
    content: (
      <p className="max-w-[300px]">
        Обладают приличным{" "}
        <span className="text-orange">наносимым уроном и живучестью</span>,
        могут адаптироваться к различным боевым ситуациям.
      </p>
    ),
  },
  {
    id: "harmony",
    content: (
      <p className="max-w-[300px]">
        Могут <span className="text-orange">усиливать</span> союзников, чтобы
        повысить боевые показатели отряда.
      </p>
    ),
  },
  {
    id: "preservation",
    content: (
      <p className="max-w-[300px]">
        Обладают мощными <span className="text-orange">оборонительными</span>{" "}
        способностями, которые позволяют защитить союзников.
      </p>
    ),
  },
  {
    id: "nihility",
    content: (
      <p className="max-w-[300px]">
        Могут <span className="text-orange">ослаблять</span> противников, чтобы
        понизить их боевые показатели и преимущества.
      </p>
    ),
  },
];
