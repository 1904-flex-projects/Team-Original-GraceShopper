import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LINK, CATEGORY_CONTAINER } from './Styles';

const CurrentCategories = props => {
  const { currentCategories, location, nextPcLevel } = props;
  return (
    <div style={CATEGORY_CONTAINER}>
      {currentCategories.map((category, idx) => {
        // generate url for each category'
        const catId = category[`pcid${nextPcLevel}`];
        const pcLink = location.pathname + '/' + catId;
        return (
          <Link key={idx} to={pcLink} style={CATEGORY_LINK}>
            {category[`name${nextPcLevel}`]}
          </Link>
        );
      })}
    </div>
  );
};

export default CurrentCategories;
