import React, { Component } from 'react';
import ContentZone from 'components/agility-global/ContentZone';
import tw from 'twin.macro';

//one-column inner
const OneColumnInner = tw.div`container mx-auto bg-white`;

class OneColumnTemplate extends Component {
    render() {
        return (
            <div className="one-column-template">
                <OneColumnInner>
                    <ContentZone name="MainContentZone" {...this.props} />
                </OneColumnInner>
            </div>
        );
    }
}

export default OneColumnTemplate;
