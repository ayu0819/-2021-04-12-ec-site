import React, {useState,useCallback} from 'react';
import {storage} from '../../firebase';
import * as RiIcons from "react-icons/ri";
import ImagePre from '../Products/ImagePre';
import styled,{css} from 'styled-components';

const Images = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    img {
        margin: 0 0.6em 1em 0.6em;
    }
`;

const TextArea = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    transition: all ease-out .3s;
    :hover {
        color: #ea352d;
        transition: all ease-out .3s;
    }
    p {
        padding-right: 0.8em;
    }
`;

const DropBox = styled.div`
 input {
     position:absolute;
     height: 1px;
     width: 1px;
     overflow: hidden;
     clip: rect(1px, 1px, 1px, 1px);
     opacity: 0;
 }
 label{
     display: flex;
    width: 300px;
 height: 200px;
 border: #ccc 2px dotted;
 margin: 20px;
 align-items: center;
 justify-content: center;
 cursor: pointer;
 ${({dragEnter}) => dragEnter && css`
 border-color: #666;
 `}
 }
`;

const ImageUp = (props) => {
    
    // -----------------
    // uploadImage
    // -----------------
    const [dragEnter, setDragEnter] = useState(false);

    const handleDragEnter = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(true);
    }

    const handleDragOver = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(true);
    }

    const handleDragLeave = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDragEnter(false);
    }

    const handleDrop = useCallback((e) => {
        const file = e.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });

        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImages((prevState => [...prevState, newImage]))
            });
        })
    }, [props.setImages])

    // 画像アップロード機能の作成
    const uploadImage = useCallback((e) => {
        const file = e.target.files;
        let blob = new Blob(file, { type: "image/jpeg" });

        const S="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N=16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

        const uploadRef = storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadTask.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImages((prevState => [...prevState, newImage]))
            });
        })
    }, [props.setImages])

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？');
        if (!ret) {
            return false
        } else {
            const newImages = props.images.filter(image => image.id !== id)
            props.setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    }, [props.images]);

    return (
        <>
        <Images>
                 {props.images.length > 0 && (
                 props.images.map(image => <ImagePre delete={deleteImage} id={image.id} path={image.path} key={image.id} />)
             )}
             </Images>
             <DropBox>
             <TextArea>
          <p><span>商品画像を登録する</span></p>
          <label
           dragEnter={dragEnter} 
           htmlFor="images-upload"
           onDragEnter={handleDragEnter}
           onDragLeave={handleDragLeave}
           onDragOver={handleDragOver}
           onDrop={(e) => handleDrop(e)}
          >
          <RiIcons.RiImageAddFill className="add__Image" />
          <input className="icon-hide" 
          type="file"
           multiple
           name="images-upload"
          id="images-upload"
           onChange={(e) => uploadImage(e)}
                  />
          </label>
          </TextArea>
        </DropBox>
        </>
    );
};

export default ImageUp;














