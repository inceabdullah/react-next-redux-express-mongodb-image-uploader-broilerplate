import Head from 'next/head'
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import ImageUploading from 'react-images-uploading';
import {connect} from "react-redux";
import actions from '../redux/actions';


function Upload(props) {
  const {
    upload,
    uploadState
  } = props;
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;

  useEffect(()=>{
    console.log({uploadState, images});
    if (images[0]){
      const buff = Buffer.from(images[0].data_url.split("base64,")[1], "base64");
      console.log({buff});
    }

  }, [ props, images ]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
    upload(imageList[0]);
  };

  return (<>
  <head></head>
    <div>
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: 'red' } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove all images</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <div style={{
                  width: "100%",
                  display: "flex"
                }}>
                  <img src={image['data_url']} alt="" width="100" />
                  <p>{uploadState.pending ? "Uploading..." : (!uploadState.rejected ? (<a target={"_blank"} href={"/show/" + uploadState.data._id}>Show</a>) : uploadState.error)}</p>
                </div>
                
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  </>)
}

const mapState = (state) => {
  return {
    uploadState: state.upload
  };
};

const mapDis = {
  upload: (val) => actions.uploadActions.upload(val)
};

export default connect(mapState, mapDis)(Upload);

