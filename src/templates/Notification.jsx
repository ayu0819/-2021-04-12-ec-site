import React, {useEffect} from 'react';
import styled from 'styled-components';
import {NotificationChip} from '../components/User';
import {useDispatch, useSelector} from "react-redux";
import {UserMenus,UserEditButton} from '../components/User';
import {fetchNotifications} from "../reducks/Notification/operations";
import {getNotifications} from "../reducks/Notification/selectors";

const media = {
  sp: '@media(max-width: 650px)'
}

const Container = styled.div`
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  margin: 0 auto;
  max-width: 1080px;
`;

const Sidebar = styled.aside`
  width: 300px;
  ${media.sp} {
        display: none;
   }
`;

const Main = styled.main`
  width: calc(100% - 300px);
  p {
    padding:0;
  }
  ${media.sp} {
      width: 100%;
      padding: 0 1em;
   }
`;

const Chips = styled.main`
  padding-top: 1em;
`;

const CenterSpacer = styled.div`
 margin: 0 1em;
 ${media.sp} {
      display: none;
   }
`;

const BackStyle = styled.div`
 text-align: center;
 padding: 1em;
 background-color:  #efefef;
 border-radius: 1em;
 width: 100%;
 margin: 1em 0;
 span {
   font-weight: bold;
 }
`;

const MbMenu = styled.div`
 display: none;
 ${media.sp} {
      display: block;
   }
`;

const Notification = () => {
    const dispatch = useDispatch()
    const selector = useSelector(state => state);
    const notifications = getNotifications(selector)
 
    useEffect(() => {
        dispatch(fetchNotifications());
    },[])

    return (
      <div className="common__item">
      <div className="common__center">
      <Container>
     <Sidebar >
        <UserMenus />
     </Sidebar>
     <CenterSpacer />
     <Main>
     <h2>通知</h2>
        <Chips>
          {notifications.length > 0 && (
            notifications.map(notification => (
              <NotificationChip
               key={notification.id} id={notification.id} text={notification.text} subject={notification.subject}
              />
            ))
          )}
        </Chips>
      <Chips>
      </Chips>
   </Main>
 </Container>
 <MbMenu>
<UserMenus />
</MbMenu>
      </div>
     </div>
    );
};

export default Notification;














