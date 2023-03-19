import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';

import './style.css'

function Marubatsu(props){

    useEffect(()=>{
        if(props.collapsed != props.flg){
            props.collapseSidebar()
        }
    },[props.flg])

    
    return(
        <MarubatsuMid/>
    )

}

function MarubatsuMid(){

    const[inline,setInline]=useState([
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]
    ]);
    const [test,setTest]=useState();
    const [turn,setTurn]=useState(0);

    let inlineArray=inline;

    //コマのクリック時の処理
    function tdClick(e){
        console.log(inline)

        //空白のますの判定
        if(inline[e.x][e.y]==0){

            if(turn==0){//先攻：○の打コン
                inlineArray[e.x][e.y]=1;
                setTurn(1);
                setInline(inlineArray);
                judge(e.x,e.y,1);
            }else{//後攻：×の打コン
                inlineArray[e.x][e.y]=-1;
                setTurn(0);
                setInline(inlineArray);
                judge(e.x,e.y,-1);
            }        
        }
    }

    //判定
    function judge(x,y,s){
        console.log('x:'+x+'y:'+y+s)

        //上下左右の確認
        if(x<4){console.log('右'+inline[x+1][y])}
        if(0<x){console.log('左'+inline[x-1][y])}
        if(0<y){console.log('上'+inline[x][y-1])}
        if(y<4){console.log('下'+inline[x][y+1])}
        if(x<4&&0<y){console.log('右上'+inline[x+1][y-1])}
        if(x<4&&y<4){console.log('右下'+inline[x+1][y+1])}
        if(0<x&&0<y){console.log('左上'+inline[x-1][y-1])}
        if(0<x&&y<4){console.log('左下'+inline[x-1][y+1])}
        
    }

    //描画
    return(
        <div>
            <table width="400" height="400">
                <tbody>
                    
                    <tr>
                        <td onClick={()=>tdClick({x:0,y:0})}>{(inline[0][0]==0)?'':(inline[0][0]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:0})}>{(inline[1][0]==0)?'':(inline[1][0]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:0})}>{(inline[2][0]==0)?'':(inline[2][0]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:0})}>{(inline[3][0]==0)?'':(inline[3][0]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:4,y:0})}>{(inline[4][0]==0)?'':(inline[4][0]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td onClick={()=>tdClick({x:0,y:1})}>{(inline[0][1]==0)?'':(inline[0][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:1})}>{(inline[1][1]==0)?'':(inline[1][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:1})}>{(inline[2][1]==0)?'':(inline[2][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:1})}>{(inline[3][1]==0)?'':(inline[3][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:4,y:1})}>{(inline[4][1]==0)?'':(inline[4][1]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td onClick={()=>tdClick({x:0,y:2})}>{(inline[0][2]==0)?'':(inline[0][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:2})}>{(inline[1][2]==0)?'':(inline[1][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:2})}>{(inline[2][2]==0)?'':(inline[2][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:2})}>{(inline[3][2]==0)?'':(inline[3][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:4,y:2})}>{(inline[4][2]==0)?'':(inline[4][2]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td onClick={()=>tdClick({x:0,y:3})}>{(inline[0][3]==0)?'':(inline[0][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:3})}>{(inline[1][3]==0)?'':(inline[1][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:3})}>{(inline[2][3]==0)?'':(inline[2][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:3})}>{(inline[3][3]==0)?'':(inline[3][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:4,y:3})}>{(inline[4][3]==0)?'':(inline[4][3]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td onClick={()=>tdClick({x:0,y:4})}>{(inline[0][4]==0)?'':(inline[0][4]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:4})}>{(inline[1][4]==0)?'':(inline[1][4]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:4})}>{(inline[2][4]==0)?'':(inline[2][4]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:4})}>{(inline[3][4]==0)?'':(inline[3][4]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:4,y:4})}>{(inline[4][4]==0)?'':(inline[4][4]==1)?'○':'×'}</td>
                    </tr>
                        
                    
                </tbody>
            </table>
                
        </div>
    )
}

export default Marubatsu;