import { CharacterElementList } from "shared/api/character/type";
import { ChildrenType } from "react-tooltip";

interface Elements {
  id: CharacterElementList;
  content: ChildrenType;
}

export const elements: Elements[] = [
  {
    id: "ice",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">ледяной уязвимости</span>:
        использование ледяных атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт ледяной
        урон и наложит статус <span className="text-orange">Заморозка</span>,
        который наносит дополнительный ледяной урон.
      </p>
    ),
  },
  {
    id: "fire",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">огненной уязвимости</span>:
        использование огненных атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт
        огненный урон и наложит статус{" "}
        <span className="text-orange">Горение</span>, который наносит
        периодический огненный урон.
      </p>
    ),
  },
  {
    id: "physical",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">физической уязвимости</span>:
        использование физических атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт
        физический урон и наложит статус{" "}
        <span className="text-orange">Кровотечение</span>, который наносит
        периодический физический урон.
      </p>
    ),
  },
  {
    id: "lightning",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">электрической уязвимости</span>:
        использование электрических атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт
        электрический урон и наложит статус{" "}
        <span className="text-orange">Шок</span>, который наносит периодический
        электрический урон.
      </p>
    ),
  },
  {
    id: "wind",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">ветряной уязвимости</span>:
        использование ветряных атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт
        ветряной урон и наложит статус{" "}
        <span className="text-orange">Выветривание</span>, который наносит
        периодический ветряной урон.
      </p>
    ),
  },
  {
    id: "quantum",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">квантовой уязвимости</span>:
        использование квантовых атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт
        квантовый урон и наложит статус{" "}
        <span className="text-orange">Связывание</span>, который задерживает
        действие противника и наносит дополнительный квантовый урон в начале
        следующего хода. Когда противник получает удар, этот дополнительный
        квантовый урон повышается.
      </p>
    ),
  },
  {
    id: "imaginary",
    content: (
      <p className="max-w-[300px]">
        Пробитие <span className="text-orange">мнимой уязвимости</span>:
        использование мнимых атак для{" "}
        <span className="text-orange">пробития уязвимости</span> нанесёт мнимый
        урон и дополнительно наложит статус{" "}
        <span className="text-orange">Заключение</span> на цель. У противников в{" "}
        <span className="text-orange">Заключении</span> задерживаются действия и
        понижается скорость.
      </p>
    ),
  },
];
