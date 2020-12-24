import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import tw from 'twin.macro';
import styled from 'styled-components';
import { css } from 'styled-components/macro'; //eslint-disable-line
import { useSpring, animated, config } from 'react-spring';

import { UseApp } from '../context/AppContext';
import BurgerMenu from '../headers/BurgerMenu';
import CollapseMobileMenu from '../headers/CollapseMobileMenu';

import Link from 'next/link';

import logo from '../../images/logo.svg';
// import { ReactComponent as MenuIcon } from 'feather-icons/dist/icons/menu.svg';
// import { ReactComponent as CloseIcon } from 'feather-icons/dist/icons/x.svg';

const Header = styled(animated.header)`
	${tw`flex justify-between items-center mx-auto mb-8 bg-primary w-full sticky top-0`}
`;

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center container mx-auto
`;

export const NavLinks = styled(animated.div)`
	${tw`inline-block py-4`}
`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary will apply the bg-primary class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 cursor-pointer
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary hocus:text-primary text-white
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary text-gray-100
  hocus:bg-primary hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled.a`
	${tw`flex items-center font-black border-b-0 text-2xl! ml-0! relative bg-primary w-32`};

	figure {
		${tw`inset-0 w-32 h-20 overflow-hidden absolute transform -translate-y-6 cursor-pointer`}

		img {
			${tw`w-full absolute bottom-0 bg-primary`}
		}
	}
`;

export const NavToggle = tw.button`
  lg:hidden z-50 focus:outline-none hocus:text-primary transition duration-300
`;

export default ({
	roundedHeaderButton = false,
	logoLink,
	links,
	className,
	collapseBreakpointClass = 'lg',
}) => {
	/*
	 * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
	 * This links props should be an array of "NavLinks" components which is exported from this file.
	 * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
	 * This allows this Header to be multi column.
	 * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
	 * Left part will be LogoLink, and the right part will be the the NavLinks component you
	 * supplied.
	 * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
	 * You can also choose to directly modify the links here by not passing any links from the parent component and
	 * changing the defaultLinks variable below below.
	 * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
	 */

	const [navbarState, setNavBar] = useState(false);
	const handleNavbar = () => {
		setNavBar(!navbarState);
	};

	const defaultLinks = [
		<NavLinks key={1}>
			<Link key={'/blog'} href={'/blog'}>
				<NavLink>Blog</NavLink>
			</Link>
			<NavLink href="/#">About</NavLink>
			<NavLink href="/#">Pricing</NavLink>
			<NavLink href="/#">Contact Us</NavLink>
			<NavLink href="/#" tw="lg:ml-12!">
				Login
			</NavLink>
			<PrimaryLink
				css={roundedHeaderButton && tw`rounded-full`}
				href="/#">
				Sign Up
			</PrimaryLink>
		</NavLinks>,
	];

	const collapseBreakpointCss =
		collapseBreakPointCssMap[collapseBreakpointClass];

	const defaultLogoLink = (
		<Link href={'/'}>
			<LogoLink>
				<img src={logo} alt="logo" />
				Treact
			</LogoLink>
		</Link>
	);

	logoLink = logoLink || defaultLogoLink;
	links = links || defaultLinks;

	const barAnimation = useSpring({
		from: { transform: 'translate3d(0,-10rem, 0)' },
		transform: 'translate3d(0,0,0)',
	});

	const navRef = useRef();
	const { state, setState } = UseApp();

	useEffect(() => {
		setState((prevState) => {
			return {
				...prevState,
				headerEl: navRef.current.getBoundingClientRect(),
			};
		});
	}, []);
	console.log(state);

	return (
		<Header
			ref={navRef}
			className={className || 'header-light'}
			style={barAnimation}>
			<DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
				{links}
				{logoLink}
			</DesktopNavLinks>
			<BurgerMenu navbarState={navbarState} handleNavbar={handleNavbar} />
			<CollapseMobileMenu
				breakPoint={collapseBreakpointCss.mobileNavLinksContainer}
				navbarState={navbarState}
				handleNavbar={handleNavbar}>
				{links}
			</CollapseMobileMenu>
		</Header>
	);
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
	sm: {
		mobileNavLinks: tw`sm:hidden`,
		desktopNavLinks: tw`sm:flex`,
		mobileNavLinksContainer: tw`sm:hidden`,
	},
	md: {
		mobileNavLinks: tw`md:hidden`,
		desktopNavLinks: tw`md:flex`,
		mobileNavLinksContainer: tw`md:hidden`,
	},
	lg: {
		mobileNavLinks: tw`lg:hidden`,
		desktopNavLinks: tw`lg:flex`,
		mobileNavLinksContainer: tw`lg:hidden`,
	},
	xl: {
		mobileNavLinks: tw`lg:hidden`,
		desktopNavLinks: tw`lg:flex`,
		mobileNavLinksContainer: tw`lg:hidden`,
	},
};
