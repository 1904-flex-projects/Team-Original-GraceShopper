import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import AllUsers from './AllUsers';
import AllProducts from './AllProducts';

import { NAV_LINK, NAV_BUTTON, NAV_BUTTON_ACTIVE } from './styles';

const Admin = props => {
  const { isAdmin, history, location } = props;
  const pathname = location.pathname;
  console.log('pathname', pathname);

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return axios
      .get('/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(() => {
        setUsers([
          'error',
          <div>
            <p>Error fetching user data</p>
          </div>,
        ]);
      });
  };

  const getProducts = () => {
    return axios
      .get('/api/products')
      .then(res => {
        setProducts(res.data);
      })
      .catch(() => {
        setProducts([
          'error',
          <div>
            <p>Error fetching user data</p>
          </div>,
        ]);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getProducts();
  }, []);

  // if (!isAdmin) {
  //   history.push('/error');
  // }

  const renderUsers = () => {
    return (
      <div>
        <h2>Users</h2>
        {users[0] === 'error' ? users[1] : <AllUsers users={users} />}
      </div>
    );
  };

  const renderProducts = () => {
    return (
      <div>
        <h2>Products</h2>
        {products[0] === 'error' ? (
          users[1]
        ) : (
          <AllProducts products={products} />
        )}
      </div>
    );
  };
  const renderInfo = pathname => {
    if (pathname === '/admin/users') {
      return renderUsers();
    } else if (pathname === '/admin/products') {
      return renderProducts();
    } else {
      return <div />;
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Admin Page</h1>
      {/* nav button for users(profiles and carts), products(delete product),   */}
      <nav
        id="admin-nav-container"
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <NavLink
          to="/admin/users"
          className={NAV_BUTTON}
          activeClassName={NAV_BUTTON_ACTIVE}
          style={NAV_LINK}
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/products"
          className={NAV_BUTTON}
          activeClassName={NAV_BUTTON_ACTIVE}
          style={NAV_LINK}
        >
          Products
        </NavLink>
      </nav>
      <div>{renderInfo(pathname)}</div>
    </div>
  );
};

const mapState = ({ currentUser: { isAdmin } }) => ({ isAdmin });
export default connect(mapState)(Admin);
