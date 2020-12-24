import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import tw from 'twin.macro';
import ReactHtmlParser from 'react-html-parser';

const MetaBlockWrapper = styled.div`
	.metaBlock__inner {
		${tw`flex flex-wrap md:ml-4`}

		&:not(:first-of-type) {
			${tw`mt-4`}
		}
	}
	.metaBlock__title {
		${tw`flex-auto w-full md:w-full xl:flex-initial text-secondary-accent font-semibold`}
	}

	.metaBlock__desc {
		${tw`flex-auto md:max-w-full pl-8`}
	}
`;

const MetaBlock = ({ data }) => {
	return (
		<MetaBlockWrapper>
			{data.map((item, index) => {
				if (!item.body || !item.title) {
					return;
				}
				return (
					<div className="metaBlock__inner" key={index}>
						<div className="metaBlock__title">{item.title}</div>

						<div className="metaBlock__desc">
							{ReactHtmlParser(item.body)}
						</div>
					</div>
				);
			})}
		</MetaBlockWrapper>
	);
};

MetaBlock.propTypes = {
	data: PropTypes.array.isRequired,
};

export default MetaBlock;
