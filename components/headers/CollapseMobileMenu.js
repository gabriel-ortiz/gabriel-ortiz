import React from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import tw from 'twin.macro';

function CollapseMobileMenu(props) {
	const { children, navbarState, handleNavbar, breakPoint } = props;

	const { open } = useSpring({ open: navbarState ? 0 : 1 });

	/**
	 * Anytime the mobile navbar is clicked and it's an <a> tag
	 * we need to close the mobile navbar.
	 * This is because we're using <Link> tags (NextJS, Gatsby)
	 *
	 * @param {*} e
	 */
	const mobileNavBarClicked = (e) => {
		if (e.target && e.target.tagName === 'A') {
			toggleNavbar();
		}
	};

	if (props.navbarState === true) {
		return (
			<MobileNavLinksContainer
				style={{
					transform: open
						.interpolate({
							range: [0, 0.2, 0.3, 1],
							output: [0, -20, 0, -200],
						})
						.interpolate(
							(openValue) => `translate3d(0, ${openValue}px, 0`
						),
				}}
				css={breakPoint}>
				<MobileNavLinks onClick={(e) => mobileNavBarClicked(e)}>
					{children}
				</MobileNavLinks>
			</MobileNavLinksContainer>
		);
	}
	return null;
}

const MobileNavLinksContainer = styled(animated.nav)`
	${`flex flex-1 items-center justify-between`}
`;

export const MobileNavLinks = styled.div`
	${tw`lg:hidden z-40 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
`;

export default CollapseMobileMenu;
