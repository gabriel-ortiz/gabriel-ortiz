import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import { UseApp } from '../context/AppContext';

const ThumbnailWrapper = tw.div`w-full`;

//artwork thumbnails
const Thumbnails = styled.div`
	top: 50px;
	${tw`hidden md:grid gap-4 md:col-span-1 grid-cols-2 sticky`}
`;

//thumbnail container and image
const Thumbnail = styled.div`
	${tw`col-span-1`}
	a {
		${tw`transition-all duration-500 ease-in-out transform hover:scale-105`}
		width: 100%;
		padding-top: 100%;
		overflow: hidden;
		position: relative;
		display: inline-block;
		backface-visibility: hidden;
		img {
			position: absolute;
			object-fit: cover;
			object-position: center;
			height: 100%;
			width: 100%;
			top: 0;
			left: 0;
		}
	}
`;

const ArtworkThumbnails = (props) => {
	const { state, setState } = UseApp();

	// so here we are setting the height of the sticky top property based on the height of the header
	let stickyHeight = state.headerEl.height + 16;

	const { items, cb } = props;
	return (
		<ThumbnailWrapper>
			<Thumbnails style={{ top: `${stickyHeight}px` }}>
				{items.map((artwork) => {
					let {
						contentID,
						fields: {
							artworkImage: { url, label },
						},
					} = artwork;

					if (url) {
						return (
							<Thumbnail key={contentID}>
								<a
									href="#"
									id={contentID}
									onClick={cb(contentID)}>
									<img
										src={url}
										alt={
											label ? label : 'Scroll to artwork'
										}
									/>
								</a>
							</Thumbnail>
						);
					}
				})}
			</Thumbnails>
		</ThumbnailWrapper>
	);
};

export default ArtworkThumbnails;
