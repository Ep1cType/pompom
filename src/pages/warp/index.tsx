import React, { useRef } from "react";
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

  function onClick() {
    if (gistRef.current) {
      copyToClipboard(gistRef.current.innerText);
    }
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
        <PageTitle text={"История прыжков"} />
        <section>
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
                    '("https://gist.githubusercontent.com/Ep1cType/464a0a2d2ed9502d19f1f4d2adb54ddc/raw/9137c00da75656089e844256737f36fdbe2f177c/warp_link_from_browser")'}
                </pre>
              </div>

              {/*<Image className="rounded-xl overflow-hidden" width={679} height={186} src={"/warp/powershell.png"} alt={"Powershell"} />*/}
            </li>
            <li className="step-primary step">
              <div className="flex flex-col items-start gap-2">
                <p>
                  Результат выполнения скрипта должен автоматически
                  скопироваться в буфер обмена. Вставьте результат выполнения в
                  поле ниже и нажмите кнопку{" "}
                  <span className="text-orange-300">Импорт</span>:
                </p>
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
            </li>
          </ul>
        </section>
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
