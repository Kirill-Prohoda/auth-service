import React, { FC } from 'react';
import Header from '../../components/header/Header';
import st from './menuLayout.module.scss';

interface IMenuLayout {
  children?: React.ReactNode;
}

const MenuLayout: FC<IMenuLayout> = props => {
  const { children } = props;

  return (
    <div className={st.container}>
      <div className={st.header}>
        <Header />
      </div>
      <div className={st.main}>{children}</div>
    </div>
  );
};
export default MenuLayout;
