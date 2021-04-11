import { db, FirebaseTimestamp } from "../../firebase";
import {push} from 'connected-react-router';

const contactsRef = db.collection('contacts')

export const saveContact = ({name,type,subject,text,email}) => {
    return async (dispatch) => {
      const timestamp = FirebaseTimestamp.now()
  
      const data = {
        name: name,
        email: email,
        type: type,
        subject: subject,
        text: text,
        updated_at: timestamp,
      }

//   if (id === "") {
    const ref = contactsRef.doc();
    const id = ref.id;
    data.id = id
    data.created_at = timestamp
// }


      return contactsRef.doc(id).set(data)
      .then(()=>{
          dispatch(push('/'))
      }).catch((error) => {
          throw new Error(error)
      })
    }
  }