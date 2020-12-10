import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import 'style/section.scss';

const Section = props => {
  if (!props.isHidden) {
    return (
      <section className={clsx(
        props.padding ? props.padding : '',
        props.divider ? 'divider' : '',
        props.klass ? props.klass : ''
      )}>
        {props.header && (
          <div className="section-header">
            {props.header}
            {props.link && <Link to={props.link}>View All</Link>}
          </div>
        )}

        {props.children}
      </section>
    );
  } else {
    return null;
  }
};

export default Section;
