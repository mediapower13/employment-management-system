import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  title, 
  children, 
  className = '', 
  headerAction = null,
  footer = null 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerAction: PropTypes.node,
  footer: PropTypes.node
};

export default Card;
