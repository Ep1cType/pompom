import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useUnit } from "effector-react";
import {
  $formDisabled,
  $warpLink,
  warpChanged,
  warpLinkSubmitted,
} from "features/fetch-warps/model";
import clsx from "clsx";
import { copyToClipboard } from "shared/utils/copy-to-clipboard";
import Head from "next/head";
import { FilterWarps } from "features/filter-warps/ui";
import { PageTitle } from "shared/ui/page-title";
import Image from "next/image";

const WarpInfo = dynamic(
  () => import("organisms/warp-info").then((mod) => mod.WarpInfo),
  { ssr: false },
);

const WarpPage = () => {
  const gistRef = useRef<HTMLPreElement>(null);
  const [warpLink, submit, disabled] = useUnit([
    $warpLink,
    warpLinkSubmitted,
    $formDisabled,
  ]);
  const [helpFor, setHelpFor] = useState<"PC" | "iOS">("PC");

  function onClick() {
    if (gistRef.current) {
      copyToClipboard(gistRef.current.innerText);
    }
  }

  function handleChangeHelp(value: "PC" | "iOS") {
    return () => {
      setHelpFor(value);
    };
  }

  return (
    <>
      <Head>
        <title>{`История прыжков | pom-pom.pro`}</title>
        <meta property="og:title" content={`История прыжков | pom-pom.pro`} />
        <meta
          property="og:description"
          content={
            "Здесь Вы можете импортировать из игры ваши прыжки и посмотреть статистику по баннерам."
          }
        />
        <meta
          name="description"
          content={
            "Здесь Вы можете импортировать из игры ваши прыжки и посмотреть статистику по баннерам."
          }
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/warp`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={"ru"} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <PageTitle text={"История прыжков"} className="mb-8 md:mb-16" />
        <div className="mb-8 flex items-center gap-4 md:mb-16">
          <button
            onClick={handleChangeHelp("PC")}
            className={clsx(
              "btn",
              helpFor === "PC" ? "btn-primary" : "btn-ghost",
            )}
          >
            Инструкция для PC
          </button>
          <button
            onClick={handleChangeHelp("iOS")}
            className={clsx(
              "btn",
              helpFor === "iOS" ? "btn-primary" : "btn-ghost",
            )}
          >
            Инструкция для iOS
          </button>
        </div>
        <section>
          {helpFor === "PC" && (
            <ul className="steps steps-vertical text-base">
              <li className="step-primary step">
                Запустите игру и откройте Историю прыжков (не важно на каком
                баннере)
              </li>
              <li className="step-primary step">
                Сверните игру и откройте Windows PowerShell. Его можно найти
                воспользовавшись поиском в вашей системе.
              </li>
              <li className="step-primary step">
                <div className="flex flex-col items-start gap-2">
                  <p>
                    Скопируйте данный скрипт и вставьте его в PowerShell. При
                    нажатии на скрипт он скопируется авоматически.
                  </p>

                  <pre
                    className="max-w-[500px] whitespace-break-spaces break-words rounded-xl bg-blue-900 p-2 text-start"
                    onClick={onClick}
                    ref={gistRef}
                  >
                    {"Invoke-Expression (New-Object Net.WebClient).DownloadString" +
                      '("https://gist.githubusercontent.com/Ep1cType/464a0a2d2ed9502d19f1f4d2adb54ddc/raw/a91e679b40d92b1c115ee78d71768db86546c5b9/warp_link_from_browser")'}
                  </pre>
                </div>

                {/*<Image className="rounded-xl overflow-hidden" width={679} height={186} src={"/warp/powershell.png"} alt={"Powershell"} />*/}
              </li>
              <li className="step-primary step">
                <div className="flex flex-col items-start gap-2">
                  <p>
                    Результат выполнения скрипта должен автоматически
                    скопироваться в буфер обмена. Вставьте результат выполнения
                    в поле ниже и нажмите кнопку{" "}
                    <span className="text-orange">Импорт</span>:
                  </p>
                </div>
              </li>
            </ul>
          )}
          {helpFor === "iOS" && (
            <>
              <ol className="relative border-l border-gray-200 text-white dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-blue-900 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900">
                    1
                  </span>
                  <h3 className="font-medium leading-tight">
                    Предварительные требования
                  </h3>
                  <p className="text-sm">
                    Нам понадобиться программа для перехвата запросов.
                    Установите Stream Network Debug Tool по этой{" "}
                    <a
                      className="text-blue-500 underline"
                      target="_blank"
                      href="https://apps.apple.com/us/app/stream-network-debug-tool/id1312141691"
                    >
                      ссылке
                    </a>
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center  rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    2
                  </span>
                  <h3 className="font-medium leading-tight">
                    Предварительные требования
                  </h3>
                  <p className="text-sm">
                    Убедитесь что Safari - Ваш браузер по умолчанию. (Необходимо
                    для первичной настройки)
                  </p>
                </li>
              </ol>
              <h2 className="mb-10">Настройка приложения Stream</h2>
              <ol className="relative border-l border-gray-200 text-white dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 text-blue-900 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900">
                    1
                  </span>
                  <p className="text-sm">
                    Откройте Stream и нажмите на кнопку Sniff Now. Далее
                    программа запросит разрешение на добавление конфигураций
                    VPN. В открывшимся окне выберите Разрешить
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={1142}
                      src={"/warp/access.png"}
                      alt={"access"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    2
                  </span>
                  {/*<h3 className="font-medium leading-tight">*/}
                  {/*  Предварительные требования*/}
                  {/*</h3>*/}
                  <p className="text-sm">
                    После того как программа добавит конфигурацию откроется ещё
                    одно окно, где программа попросит установить CA сертификаты.
                    Нажмите «Install CA». После чего нажмите «Install CA
                    Certificate». Откроется браузер Safari где появится
                    всплывающее окно, где будет спрашиваться разрешение веб
                    сайту загрузить профиль конфигурации. Нажмите «Разрешить».
                    Далее появится всплывающее окно сообщающее об успехе,
                    закройте его.
                  </p>
                  <div className="flex gap-4 overflow-x-auto">
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={1142}
                      src={"/warp/first.png"}
                      alt={"first"}
                    />
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={570}
                      src={"/warp/second.png"}
                      alt={"second"}
                    />
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={570}
                      src={"/warp/third.png"}
                      alt={"third"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    3
                  </span>
                  {/*<h3 className="font-medium leading-tight">Review</h3>*/}
                  <p className="text-sm">
                    Перейдите в Настройки {">"} Основные {">"} VPN и управление
                    устройством. Там под заголовком «Загруженный профиль» будет
                    Stream Generated CA ***. Нажмите на него и в правом верхнем
                    углу нажмите на кнопку «Установить», далее следуйте
                    инструкциям телефона.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    4
                  </span>
                  {/*<h3 className="font-medium leading-tight">Confirmation</h3>*/}
                  <p className="text-sm">
                    Вернетесь в приложение. Если у вас iOS 10.3 и выше, вы
                    увидите всплывающее окно, которое запросит дополнительную
                    проверку. Нажмите «I’ve trusted».
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={570}
                      src={"/warp/trust.png"}
                      alt={"trust"}
                    />
                  </div>
                </li>
              </ol>

              <h2 className="mb-10">
                Получение ссылки с информацией о прыжках
              </h2>

              <ol className="relative border-l border-gray-200 text-white dark:border-gray-700 dark:text-gray-400">
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    1
                  </span>
                  {/*<h3 className="font-medium leading-tight">Confirmation</h3>*/}
                  <p className="text-sm">
                    Запустите Honkai: Star Rail и перейдите на окно прыжков.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    2
                  </span>
                  <p className="text-sm">
                    Откройте приложение Steam и кликните на «Sniff Now».
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={866}
                      src={"/warp/now.png"}
                      alt={"now"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    3
                  </span>
                  <p className="text-sm">
                    Вернетесь в Honkai: Star Rail и откройте свою историю
                    прыжков.
                  </p>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    4
                  </span>
                  <p className="text-sm">
                    Вернетесь в приложение Stream и нажмите на «Stop Sniffing».
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={866}
                      src={"/warp/stop.png"}
                      alt={"stop"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    5
                  </span>
                  <p className="text-sm">Далее нажмите на «Sniff History»</p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={866}
                      src={"/warp/history.png"}
                      alt={"history"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    6
                  </span>
                  <p className="text-sm">
                    Выберите самую верхнюю (последнюю) сессию.
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={866}
                      src={"/warp/last.png"}
                      alt={"last"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    7
                  </span>
                  <p className="text-sm">
                    Там вы должны найти запрос, содержащий ссылку следующего
                    типа: «https://api-os-takumi.mihoyo.com/common/gacha...».
                    Нажмите на неё.
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={591}
                      height={1280}
                      src={"/warp/all-requests.jpg"}
                      alt={"all requests"}
                    />
                  </div>
                </li>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-900 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                    8
                  </span>
                  <p className="text-sm">
                    У вас откроется подробная информация о данном запросе.
                    Перейдите во вкладку «Request» чтобы увидеть её полностью.
                    Ссылка под заголовком «REQUEST LINE» и есть ваша ссылка с
                    информацией о прыжках. Нажмите на неё и увидите всплывающее
                    меню, в котором нажмите Copy Url. Затем скопированную ссылку
                    вставите на сайте в поле ниже и нажмите кнопку «Импорт»
                  </p>
                  <div>
                    <Image
                      className="w-full max-w-[15rem] object-contain"
                      width={790}
                      height={1376}
                      src={"/warp/link.png"}
                      alt={"link"}
                    />
                  </div>
                </li>
              </ol>
            </>
          )}
        </section>

        <div className="mb-16">
          <input
            type="text"
            placeholder="Type here"
            className="input-bordered input-accent input input-lg w-full max-w-xs text-blue-950"
            value={warpLink}
            onChange={(event) => warpChanged(event.target.value)}
            disabled={disabled}
          />
          <button
            className={clsx(
              "btn h-10 rounded-xl bg-gradient-to-t from-five-from to-five-to px-6 text-white",
              "hover:opacity-80",
              disabled && "loading",
            )}
            onClick={submit}
            disabled={disabled}
          >
            Импорт
          </button>
        </div>
        <div className="mt-5 flex flex-col lg:flex-row">
          <aside>
            <FilterWarps />
          </aside>
          <WarpInfo />
        </div>
      </div>
    </>
  );
};

export default WarpPage;
