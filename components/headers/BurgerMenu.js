import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const BurgerMenu = (props) => {
	const { navbarState, handleNavbar } = props;
	return (
		<Wrapper onClick={handleNavbar}>
			<div className={navbarState ? 'open' : null}>
				<span>&nbsp;</span>
				<span>&nbsp;</span>
				<span>&nbsp;</span>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	${tw`relative cursor-pointer block py-3 block lg:hidden`}

	& span {
		${tw`bg-white block relative w-6 h-1 mb-1 transform transition-all duration-300 ease-in-out`}
	}

	.open span:nth-child(2) {
		${tw`opacity-0`}
	}

	.open span:nth-child(3) {
		top: -11px;
		${tw`rotate-45`}
	}

	.open span:nth-child(1) {
		top: 6px;
		${tw`-rotate-45`}
	}
`;

export default BurgerMenu;
