import { CharacterElementList } from "shared/api/character/type";

type Elements = {
  [key in CharacterElementList]: string;
};

export const elements: Elements = {
  ice: /* HTML */ `<p class="max-w-[300px]">
    Пробитие <span class="text-orange">ледяной уязвимости</span>: использование
    ледяных атак для
    <span class="text-orange">пробития уязвимости</span> нанесёт ледяной урон и
    наложит статус <span class="text-orange">Заморозка</span>, который наносит
    дополнительный ледяной урон.
  </p>`,
  fire: /* HTML */ `<p class="max-w-[300px]">
    Пробитие <span class="text-orange">огненной уязвимости</span>: использование
    огненных атак для
    <span class="text-orange">пробития уязвимости</span> нанесёт огненный урон и
    наложит статус <span class="text-orange">Горение</span>, который наносит
    периодический огненный урон.
  </p>`,
  physical: /* HTML */ `
    <p class="max-w-[300px]">
      Пробитие <span class="text-orange">физической уязвимости</span>:
      использование физических атак для
      <span class="text-orange">пробития уязвимости</span> нанесёт физический
      урон и наложит статус <span class="text-orange">Кровотечение</span>,
      который наносит периодический физический урон.
    </p>
  `,
  lightning: /* HTML */ `
    <p class="max-w-[300px]">
      Пробитие <span class="text-orange">электрической уязвимости</span>:
      использование электрических атак для
      <span class="text-orange">пробития уязвимости</span> нанесёт электрический
      урон и наложит статус <span class="text-orange">Шок</span>, который
      наносит периодический электрический урон.
    </p>
  `,
  wind: /* HTML */ `
    <p class="max-w-[300px]">
      Пробитие <span class="text-orange">ветряной уязвимости</span>:
      использование ветряных атак для
      <span class="text-orange">пробития уязвимости</span> нанесёт ветряной урон
      и наложит статус <span class="text-orange">Выветривание</span>, который
      наносит периодический ветряной урон.
    </p>
  `,
  quantum: /* HTML */ `
    <p class="max-w-[300px]">
      Пробитие <span class="text-orange">квантовой уязвимости</span>:
      использование квантовых атак для
      <span class="text-orange">пробития уязвимости</span> нанесёт квантовый
      урон и наложит статус <span class="text-orange">Связывание</span>, который
      задерживает действие противника и наносит дополнительный квантовый урон в
      начале следующего хода. Когда противник получает удар, этот дополнительный
      квантовый урон повышается.
    </p>
  `,
  imaginary: /* HTML */ `
    <p class="max-w-[300px]">
      Пробитие <span class="text-orange">мнимой уязвимости</span>: использование
      мнимых атак для
      <span class="text-orange">пробития уязвимости</span> нанесёт мнимый урон и
      дополнительно наложит статус
      <span class="text-orange">Заключение</span> на цель. У противников в
      <span class="text-orange">Заключении</span> задерживаются действия и
      понижается скорость.
    </p>
  `,
};
