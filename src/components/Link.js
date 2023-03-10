import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

function Link(props) {
  return <RouterLink {...props} className="custom-link" />;
}

export default Link;
