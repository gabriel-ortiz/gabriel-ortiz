import React, { useRef, useEffect } from 'react';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components';
import agility from '@agility/content-fetch';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { useSpring, config } from 'react-spring';
import { UseApp } from '../context/AppContext';

//import artwork components
import ArtworkThumbnails from '../artwork/ArtworkThumbnails';
import Portfolio from '../artwork/Portfolio';

const api = agility.getApi({
	guid: 'f0a58492',
	apiKey:
		'defaultlive.9d0648b7f970bff71b2384885584270b1445d41e225eedae24ac89a2d190a7fe',
	isPreview: false,
});

//wrapper
const ArtworkWrapper = tw.section`
`;

//hero wrapper
const HeroWrapper = styled.div`
	background-blend-mode: overlay;
	${tw`grid gap-8 grid-cols-1 md:grid-cols-4 items-center bg-cover bg-center bg-no-repeat text-white p-10 leading-relaxed`};
`;

//hero title
const HeroTitle = tw.h1`text-accent col-span-1 justify-self-end`;

//hero excerpt
const HeroExcerpt = tw.div`md:col-span-3 xl:col-span-2 font-semibold tracking-wide`;

//artwork portfolio Wrapper
const ArtworkPortfolio = tw.article`grid grid-cols-1 md:grid-cols-4 gap-8 p-8`;

const ArtworkbyCategory = (props) => {
	const portFolioRef = useRef({});
	const { state, setState } = UseApp();

	const [, setScrollPos, stopScroll] = useSpring(() => ({
		immediate: false,
		y: window.pageYOffset,
		x: window.pageXOffset,
		onFrame: ({ x, y }) => {
			window.scrollTo(x, y - state.headerEl.height - 16);
		},
		onRest: () => {
			window.removeEventListener('wheel', stopScrollOnWheel);
		},
		config: config.slow,
	}));

	const handleClickScroll = (id) => (event) => {
		event.preventDefault();
		window.addEventListener('wheel', stopScrollOnWheel);
		let node = portFolioRef.current[id];
		setScrollPos({
			y:
				node.getBoundingClientRect().top >= 0
					? node.getBoundingClientRect().top + window.pageYOffset
					: window.pageYOffset + node.getBoundingClientRect().top,
			// Also added support for vertical, shouldn't introduce any problem if your
			// page isn't wider than 100vw, but could reflect some unexpected behaviour
			// if you do, and want to scroll to element where element.left doesn't
			// intersect with the viewport's left edge.
			x:
				node.getBoundingClientRect().left >= 0
					? node.getBoundingClientRect().left + window.pageXOffset
					: window.pageXOffset + node.getBoundingClientRect().top,
		});
	};

	const stopScrollOnWheel = () => {
		window.removeEventListener('wheel', stopScrollOnWheel);
		stopScroll();
	};

	const { contentID, fields, customData, page } = props;

	const {
		title,
		categoryContent,
		backgroundImage,
		excerpt,
	} = fields.selectCategory.fields;

	const {
		artworks: { items },
	} = customData;

	let containerStyle = {
		backgroundImage:
			'url(https://images.unsplash.com/photo-1522071901873-411886a10004?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)',
	};
	if (backgroundImage && backgroundImage.url) {
		containerStyle = {
			backgroundImage: `url(${backgroundImage.url}?w=1920), linear-gradient(
                to bottom,
                rgba(3, 20, 36, 1) 60%,
                rgba(30,87,153,1) 150%
            )`,
		};
	}

	return (
		<ArtworkWrapper id={contentID}>
			<HeroWrapper style={containerStyle}>
				{title && <HeroTitle>{title}</HeroTitle>}
				{excerpt && (
					<HeroExcerpt>{ReactHtmlParser(excerpt)}</HeroExcerpt>
				)}
			</HeroWrapper>
			<ArtworkPortfolio>
				<ArtworkThumbnails items={items} cb={handleClickScroll} />
				<Portfolio items={items} ref={portFolioRef} />
			</ArtworkPortfolio>
		</ArtworkWrapper>
	);
};

ArtworkbyCategory.getCustomInitialProps = async ({
	channelName,
	languageCode,
	item,
}) => {
	//get API instance
	//const api = agility;
	//get the item data to we can get the ID to search for
	const catID = item.fields?.selectCategory_ValueField;

	try {
		//then get our posts
		let artworks = await api.getContentList({
			referenceName: 'artworks',
			languageCode: 'en-us',
			expandAllContentLinks: true,
			filters: [
				{
					property: 'fields.category',
					operator: api.types.FilterOperators.LIKE,
					value: 57,
				},
			],
		});

		// //then get our posts
		// let artworks = await api.getContentList({
		//     referenceName: 'artworks',
		//     languageCode,
		// });

		return {
			artworks,
		};
	} catch (e) {
		console.log(e);
	}
};

export default ArtworkbyCategory;
