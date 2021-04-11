import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';
import { FaSnapchat } from "react-icons/fa";
import {fetchNotificationsAction} from './actions';

const notificationsRef = db.collection('notifications')

export const fetchNotifications = () => {
return async (dispatch) => {
 notificationsRef.orderBy('updated_at', 'desc').get()
   .then(snapshots => {
      const notificationList = []
      snapshots.forEach(snapshot => {
         const notification = snapshot.data();
         notificationList.push(notification)
      })
      dispatch(fetchNotificationsAction(notificationList))
   })
  }
};

export const saveNotification = ({subject,text,type}) => {
    return async (dispatch) => {
      const timestamp = FirebaseTimestamp.now()
  
      const data = {
        text: text,
        type: type,
        subject: subject,
        updated_at: timestamp,
      }

//   if (id === "") {
    const ref = notificationsRef.doc();
    const id = ref.id;
    data.id = id
    data.created_at = timestamp
// }


      return notificationsRef.doc(id).set(data)
      .then(()=>{
          dispatch(push('/'))
      }).catch((error) => {
          throw new Error(error)
      })
    }
  }