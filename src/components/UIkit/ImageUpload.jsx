import React, {useState,useCallback} from 'react'
import {storage} from '../../firebase';
import {useDropzone} from 'react-dropzone'
import ImagePreview from '../Products/ImagePreview';
import styled from 'styled-components';
import * as BiIcons from "react-icons/bi";

const Images = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    img {
        margin: 0 0.6em 1em 0.6em;
        width: 250px;
        height: 250px;
        object-fit: cover; 
        border-radius: 1em;
    }
`;

const ImageArea = styled.div`
    background-color: #f5f5f5;
    border-radius: 1em;
    padding: 3em 0;
    p {
        padding: 0;
    }
`;

const ImageUpload = (props) => { 
     // -----------------
    // deleteImage
    // -----------------
    // 引数 として 画像id をもつ
    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？');
        // false にしたら処理は行わない
        if (!ret) {
            return false
        // それ以外ならば、.filter() を使用して、選択した 画像id 以外を抽出する newImage定数 を作成
        } else {
            const newImages = props.images.filter(image => image.id !== id)
            // props.setImage に newImage は再配列にする
            props.setImages(newImages);
            // storageCloudのimagesから画像idを削除する
            return storage.ref('images').child(id).delete()
        }
    }, [props.images])


    // 画像アップロード機能の作成
    const uploadImage = useCallback((event) => {
        const file = event.target.files;
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

const [files, setFiles] = useState([]);

const {getRootProps, getInputProps} = useDropzone({
    const: "image/*",
    onDrop: (acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
        )
    }
})

const preImage = files.map((file) => (
    <div key={file.name}>
        <div>
            <img src={file.preview} style={{width: '200px'}} alt="preview"/>
        </div>
    </div>
))

    return(
        <div>
<Images>
         {/* props で渡ってきた images が 1枚以上あれば <ImagePreview /> を .map として回す  (props で pathをもつ)*/}
         {props.images.length > 0 && (
                 props.images.map(image => <ImagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id} />)
             )}
      </Images>
        <ImageArea {...getRootProps()}>
            <input {...getInputProps()} onChange={(e) => uploadImage(e)}/>
            <BiIcons.BiImageAdd className="UploadIcon" />
            <p>ここにファイルをドロップしてアップロード</p>
        </ImageArea>
        {preImage}
    </div>
    )
}

export default ImageUpload;

