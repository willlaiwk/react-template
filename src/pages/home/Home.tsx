import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

type HomeProps = RouteComponentProps;

export const Home: React.FC<HomeProps> = () => (
  <div>
    <h1>Home</h1>
    <div>
      <Link to="/users">To user page</Link>
    </div>
    <div>
      <Link to="/product">To Product page</Link>
    </div>
  </div>
);
