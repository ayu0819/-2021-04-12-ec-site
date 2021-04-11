// import React, { useEffect,useState } from 'react';
// // a

// const Loading = () => {

//     const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(null);
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         fetch("https://reqres.in/api/users?page=2")
//         .then((res) => res.json())
//         .then(
//             (result) => {
//                 setIsLoaded(false);
//                 setUser(result,data)
//             },
//             (error) => {
//                 setIsLoaded(false);
//                 setError(error);
//             }
//         );
//     }, []);
 
//  return(
//      <div>
//     <p>Hallo, Ich bin Ayu.</p>
//      </div>
//  )
// }

// export default Loading;
