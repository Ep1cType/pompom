import React from 'react';
import { ImageWithDomain } from 'shared/ui/image-with-domain';
import { Guide } from 'shared/api/guide/type';
import { ResponseDataItem } from 'shared/api/types';
import { useRouter } from 'next/router';

type Props = {
	guide: ResponseDataItem<Guide>
}

export const GuideCard = ({ guide }: Props) => {
	const router = useRouter();
	return (
		<article onClick={() => router.push(`/guides/${guide.attributes.slug}`)} className='group p-4 bg-blue-900 rounded-xl md:rounded-2xl cursor-pointer'>
			<div className='h-[212px] md:h-[407px] relative rounded-xl md:rounded-2xl overflow-hidden mb-4'>
				<ImageWithDomain
					className='object-cover absolute inset-0 w-full h-full group-hover:scale-125 duration-300'
					src={guide.attributes.cover.data.attributes.url}
					width={guide.attributes.cover.data.attributes.width}
					height={guide.attributes.cover.data.attributes.height}
					alt={guide.attributes.cover.data.attributes.name}
				/>
			</div>
			<time
				dateTime={guide.attributes.updatedAt}
			>
				{new Date(guide.attributes.updatedAt).toLocaleDateString()}
			</time>
			<h2 className='text-lg md:text-xl group-hover:opacity-80'>{guide.attributes.title}</h2>
		</article>
	);
};
