import React from 'react';

const HeaderMenus = (props) => {
 return(
<div className="common__center">
  <div onClick={(event) => props.handleDrawerToggle(event)}>
      <i>アイコン</i>
  </div>
  </div>
 )
}

export default HeaderMenus;