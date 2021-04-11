import React,{Suspense, lazy} from 'react';
const Image = lazy(() => import('https://placehold.jp/150x150.png'));

const Load = () => {
 return(
  <div>
    <Suspense fallback={<h1>ローディング中</h1>} >
        <Image />
    </Suspense>
  </div> 
 )
}

export default Load;
