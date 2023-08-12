import { CharacterPathList } from "shared/api/character/type";

type Path = {
  [key in CharacterPathList]: string;
};

export const paths: Path = {
  hunt: /* HTML */ `
    <p class="max-w-[300px]">
      Обладают способностями
      <span class="text-orange"> наносить огромный урон по одной цели </span>
      , наносят основной урон в бою с элитными противниками.
    </p>
  `,
  abundance: /* HTML */ `
    <p class="max-w-[300px]">
      Могут <span class="text-orange">исцелять</span> союзников и обеспечивают
      поддержку отряда восстанавливающими способностями.
    </p>
  `,
  erudition: /* HTML */ `
    <p class="max-w-[300px]">
      Обладают способностями
      <span class="text-orange">
        наносить большой урон по нескольким целям
      </span>
      , могут атаковать нескольких противников одновременно.
    </p>
  `,
  destruction: /* HTML */ `
    <p class="max-w-[300px]">
      Обладают приличным
      <span class="text-orange">наносимым уроном и живучестью</span>, могут
      адаптироваться к различным боевым ситуациям.
    </p>
  `,
  harmony: /* HTML */ `
    <p class="max-w-[300px]">
      Могут <span class="text-orange">усиливать</span> союзников, чтобы повысить
      боевые показатели отряда.
    </p>
  `,
  preservation: /* HTML */ `
    <p class="max-w-[300px]">
      Обладают мощными <span class="text-orange">оборонительными</span>
      способностями, которые позволяют защитить союзников.
    </p>
  `,
  nihility: /* HTML */ `
    <p class="max-w-[300px]">
      Могут <span class="text-orange">ослаблять</span> противников, чтобы
      понизить их боевые показатели и преимущества.
    </p>
  `,
};
