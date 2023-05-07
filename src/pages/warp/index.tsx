import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { useStore, useUnit } from 'effector-react';
import {
	$formDisabled,
	$warpLink,
	$warpLinkSubmittedError,
	warpChanged,
	warpLinkSubmitted,
} from 'features/fetch-warps/model';
import clsx from 'clsx';
import { copyToClipboard } from 'shared/utils/copy-to-clipboard';
import Image from 'next/image';

const WarpInfo = dynamic(() =>
		import('organisms/warp-info').then((mod) => mod.WarpInfo),
	{ ssr: false },
);

const WarpPage = () => {
	const gistRef = useRef<HTMLPreElement>(null);
	const [warpLink, submit, disabled, error] = useUnit([$warpLink, warpLinkSubmitted, $formDisabled, $warpLinkSubmittedError]);
	const gistValue = '';

	function onClick() {
		if (gistRef.current) {
			copyToClipboard(gistRef.current.innerText);
		}
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<section>
				<ul className='steps steps-vertical text-base'>
					<li className='step step-primary'>
						Запустите игру и откройте Историю прыжков (не важно на каком баннере)
					</li>
					<li className='step step-primary'>
						Сверните игру и откройте Windows PowerShell. Его можно найти
						воспользовавшись поиском в вашей системе.
					</li>
					<li className='step step-primary'>
						<div className='flex flex-col items-start gap-2'>
							<p>Скопируйте данный скрипт и вставьте его в PowerShell</p>

							<pre
								className='break-words max-w-[500px] whitespace-break-spaces bg-blue-900 p-2 rounded-xl text-start'
								onClick={onClick}
								ref={gistRef}
							>
					{'Invoke-Expression (New-Object Net.WebClient).DownloadString' +
						'("https://gist.githubusercontent.com/Ep1cType/464a0a2d2ed9502d19f1f4d2adb54ddc/raw/6a968776e9ba02df61c69f879368362e8cd3310d/warp_link_from_browser")'}
				</pre>
						</div>


						{/*<Image className="rounded-xl overflow-hidden" width={679} height={186} src={"/warp/powershell.png"} alt={"Powershell"} />*/}
					</li>
					<li className='step step-primary'>
						<div className='flex flex-col items-start gap-2'>
							<p>Результат выполнения скрипта должен автоматически скопироваться в буфер обмена. Вставьте результат
								выполнения в поле ниже и нажмите кнопку <span className="text-orange-300">Импорт</span>:</p>
							<input
								type='text'
								placeholder='Type here'
								className='input input-bordered text-blue-950 input-accent input-lg w-full max-w-xs'
								value={warpLink}
								onChange={event => warpChanged(event.target.value)}
								disabled={disabled}
							/>
							<button
								className={clsx(
									'btn bg-gradient-to-t from-five-from to-five-to px-6 h-10 rounded-xl text-white',
									"hover:opacity-80",
									disabled && 'loading'
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
			<section className=''>


			</section>
			<section>


			</section>
			<WarpInfo />
		</div>
	);
};

export default WarpPage;