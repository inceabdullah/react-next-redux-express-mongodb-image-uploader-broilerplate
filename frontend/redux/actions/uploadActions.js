import axios from "axios";
//Action Types
import * as uploadKeys from "../keys/uploadKeys";



//Action Creator
export const upload = (imagefile) => dispatch => {
    const name = imagefile.file.name;
    const type = imagefile.file.type;
    imagefile.file = {name, type};

    dispatch({
        type: uploadKeys.UPLOAD_PENDING,
    });
    axios.post("/upload", {imagefile})
        .then(res=>{
            dispatch({
                type: uploadKeys.UPLOAD_DONE,
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch({
                type: uploadKeys.UPLOAD_REJECTED,
                payload: err
            });
        });
};
