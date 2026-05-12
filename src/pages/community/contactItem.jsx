import React from 'react';
import { getLink } from '../../../utils';

class ContactItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: props.contact.img,
    };
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  onMouseOver() {
    this.setState({
      img: this.props.contact.imgHover,
    });
  }

  onMouseOut() {
    this.setState({
      img: this.props.contact.img,
    });
  }

  render() {
    const { contact } = this.props;
    const { img } = this.state;
    return (
      <a
        className="contact-item"
        href={getLink(contact.link)}
        target={contact.target || '_self'}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <img src={getLink(img)} />
        <div>{contact.title}</div>
      </a>
    );
  }
}

export default ContactItem;
