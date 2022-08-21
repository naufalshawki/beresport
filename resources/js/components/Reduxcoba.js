import React from 'react';
import {useSelector} from 'react-redux';

function Reduxcoba(){
  const logged = useSelector(state => state.isLogged);
  console.log(logged)
  return(
    <>
    <h1>{logged ? 'mantap' : 'mantapfalse'}</h1>
    </>
  )
}

export default Reduxcoba;
