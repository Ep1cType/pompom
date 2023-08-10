import React from "react";
import Script from "next/script";

export const YandexMetrika = () => {
  const script = `
	(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
   m[i].l=1*new Date();
   for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
   k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
   (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

   ym(93462991, "init", {
        clickmap:true,
        trackLinks:true,
        accurateTrackBounce:true
   });
	`;

  return (
    <>
      <Script
        id="yandex-metrika"
        type="text/javascript"
        strategy="worker"
        dangerouslySetInnerHTML={{ __html: script }}
      />
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://mc.yandex.ru/watch/93462991"
            style={{ position: "absolute", left: "-9999px" }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
};
