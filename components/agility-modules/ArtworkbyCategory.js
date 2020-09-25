import React from 'react';
import tw, { theme } from 'twin.macro';
import styled from 'styled-components';
import agility from '@agility/content-fetch';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';

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
const HeroExcerpt = tw.div`md:col-span-3 lg:col-span-2 font-semibold tracking-wide`;

//artwork portfolio Wrapper
const ArtworkPortfolio = tw.article`grid grid-cols-1 md:grid-cols-4 gap-8 p-8`;

const ThumbnailWrapper = tw.div`w-full`;

//artwork thumbnails
const Thumbnails = styled.div`
    ${tw`hidden md:grid gap-4 md:col-span-1 grid-cols-2 sticky top-0`}
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

//artwork content wrapper
const ArtContentWrapper = tw.div`col-span-3 md:col-span-3 gap-4`;

//artwork content

const PortfolioWrapper = styled.article`
    ${tw`flex flex-no-wrap`}

    &:not(:first-of-type) {
        ${tw`mt-8`}
    }
`;

const PortfolioImg = styled.div`
    ${tw`w-full md:max-w-2/3`}
    img {
        ${tw`w-full`}
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

const ArtworkbyCategory = (props) => {
    const { contentID, fields, customData, page } = props;

    const {
        title,
        categoryContent,
        backgroundImage,
        categoryExcerpt,
    } = fields.selectCategory.fields;

    const {
        artworks: { items },
    } = customData;

    console.log(items);

    //console.log(_.get(fields, 'selectCategory.fields'));

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
                {categoryExcerpt && (
                    <HeroExcerpt>
                        {ReactHtmlParser(categoryExcerpt)}
                    </HeroExcerpt>
                )}
            </HeroWrapper>
            <ArtworkPortfolio>
                <ThumbnailWrapper>
                    <Thumbnails>
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
                                        <a id={contentID}>
                                            <img
                                                src={url}
                                                alt={
                                                    label
                                                        ? label
                                                        : 'Scroll to artwork'
                                                }
                                            />
                                        </a>
                                    </Thumbnail>
                                );
                            }
                        })}
                    </Thumbnails>
                </ThumbnailWrapper>

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

                        if (url) {
                            return (
                                <PortfolioWrapper key={contentID}>
                                    <PortfolioImg>
                                        <img
                                            src={url}
                                            alt={
                                                label
                                                    ? label
                                                    : 'Scroll to artwork'
                                            }
                                        />
                                    </PortfolioImg>
                                    <PortfolioMeta>
                                        <PortfolioHeading>
                                            <div className="portfolioHeading__title">
                                                {title}
                                            </div>
                                            <div className="portfolioHeading__year">
                                                {year}
                                            </div>
                                        </PortfolioHeading>
                                    </PortfolioMeta>
                                </PortfolioWrapper>
                            );
                        }
                    })}
                </ArtContentWrapper>
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
