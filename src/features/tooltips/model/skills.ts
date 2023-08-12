import { CharacterSkillList } from "shared/api/character/type";

type Skill = {
  [key in CharacterSkillList]: string;
};

export const skills: Skill = {
  baseChance: /* HTML */ `
    Базовый шанс - это вероятность наложения ослабления на цель. <br />
    На итоговую вероятность влияет шанс попадания эффектов атакующего и
    сопротивление эффектам противника.
  `,
  bonusAttack: /* HTML */ `
    Проводит дополнительную атаку по цели. Этот эффект срабатывает автоматически
    при выполнении условий.
  `,
};
