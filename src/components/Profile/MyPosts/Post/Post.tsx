import React from 'react';
import classes from "./Post.module.css"

type postPropsType = {
        message: string
        likesCount:number
}

const Post = (props: postPropsType) => {
    return (
        <div className={classes.item}>
            <img
                src="https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/100x64_3"/>
            {props.message}
            <div>
                <span>{props.likesCount} ❤</span>
            </div>
        </div>
    );
};

export default Post;