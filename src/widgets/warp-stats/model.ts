export const warpStatData: {
  [key: string]: {
    text: string;
    value: string;
    className?: string;
    icon?: {
      src: string;
      width: number;
      height: number;
      alt: string;
    };
  };
} = {
  allWarp: {
    text: "Всего совершено прыжков:",
    value: "",
    icon: {
      src: "/icons/common/warp.webp",
      width: 256,
      height: 256,
      alt: "Иконка прыжка",
    },
  },
  allJade: {
    text: "Всего потрачено нефрита:",
    value: "",
    icon: {
      src: "/icons/common/jade.webp",
      width: 256,
      height: 256,
      alt: "Иконка звёздного нефрита",
    },
  },
  "5Warp": {
    text: "5★ Прыжков:",
    value: "",
  },
  "4Warp": {
    text: "4★ Прыжков:",
    value: "",
  },
  "3Warp": {
    text: "3★ Прыжков:",
    value: "",
  },
  before5: {
    text: "Осталось прыжков до 5★ гаранта:",
    value: "",
    className: "text-gold",
  },
  before4: {
    text: "Осталось прыжков до 4★ гаранта:",
    value: "",
    className: "text-four-from",
  },
};
