import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Truncate from 'react-truncate';
 
class ReadMore extends Component {
    constructor(...args) {
        super(...args);
 
        this.state = {
            expanded: false,
            truncated: false
        };
    }
 
    handleTruncate = (truncated) => {
        if (this.state.truncated !== truncated) {
            this.setState({
                truncated
            });
        }
    }
 
    toggleLines = (event) =>{
        event.preventDefault();
 
        this.setState({
            expanded: !this.state.expanded
        });
    }
 
    render() {
        const {
            children,
            more,
            less,
            lines 
        } = this.props;
 
        const {
            expanded,
            truncated 
        } = this.state;
 
        return (
            <div>
                <Truncate
                    lines={!expanded && lines}
                    ellipsis={(
                        <span className="pointer text-primary" onClick={this.toggleLines}>... {more}</span>
                    )}
                    onTruncate={this.handleTruncate}
                >
                    {children}
                </Truncate>
                {!truncated && expanded && (
                    <div className="pointer text-primary mb-3" onClick={this.toggleLines}>{less}</div>
                )}
            </div>
        );
    }
}
 
ReadMore.defaultProps = {
    lines: 5,
    more: 'Read more',
    less: 'Show less'
};
 
ReadMore.propTypes = {
    children: PropTypes.node.isRequired,
    lines: PropTypes.number,
    less: PropTypes.string,
    more: PropTypes.string
};
 
export default ReadMore;