import React from 'react';
import loader from './../../assets/loader.gif';
import st from './loader.module.scss';

const Loader = () => {
  return (
    <div className={st.loader}>
      <img src={loader} alt={'loader'} className={st.svg} />
    </div>
  );
};
export default Loader;
