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
    const [judgeResult,setJudgeResult]=useState(false);

    let inlineArray=inline;

    useEffect(()=>{
        //console.log(judgeResult)

        //勝敗判定後に勝敗の結果を表示する
        if(judgeResult){
            alert(((turn===1)?'○':'×')+"の勝ち")
        }
    },[turn]);

    function MarubatsuTurn(){
        return(
            <div>
                現在のターン{(turn===0)?'○のターン':'×のターン'}
            </div>
        )
    }

    //コマのクリック時の処理
    function tdClick(e){
        let ckArCell=true

        //列方向が0
        if(e.x===0){
            if(e.y===0){//行列ともに0の位置
                if(inline[e.x+1][e.y+1]===0){ckArCell=false}
            }else if(e.y===4){//列が0で行が4の位置
                if(inline[e.x+1][e.y-1]===0){ckArCell=false}
            }else{//列が0で行が任意の位置
                if(inline[e.x+1][e.y]===0 &&
                    inline[e.x+1][e.y+1]===0 &&
                    inline[e.x+1][e.y-1]===0){ckArCell=false}
            }
        }else if(e.x===4){//列が4の位置
            if(e.y===0){//行列ともに4の位置
                if(inline[e.x-1][e.y+1]===0){ckArCell=false}
            }else if(e.y===4){//列が４で行が４の位置
                if(inline[e.x-1][e.y-1]===0){ckArCell=false}
            }else{//列が0で行が任意の位置
                if(inline[e.x][e.y]===0 &&
                    inline[e.x-1][e.y+1]===0 &&
                    inline[e.x-1][e.y-1]===0){ckArCell=false}
            }
        }else{
            ckArCell=true
        }

        //行方向が0
        if(e.y===0){
            if(e.x!==0 && e.x!==4){//列方向が端でない位置
                if(inline[e.x][e.y+1]===0 &&
                    inline[e.x+1][e.y+1]===0 &&
                    inline[e.x-1][e.y+1]===0){ckArCell=false}
            }
        }else if(e.y===4){
            if(e.x!==0 && e.x!==4){//列方向が端でない位置
                if(inline[e.x][e.y-1]===0 &&
                    inline[e.x+1][e.y-1]===0 &&
                    inline[e.x-1][e.y-1]===0){ckArCell=false}
            }
        }else{
            ckArCell=true
        }

        //console.log(ckArCell)

        //端っこは打てない
        if(ckArCell){
            //空白のますの判定
            if(inline[e.x][e.y]==0){

                if(turn==0){//先攻：○の打コン
                    inlineArray[e.x][e.y]=1;
                    setInline(inlineArray);
                    setTurn(1);
                    judge()
                }else{//後攻：×の打コン
                    inlineArray[e.x][e.y]=-1;
                    setInline(inlineArray);
                    setTurn(0);
                    judge()
                }  
            }
        }
    }

    //判定
    function judge(){
        //console.log('x:'+x+'y:'+y+s)
        
        //縦方向の判定
        for(let col=0;col<5;col++){
            for(let row=0;row<3;row++){
                //console.log(inline[row][col])
                if(inline[col][row] !==0 &&
                    inline[col][row]===inline[col][row+1] &&
                    inline[col][row]===inline[col][row+2]){
                        setJudgeResult(true)
                        //console.log('縦方向'+judgeResult)
                    }
            }
        }

        //横方向の判定
        for(let row=0;row<5;row++){
            for(let col=0;col<3;col++){
                if(inline[col][row] !==0 &&
                    inline[col][row]===inline[col+1][row] &&
                    inline[col][row]===inline[col+2][row]){
                        setJudgeResult(true)
                        //console.log('横方向'+judgeResult)
                    }
            }
        }

        for(let row=0;row<3;row++){
            for(let col=0;col<3;col++){
                if(inline[col][row] !==0 &&
                    inline[col][row]===inline[col+1][row+1] &&
                    inline[col][row]===inline[col+2][row+2]){
                        setJudgeResult(true)
                        //console.log('右肩下がり'+judgeResult)
                    }
            }
        }

        for(let row=4;3<row;row--){
            for(let col=4;3<col;col--){
                if(inline[col][row] !==0 &&
                    inline[col][row]===inline[col-1][row-1] &&
                    inline[col][row]===inline[col-2][row-2]){
                        setJudgeResult(true)
                        //console.log('左肩上がり'+judgeResult)
                    }
            }
        }

        
        for(let row=0;row<3;row++){
            for(let col=4;3<col;col--){
                if(inline[col][row] !==0 &&
                    inline[col][row]===inline[col-1][row+1] &&
                    inline[col][row]===inline[col-2][row+2]){
                        setJudgeResult(true)
                        //console.log('左肩さがり'+judgeResult)
                    }
            }
        }
        
        
        for(let row=4;3<row;row--){
            for(let col=0;col<3;col++){
                if(inline[col][row] !==0 &&
                    inline[col][row]===inline[col+1][row-1] &&
                    inline[col][row]===inline[col+2][row-2]){
                        setJudgeResult(true)
                        //console.log('右肩上がり'+judgeResult)
                    }
            }
        }

        //console.log(judgeResult)
        
        
    }

    //周辺マスを透明にする。
    function tdCssJudg(e){

        let ckArCell=false
        
        if(inline[e.x][e.y]===0){
            return 'td-non'
        }else{
            return ''
        }
        
    }

    //描画
    return(
        <div>
            <MarubatsuTurn/>
            <table width="400" height="400">
                <tbody>
                    
                    <tr>
                        <td className={tdCssJudg({x:0,y:0})} onClick={()=>tdClick({x:0,y:0})}>{(inline[0][0]==0)?'':(inline[0][0]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:1,y:0})} onClick={()=>tdClick({x:1,y:0})}>{(inline[1][0]==0)?'':(inline[1][0]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:2,y:0})} onClick={()=>tdClick({x:2,y:0})}>{(inline[2][0]==0)?'':(inline[2][0]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:3,y:0})} onClick={()=>tdClick({x:3,y:0})}>{(inline[3][0]==0)?'':(inline[3][0]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:4,y:0})} onClick={()=>tdClick({x:4,y:0})}>{(inline[4][0]==0)?'':(inline[4][0]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td className={tdCssJudg({x:0,y:1})} onClick={()=>tdClick({x:0,y:1})}>{(inline[0][1]==0)?'':(inline[0][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:1})}>{(inline[1][1]==0)?'':(inline[1][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:1})}>{(inline[2][1]==0)?'':(inline[2][1]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:1})}>{(inline[3][1]==0)?'':(inline[3][1]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:4,y:1})} onClick={()=>tdClick({x:4,y:1})}>{(inline[4][1]==0)?'':(inline[4][1]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td className={tdCssJudg({x:0,y:2})} onClick={()=>tdClick({x:0,y:2})}>{(inline[0][2]==0)?'':(inline[0][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:2})}>{(inline[1][2]==0)?'':(inline[1][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:2})}>{(inline[2][2]==0)?'':(inline[2][2]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:2})}>{(inline[3][2]==0)?'':(inline[3][2]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:4,y:2})} onClick={()=>tdClick({x:4,y:2})}>{(inline[4][2]==0)?'':(inline[4][2]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td className={tdCssJudg({x:0,y:3})} onClick={()=>tdClick({x:0,y:3})}>{(inline[0][3]==0)?'':(inline[0][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:1,y:3})}>{(inline[1][3]==0)?'':(inline[1][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:2,y:3})}>{(inline[2][3]==0)?'':(inline[2][3]==1)?'○':'×'}</td>
                        <td onClick={()=>tdClick({x:3,y:3})}>{(inline[3][3]==0)?'':(inline[3][3]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:4,y:3})} onClick={()=>tdClick({x:4,y:3})}>{(inline[4][3]==0)?'':(inline[4][3]==1)?'○':'×'}</td>
                    </tr>
                    <tr>
                        <td className={tdCssJudg({x:1,y:4})} onClick={()=>tdClick({x:0,y:4})}>{(inline[0][4]==0)?'':(inline[0][4]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:1,y:4})} onClick={()=>tdClick({x:1,y:4})}>{(inline[1][4]==0)?'':(inline[1][4]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:2,y:4})} onClick={()=>tdClick({x:2,y:4})}>{(inline[2][4]==0)?'':(inline[2][4]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:3,y:4})} onClick={()=>tdClick({x:3,y:4})}>{(inline[3][4]==0)?'':(inline[3][4]==1)?'○':'×'}</td>
                        <td className={tdCssJudg({x:4,y:4})} onClick={()=>tdClick({x:4,y:4})}>{(inline[4][4]==0)?'':(inline[4][4]==1)?'○':'×'}</td>
                    </tr>
                        
                    
                </tbody>
            </table>
                
        </div>
    )
}

export default Marubatsu;