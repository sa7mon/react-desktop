import React, { Component, PropTypes } from 'react';
import DesktopComponent, { Padding, Margin, Background, Alignment } from '../../../desktopComponent';
import Title from './title/title';
import Content from './content/content';
import styles from '../style/windows10';
import { StyleRoot } from 'radium';

@DesktopComponent(Padding, Margin, Background, Alignment)
class Item extends Component {
  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.array]),
    push: PropTypes.bool,
    onSelect: PropTypes.func,
    selected: PropTypes.bool,
    paneTheme: PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      prevTitle: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.title !== nextProps.title) {
      this.setState({ prevTitle: this.props.title });
    }
  }

  render() {
    const { children, title, paneTheme, ...props } = this.props;

    delete props.icon;
    delete props.push;
    delete props.onSelect;
    delete props.selected;

    return (
      <div
        style={styles.navPaneItem}
      >
        <div style={styles.contentWrapper}>
          <StyleRoot>
            <Title
              key={title}
              title={title}
              theme={paneTheme}
              prevTitle={this.state.prevTitle}
            />
          </StyleRoot>
          <Content
            content={children}
            {...props}
          />
        </div>
      </div>
    );
  }
}

export default Item;
