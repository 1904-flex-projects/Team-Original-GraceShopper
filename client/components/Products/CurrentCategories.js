import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORY_LINK, CATEGORY_CONTAINER } from './Styles';

const CurrentCategories = props => {
  const { currentCategories, location, nextPcLevel } = props;
  return (
    <div style={{ lineHeight: '2.5' }}>
      <ul className="nav bg-primary justify-content-center">
        {currentCategories.map((category, idx) => {
          // generate url for each category'
          const catId = category[`pcid${nextPcLevel}`];
          if (!catId) return <div className="nav-item">&nbsp;</div>;
          const pcLink = location.pathname + '/' + catId;
          return (
            <li key={idx} className="nav-item">
              <Link to={pcLink} style={CATEGORY_LINK}>
                <button className="btn btn-primary">
                  {category[`name${nextPcLevel}`]}
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>

    // <div style={CATEGORY_CONTAINER}>
    //   {currentCategories.map((category, idx) => {
    //     // generate url for each category'
    //     const catId = category[`pcid${nextPcLevel}`];
    //     const pcLink = location.pathname + '/' + catId;
    //     return (
    //       <Link key={idx} to={pcLink} style={CATEGORY_LINK}>
    //         {category[`name${nextPcLevel}`]}
    //       </Link>
    //     );
    //   })}
    // </div>
  );
};

export default CurrentCategories;
