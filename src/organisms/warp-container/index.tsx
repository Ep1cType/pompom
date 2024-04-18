"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";

import clsx from "clsx";
import { useUnit } from "effector-react";

import { $formDisabled, $warpLink, warpChanged, warpLinkSubmitted } from "features/fetch-warps/model";
import { FilterWarps } from "features/filter-warps/ui";

import { WarpFivestar } from "widgets/warp-fivestar/ui";
import { WarpStats } from "widgets/warp-stats/ui";

import { WarpInfo } from "organisms/warp-info";

import { copyToClipboard } from "shared/utils/copy-to-clipboard";

export const WarpContainer = () => {
  const gistRef = useRef<HTMLPreElement>(null);
  const [warpLink, submit, disabled] = useUnit([$warpLink, warpLinkSubmitted, $formDisabled]);
  const [helpFor, setHelpFor] = useState<"PC" | "iOS">("PC");

  const desktopInstruction = [
    {
      text: <>Запустите игру и&nbsp;откройте Историю прыжков (не&nbsp;важно на&nbsp;каком баннере)</>,
    },
    {
      text: (
        <>
          Сверните игру и&nbsp;откройте Windows PowerShell. Его можно найти воспользовавшись поиском в&nbsp;вашей
          системе.
        </>
      ),
    },
    {
      text: (
        <>
          Скопируйте данный скрипт и&nbsp;вставьте его в&nbsp;PowerShell. При нажатии на&nbsp;скрипт он&nbsp;скопируется
          авоматически.
        </>
      ),
      content: (
        <pre
          className="max-w-[500px] select-all whitespace-pre-wrap break-all rounded-xl bg-blue-900 p-2 text-start"
          onClick={onClick}
          ref={gistRef}
        >
          {"Invoke-Expression (New-Object Net.WebClient).DownloadString" +
            '("https://gist.githubusercontent.com/Ep1cType/464a0a2d2ed9502d19f1f4d2adb54ddc/raw/a91e679b40d92b1c115ee78d71768db86546c5b9/warp_link_from_browser")'}
        </pre>
      ),
    },
  ];

  const iOSInstruction = [
    {
      title: "Предварительные требования",
      content: [
        {
          text: (
            <>
              Нам понадобиться программа для перехвата запросов. Установите Stream Network Debug Tool по&nbsp;
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://apps.apple.com/us/app/stream-network-debug-tool/id1312141691"
                className="text-blue-500 underline"
              >
                этой ссылке
              </a>
            </>
          ),
        },
        {
          text: (
            <>Убедитесь что Safari&nbsp;&mdash; Ваш браузер по&nbsp;умолчанию. (Необходимо для первичной настройки)</>
          ),
        },
      ],
    },
    {
      title: "Настройка приложения Stream",
      content: [
        {
          text: (
            <>
              Откройте Stream и&nbsp;нажмите на&nbsp;кнопку Sniff Now. Далее программа запросит разрешение
              на&nbsp;добавление конфигураций VPN. В&nbsp;открывшимся окне выберите &laquo;Разрешить&raquo;
            </>
          ),
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={1142}
              src="/warp/access.png"
              alt="access"
            />
          ),
        },
        {
          text: (
            <>
              После того как программа добавит конфигурацию откроется ещё одно окно, где программа попросит
              установить&nbsp;CA сертификаты. Нажмите &laquo;Install CA&raquo;. После чего нажмите &laquo;Install
              CA&nbsp;Certificate&raquo;. Откроется браузер Safari где появится всплывающее окно, где будет спрашиваться
              разрешение веб сайту загрузить профиль конфигурации. Нажмите &laquo;Разрешить&raquo;. Далее появится
              всплывающее окно сообщающее об&nbsp;успехе, закройте его.
            </>
          ),
          content: (
            <div className="flex items-start gap-4 overflow-x-auto">
              <Image
                className="w-full max-w-[15rem] object-contain"
                width={790}
                height={1142}
                src="/warp/first.png"
                alt="first"
              />
              <Image
                className="w-full max-w-[15rem] object-contain"
                width={790}
                height={570}
                src="/warp/second.png"
                alt="second"
              />
              <Image
                className="w-full max-w-[15rem] object-contain"
                width={790}
                height={570}
                src="/warp/third.png"
                alt="third"
              />
            </div>
          ),
        },
        {
          text: (
            <>
              Перейдите в&nbsp;Настройки &gt; Основные &gt; VPN и&nbsp;управление устройством. Там под заголовком
              &laquo;Загруженный профиль&raquo; будет Stream Generated CA ***. Нажмите на&nbsp;него и&nbsp;в&nbsp;правом
              верхнем углу нажмите на&nbsp;кнопку &laquo;Установить&raquo;, далее следуйте инструкциям телефона.
            </>
          ),
        },
        {
          text: (
            <>
              Вернетесь в&nbsp;приложение. Если у&nbsp;вас iOS 10.3 и&nbsp;выше, вы&nbsp;увидите всплывающее окно,
              которое запросит дополнительную проверку. Нажмите &laquo;I&rsquo;ve trusted&raquo;.
            </>
          ),
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={570}
              src="/warp/trust.png"
              alt="trust"
            />
          ),
        },
      ],
    },
    {
      title: "Получение ссылки с\u00A0информацией о\u00A0прыжках",
      content: [
        {
          text: <>Запустите Honkai: Star Rail и&nbsp;перейдите на&nbsp;окно прыжков.</>,
        },
        {
          text: <>Откройте приложение Steam и&nbsp;кликните на&nbsp;&laquo;Sniff Now&raquo;.</>,
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={866}
              src="/warp/now.png"
              alt="now"
            />
          ),
        },
        {
          text: <>Вернитесь в&nbsp;Honkai: Star Rail и&nbsp;откройте свою историю прыжков.</>,
        },
        {
          text: <>Вернитесь в&nbsp;приложение Stream и&nbsp;нажмите на&nbsp;&laquo;Stop Sniffing&raquo;.</>,
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={866}
              src="/warp/stop.png"
              alt="stop"
            />
          ),
        },
        {
          text: <>Далее нажмите на&nbsp;&laquo;Sniff History&raquo;</>,
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={866}
              src="/warp/history.png"
              alt="history"
            />
          ),
        },
        {
          text: <>Выберите самую верхнюю (последнюю) сессию.</>,
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={866}
              src="/warp/last.png"
              alt="last"
            />
          ),
        },
        {
          text: (
            <>
              Там вы&nbsp;должны найти запрос, содержащий ссылку следующего типа:
              &laquo;https://api-os-takumi.mihoyo.com/common/gacha...&raquo;. Нажмите на&nbsp;неё.
            </>
          ),
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={591}
              height={1280}
              src="/warp/all-requests.jpg"
              alt="all requests"
            />
          ),
        },
        {
          text: (
            <>
              У&nbsp;вас откроется подробная информация о&nbsp;данном запросе. Перейдите во&nbsp;вкладку
              &laquo;Request&raquo; чтобы увидеть её&nbsp;полностью. Ссылка под заголовком &laquo;REQUEST LINE&raquo;
              и&nbsp;есть ваша ссылка с&nbsp;информацией о&nbsp;прыжках. Нажмите на&nbsp;неё и&nbsp;вы&nbsp;увидите
              всплывающее меню в&nbsp;котором необходимо нажать Copy Url. Затем скопированную ссылку вставьте
              на&nbsp;сайте в&nbsp;поле ниже и&nbsp;нажмите кнопку &laquo;Импорт&raquo;
            </>
          ),
          content: (
            <Image
              className="w-full max-w-[15rem] object-contain"
              width={790}
              height={1376}
              src="/warp/link.png"
              alt="link"
            />
          ),
        },
      ],
    },
  ];

  function onClick() {
    const range = new Range();
    const selection = window.getSelection();

    if (selection && selection.toString() == "") {
      if (gistRef.current && selection && range) {
        setTimeout(() => {
          range.selectNodeContents(gistRef.current as Node);
          selection.removeAllRanges();
          selection.addRange(range);
        }, 1);
      }
    }

    console.log(selection);

    // if (gistRef.current) {
    //   copyToClipboard(gistRef.current.innerText);
    // }
  }

  function handleChangeHelp(value: "PC" | "iOS") {
    return () => {
      setHelpFor(value);
    };
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-center gap-4 md:mb-16">
        <button
          onClick={handleChangeHelp("PC")}
          className={clsx("w-56 rounded-lg bg-blue-900 py-4 font-semibold", helpFor === "PC" && "bg-blue-900/40")}
        >
          Инструкция для PC
        </button>
        <button
          onClick={handleChangeHelp("iOS")}
          className={clsx("w-56 rounded-lg bg-blue-900 py-4 font-semibold", helpFor === "iOS" && "bg-blue-900/40")}
        >
          Инструкция для iOS
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-8">
          {helpFor === "PC" && (
            <ul className="flex flex-col gap-4">
              {desktopInstruction.map((inst, index) => (
                <li key={index} className="flex gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white">
                      <span className="font-semibold">{index + 1}</span>
                    </div>
                    <div className="mx-auto flex-grow">
                      <div className="h-full w-1 rounded-full bg-white/70" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="min-h-8 content-center font-semibold">{inst.text}</p>
                    <div>{inst.content}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {helpFor === "iOS" &&
            iOSInstruction.map((el, index) => (
              <div key={index}>
                <h3 className="mb-4 text-3xl font-semibold">{el.title}</h3>
                <ul className="flex flex-col gap-4">
                  {el.content.map((inst, idx) => (
                    <li key={idx} className="flex gap-3">
                      <div className="flex flex-col gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white">
                          <span className="font-semibold">{idx + 1}</span>
                        </div>
                        <div className="mx-auto flex-grow">
                          <div className="h-full w-1 rounded-full bg-white/70" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="min-h-8 content-center font-semibold">{inst.text}</p>
                        <div>{inst.content}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </section>
        <section>
          <aside className="sticky top-4">
            <fieldset disabled={disabled} className="mb-16 flex flex-col gap-4">
              <textarea
                placeholder="https://api-os-takumi.mihoyo.com"
                className="max-h-20 min-h-9 rounded-sm px-2.5 py-1 text-blue-950"
                value={warpLink}
                onChange={(event) => warpChanged(event.target.value)}
              />

              <button
                className="w-full rounded-lg bg-gradient-to-t from-five-from to-five-to py-4 font-semibold disabled:grayscale"
                onClick={submit}
              >
                Импорт
              </button>
            </fieldset>
            <div className="mt-5 flex flex-col lg:flex-row">
              <FilterWarps />
              <WarpStats />
              <WarpFivestar />
              <WarpInfo />
            </div>
          </aside>
        </section>
      </div>
    </>
  );
};
