import React from 'react';
import styled from 'styled-components';

const media = {
    sp: '@media(max-width: 650px)'
}

const Footer = styled.div`
    padding: 2.5em 0;
    background-color: rgb(34, 34, 34);
    width: 100%;
    display: flex;
    justify-content:cursor;
    li {
        color: #fff;
    }
    li a {
        color: #fff;
    }
`;

const Size = styled.div`
margin: 0 auto;
padding: 1em;
width: 1100px;
`;

const Flex = styled.div`
   display: flex;
   justify-content: space-around;
   flex-wrap : wrap;
   ul {
       text-align:left;
       ${media.sp} {
        width: 130px;
   }
   }
`;

const FooterLink = () => {

 return(
     <Footer>
        <Size>
         <Flex>
         <ul>
             <li><strong>サービスについて</strong></li>
             <li><a href="#">会社概要 (運営会社)</a></li>
             <li><a href="#">採用情報</a></li>
             <li><a href="#">プレリリース</a></li>
             <li><a href="#">公式ブログ</a></li>
             <li><a href="#">ロゴのガイドライン</a></li>
         </ul>

         <ul>
             <li><strong>各種情報</strong></li>
             <li><a href="#">ガイドライン</a></li>
             <li><a href="#">商品安全への取り組み</a></li>
         </ul>

         <ul>
             <li><strong>プライバシーと利用規約</strong></li>
             <li><a href="#">プライバシーポリシー</a></li>
             <li><a href="#">利用規約</a></li>
             <li><a href="#">コンプライアンスポリシー</a></li>
             <li><a href="#">個人データの安全管理について</a></li>
             <li><a href="#">特定商取引に関する表記</a></li>
             <li><a href="#">資金決済法に基づく表示</a></li>
             <li><a href="#">法令遵守と犯罪防止のために</a></li>
         </ul>
         </Flex>
     </Size>
     </Footer>
 )
}

export default FooterLink;
