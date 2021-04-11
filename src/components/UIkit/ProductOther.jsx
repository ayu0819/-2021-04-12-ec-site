import React, {useState,useCallback} from 'react'
import {ProductInput} from '../../components/UIkit';
import * as CgIcons from "react-icons/cg";
import * as GrIcons from "react-icons/gr";
import styled from 'styled-components';

const Item = styled.div`
display:flex;
align-items:center;
justify-content: center;
`;

const Button = styled.button`
margin: 0 auto;
padding:1em;
`;

const Center = styled.div`
text-align:center;
`;

const ProductOther = (props) => { 
    const [inputFields, setInputFields] = useState([
        { firstName: '',lastName: ''},
    ]);
    const [firstName, setFirstName] = useState(0);
    const [lastName, setLastName] = useState(0);

    const inputFirstName = useCallback((event) => {
        setFirstName(event.target.value)
    }, [setFirstName]);

    const inputLastName = useCallback((event) => {
        setLastName(event.target.value)
    }, [setLastName]);

    // エラー関数処理
    const handleSubmit = (e) => {
        // console.log に入力された値を出力する
        e.preventDefault(); 
        console.log("InputFields", inputFields);
    };

    const handleChangeInput = (index,event) => {
       console.log(index,event.target.name);
    //    入力フィールドの追加
    const values = [...inputFields];
    values[index][event.target.name] = event.target.value;
    setInputFields(values);
    }

    // index を追加する関数
    const handleAddFields = () => {
        // 取得したい フォールド
        setInputFields([...inputFields, { firstName: '', lastName: '' }])
    }

        // index を削除する関数
    const handleRemoveFields = (index) => {
        const values = [...inputFields]
        values.splice(index,1);
        setInputFields(values);
    }

    return(
    <div>
        {/* 送信の処理 onSubmit onClick で呼び出せる */}
        <form onSubmit={handleSubmit}>
            { inputFields.map((inputField, index) => (
                <Item key={index}>
                    <ProductInput
                    label={"自由項目"}
                    placeholder={"入力してください"}
                    type={"text"}
                    required={true}
                    name={"firstName"}
                    id={"firstName"}
                    className={"firstName"}
                    autocomplete={"off"}
                    value={inputField.firstName,firstName}
                    onChange={event => handleChangeInput(index,event),inputFirstName}
                    />
                    
                    <ProductInput
                    label={"個数"}
                    placeholder={"入力してください"}
                    type={"text"}
                    required={true}
                    name={"lastName"}
                    id={"lastName"}
                    className={"lastName"}
                    autocomplete={"off"}
                    value={inputField.lastName,lastName}
                    onChange={event => handleChangeInput(index,event),inputLastName}
                    />
                    <CgIcons.CgRemove className="InputIcon" onClick={(index) => handleRemoveFields()}/>
                    <GrIcons.GrAddCircle className="InputIcon" onClick={() => handleAddFields()} />
                </Item>
            )) }
        </form>
      <Center>
      <Button onClick={handleSubmit}>追加する</Button>
      </Center>
    </div>
    )
   
}

export default ProductOther;


