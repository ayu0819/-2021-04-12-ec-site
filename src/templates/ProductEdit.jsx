import React,{useCallback,useEffect,useState,useRef} from 'react';
import {TextInput,SelectBox,TextArea,PrimaryButton } from '../components/UIkit';
import styled from 'styled-components';
import {useDispatch} from 'react-redux';
import {saveProduct} from '../reducks/products/operations';
import {ImageArea,SetSizesArea} from '../components/Products';
import { db } from '../firebase';

const Item = styled.div`
    margin: 3em 0;
`;

const ProductEdit = () => {
    const dispatch = useDispatch();

    // ----------------------------------
    // DBデータ 出力 (URLからidを取得する)
    // ----------------------------------
    let id = window.location.pathname.split('/product/edit') [1];
    console.log("Before split /", id)
    
    if(id !== "") {
        id = id.split('/')[1]
        console.log("After split /",id);
    }

    const [description, setDescription] = useState(""),
          [name, setName] = useState(""),
          [images, setImages] = useState([]),
          [price, setPrice] = useState(""),
          [sizes, setSizes] = useState([]),
          [categories, setCategories] = useState([]),
          [category, setCategory] = useState(""),
          [state, setState] = useState(""),
          [shippingFee, setShippingFee] = useState(""),
          [shippingMethod, setShippingMethod] = useState(""),
          [shippingDay, setShippingDay] = useState(""),
          [shippingArea, setShippingArea] = useState("");
          

    const inputDescription = useCallback((event) => {
        setDescription(event.target.value)
    },[setDescription]);

    const inputName = useCallback((event) => {
        setName(event.target.value)
    },[setName]);

     const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    },[setPrice]);

    const states =  [
        {id: "select1", name: '選択してください'},
        {id: "新品・未使用", name: '新品・未使用'},
        {id: "未使用に近い", name: '未使用に近い'},
        {id: "立った外傷なし", name: '目立った外傷なし'},
        {id: "やや汚れあり", name: 'やや汚れあり'},
        {id: "傷・汚れあり", name: '傷・汚れあり'},
        {id: "全体的に状態が悪い", name: '全体的に状態が悪い'}
    ];

    const shippingFees =  [
        {id: "選択してください", name: '選択してください'},
        {id: "送料込み(出品者負担)", name: '送料込み(出品者負担)'},
        {id: "着払い(購入者が負担)", name: '着払い(購入者が負担)'}
    ];

    const shippingMethods =  [
        {id: "select3", name: '選択してください'},
        {id: "レターパックライト", name: 'レターパックライト'},
        {id: "レターパックプラス", name: 'レターパックプラス'},
        {id: "クイックポスト", name: 'クイックポスト'},
        {id: "宅急便コンパクト", name: '宅急便コンパクト'},
        {id: "ゆうパック元払い", name: 'ゆうパック元払い'},
        {id: "ヤマト宅急便", name: 'ヤマト宅急便'},
        {id: "ゆうパケット", name: 'ゆうパケット'},
        {id: "ゆうメール元払い", name: 'ゆうメール元払い'},
        {id: "スマートレター", name: 'スマートレター'},
        {id: "普通郵便", name: '普通郵便'},
        {id: "ヤマト便", name: 'ヤマト便'},
    ];

    const shippingDays =  [
        {id: "select4", name: '選択してください'},
        {id: "支払い後、1~2日後", name: '支払い後、1~2日後'},
        {id: "支払い後、2~3日後", name: '支払い後、2~3日後'},
        {id: "支払い後、4~7日後", name: '支払い後、4~7日後'}
    ];

    const shippingAreas  =  [
        {id: "select5", name: '選択してください'},
        {id: "北海道", name: '北海道'},
        {id: "青森県", name: '青森県'},
        {id: "岩手県", name: '岩手県'},
        {id: "宮城県", name: '宮城県'},
        {id: "秋田県", name: '秋田県'},
        {id: "山形県", name: '山形県'},
        {id: "福島県", name: '福島県'},
        {id: "茨城県", name: '茨城県'},
        {id: "栃木県", name: '栃木県'},
        {id: "群馬県", name: '群馬県'},
        {id: "埼玉県", name: '埼玉県'},
        {id: "千葉県", name: '千葉県'},
        {id: "東京都", name: '東京都'},
        {id: "神奈川県", name: '神奈川県'},
        {id: "新潟県", name: '新潟県'},
        {id: "富山県", name: '富山県'},
        {id: "石川県", name: '石川県'},
        {id: "福井県", name: '福井県'},
        {id: "山梨県", name: '山梨県'},
        {id: "長野県", name: '長野県'},
        {id: "岐阜県", name: '岐阜県'},
        {id: "静岡県a", name: '静岡県'},
        {id: "愛知県", name: '愛知県'},
        {id: "三重県", name: '三重県'},
        {id: "滋賀県", name: '滋賀県'},
        {id: "京都府", name: '京都府'},
        {id: "大阪府", name: '大阪府'},
        {id: "兵庫県", name: '兵庫県'},
        {id: "奈良県", name: '奈良県'},
        {id: "和歌山県", name: '和歌山県'},
        {id: "鳥取県", name: '鳥取県'},
        {id: "島根県", name: '島根県'},
        {id: "岡山県", name: '岡山県'},
        {id: "広島県", name: '広島県'},
        {id: "山口県", name: '山口県'},
        {id: "徳島県", name: '徳島県'},
        {id: "香川県", name: '香川県'},
        {id: "愛媛県", name: '愛媛県'},
        {id: "高知県", name: '高知県'},
        {id: "福岡県", name: '福岡県'},
        {id: "佐賀県", name: '佐賀県'},
        {id: "長崎県", name: '長崎県'},
        {id: "熊本県", name: '熊本県'},
        {id: "大分県", name: '大分県'},
        {id: "宮崎県", name: '宮崎県'},
        {id: "鹿児島県", name: '鹿児島県'},
        {id: "沖縄県", name: '沖縄県'}
    ];

    // ----------------------------------
    // categories コレクション 
    // ----------------------------------
 useEffect(() => {
    db.collection('categories')
    .orderBy('order','asc')
    .get()
    .then(snapshots => {
      const list = []
      snapshots.forEach(snapshot => {
       const data = snapshot.data()
       console.log(data)
       list.push({
         id: data.id,
         name: data.name
       })
      })
      setCategories(list)
    })
  }, []);

  useEffect(() => {
    if (id !== "") {
      db.collection('products').doc(id).get()
        .then(snapshot => {
            const data = snapshot.data();
            setImages(data.images);
            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setSizes(data.sizes); 
            setCategory(data.category);
            setState(data.state);
            setShippingFee(data.shippingFee);
            setShippingMethod(data.shippingMethod);
            setShippingDay(data.shippingDay);
            setShippingArea(data.shippingArea);
        })
    }
}, [id])

    // ----------------------------------
    // input number
    // ----------------------------------
    // const inputRef = useRef.current.blur();

 return(
     <div className="common__item">
   <div className="common__center">
       <h2>商品登録</h2>
       <Item>
       <ImageArea images={images} setImages={setImages} />
       </Item>
      <Item>
      <TextInput
      label={"商品名"}
      placeholder={"入力してください"}
      type={"text"}
      required={true}
      name={"name"}
      id={"name"}
      className={"name"}
      autocomplete={"off"}
      value={name}
      onChange={inputName}
     />

     <TextArea onChange={inputDescription} value={description} label={'商品説明'} />

    <TextInput
      label={"商品価格"}
      placeholder={"入力してください"}
      type={"number"}
      required={true}
      name={"price"}
      id={"price"}
      className={"price"}
      autocomplete={"off"}
      value={price}
      onChange={inputPrice}
     />  
     <hr />
     <SetSizesArea sizes={sizes} setSizes={setSizes}/>
      </Item>   
     <hr />
     <Item>
     <SelectBox 
     name={"category"}
     id={"category"}
     label={"カテゴリー"}
     options={categories}
     select={setCategory}
     value={category}
     />
     <SelectBox 
     name={"state"}
     id={"state"}
     label={"商品の状態"}
     options={states}
     select={setState}
     value={state}
     />
     </Item>
     <hr />
    <Item>
    
    <SelectBox 
     name={"shippingFee"}
     id={"shippingFee"}
     label={"配送料の負担"}
     options={shippingFees}
     select={setShippingFee}
     value={shippingFee}
     />
     <SelectBox 
     name={"shippingMethod"}
     id={"shippingMethod"}
     label={"配送方法"}
     options={shippingMethods}
     select={setShippingMethod}
     value={shippingMethod}
     />
    <SelectBox 
     name={"shippingDay"}
     id={"shippingDay"}
     label={"配送日の目安"}
     options={shippingDays}
     select={setShippingDay}
     value={shippingDay}
     />
<SelectBox 
     name={"shippingArea"}
     id={"shippingArea"}
     label={"配送日地域"}
     options={shippingAreas}
     select={setShippingArea}
     value={shippingArea}
     /> 
     </Item>
<PrimaryButton 
      style={'primary__red'} onClick={() => dispatch(saveProduct({
        id: id,
        name: name,
        description: description,
        state: state,
        category: category,
        shippingFee: shippingFee,
        shippingMethod: shippingMethod,
        shippingDay: shippingDay,
        shippingArea: shippingArea,
        images: images,
        price: price,
        sizes: sizes,
        }))} label={'商品情報を保存'}
     />
   </div>
   </div>
 )
}

export default ProductEdit;



