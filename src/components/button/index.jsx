import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getLink } from '../../../utils';
import './index.scss';

const propTypes = {
  type: PropTypes.oneOf(['primary', 'normal']),
  link: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.oneOf(['gitee', 'github']),
};
const defaultProps = {
  type: 'primary',
  link: '',
  target: '_self',
  icon: undefined,
};
const icons = {
  gitee: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.4C6.15 1.4 1.4 6.15 1.4 12S6.15 22.6 12 22.6 22.6 17.85 22.6 12 17.85 1.4 12 1.4Zm5.52 8.88h-6.36c-.46 0-.84.38-.84.84v1.76c0 .46.38.84.84.84h3.72c.46 0 .84.38.84.84v.64c0 .46-.38.84-.84.84H8.56a.84.84 0 0 1-.84-.84V8.8c0-.46.38-.84.84-.84h8.96c.46 0 .84.38.84.84v.64c0 .46-.38.84-.84.84Z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12c0 4.65 3.02 8.58 7.22 9.98.53.1.72-.23.72-.51v-1.86c-2.94.64-3.56-1.24-3.56-1.24-.48-1.22-1.17-1.55-1.17-1.55-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.46 1.15 3.06.88.1-.68.37-1.15.67-1.41-2.35-.27-4.82-1.18-4.82-5.23 0-1.16.41-2.1 1.09-2.84-.11-.27-.47-1.35.1-2.8 0 0 .89-.28 2.9 1.08.85-.24 1.75-.36 2.65-.36.9 0 1.8.12 2.65.36 2.01-1.36 2.9-1.08 2.9-1.08.57 1.45.21 2.53.1 2.8.68.74 1.09 1.68 1.09 2.84 0 4.06-2.48 4.96-4.84 5.22.38.33.72.98.72 1.97v2.77c0 .28.19.61.73.51A10.52 10.52 0 0 0 22.5 12C22.5 6.2 17.8 1.5 12 1.5Z" />
    </svg>
  ),
};
const Button = props => (
    <a
      className={
        classnames({
          button: true,
          [`button-${props.type}`]: true,
          'button-with-icon': props.icon,
        })
      }
      target={props.target || '_self'}
      href={getLink(props.link)}
    >
      {props.icon && <span className={`button-icon button-icon-${props.icon}`}>{icons[props.icon]}</span>}
      {props.children}
    </a>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
