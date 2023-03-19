import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

function HOME(props){

    useEffect(()=>{
        if(props.collapsed != props.flg){
            props.collapseSidebar()
        }
    },[props.flg])

    return(
        <div>
            <div>HOME</div>
            <p>ここは、ポプおじのポプおじによるポプおじのためのワンサイトページ集です</p>
            <p>暇な人は見ていってね❤︎</p> 
        </div>
           
    )
}

export default HOME;