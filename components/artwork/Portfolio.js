import React, { forwardRef } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

import MetaBlock from './MetaBlock';

//artwork content wrapper
const ArtContentWrapper = tw.div`col-span-3 md:col-span-3 gap-4`;

//artwork content

const PortfolioWrapper = styled.article`
	${tw`flex flex-wrap xl:flex-no-wrap`}

	&:not(:first-of-type) {
		${tw`mt-16`}
	}
`;

const PortfolioImg = styled.div`
	${tw`w-full xl:max-w-1/2`}
	flex: 1 0 auto;
	img {
		${tw`w-full shadow-lg block mx-auto lg:w-3/5 xl:w-full`}
	}
`;

const PortfolioMeta = tw.div`flex-auto px-6`;

const PortfolioHeading = styled.div`
	${tw` w-full items-center`}
	.portfolioHeading__title {
		${tw`text-accent text-4xl font-light`}
	}
	.portfolioHeading__year {
		${tw`text-secondary-accent font-semibold`}
	}
`;

const Portfolio = forwardRef((props, ref) => {
	const { items } = props;

	return (
		<ArtContentWrapper>
			{items.map((artwork) => {
				let {
					contentID,
					fields: {
						title,
						year,
						artworkMedium,
						artworkDescription,
						artworkImage: { url, label },
					},
				} = artwork;

				//setup the meta about object to be passed to the component
				const artworkMetaAbout = [
					{
						title: 'Year',
						body: year,
					},
					{
						title: 'Medium',
						body: artworkMedium,
					},
					{
						title: 'Description',
						body: artworkDescription,
					},
				];

				if (url) {
					return (
						<PortfolioWrapper
							ref={(el) => (ref.current[contentID] = el)}
							key={contentID}>
							<PortfolioImg>
								<img
									src={url}
									alt={label ? label : 'Scroll to artwork'}
								/>
							</PortfolioImg>
							<PortfolioMeta>
								<PortfolioHeading>
									<div className="portfolioHeading__title">
										{title}
									</div>
								</PortfolioHeading>
								<MetaBlock data={artworkMetaAbout} />
							</PortfolioMeta>
						</PortfolioWrapper>
					);
				}
			})}
		</ArtContentWrapper>
	);
});

export default Portfolio;
