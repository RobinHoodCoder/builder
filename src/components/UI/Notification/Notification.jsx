import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Notification.module.scss';

function Notification(props) {
  const { title, message, status } = props;
  const [key, setKey] = useState(null);

  const classes = [
    styles.notification,
    (styles[status] && styles[status]),
  ].filter(Boolean).join(' ');

  useEffect(() => {
    setKey(Math.random());
  }, [status]);

  return (
    <div key={key} className={classes}>
      <p>{title}</p>
      <p>{message}</p>
    </div>
  );
}

export default Notification;

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  status: PropTypes.string,
};
