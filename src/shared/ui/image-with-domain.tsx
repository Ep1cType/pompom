import React from 'react';
import Image, { ImageProps } from 'next/image';

export const ImageWithDomain = ({ src, ...props }: ImageProps) => {
	return <Image src={`${process.env.NEXT_PUBLIC_API_URL}${src}`} {...props} />;
};
