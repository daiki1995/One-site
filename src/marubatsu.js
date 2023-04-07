import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

import './style.css';

Modal.setAppElement('#index')



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

    const [turn,setTurn]=useState(0);
    const [judgeResult,setJudgeResult]=useState(false);
    const [tC,setTC]=useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [comF,setComF]=useState(false);

    const [modalIn,setModalIn]=useState(0);
    
    const [resetF,setResetF]=useState(false);

    let inlineArray=inline;

    useEffect(()=>{
        setIsOpen(true);
    },[]);

    useEffect(()=>{
        //勝敗判定後に勝敗の結果を表示する
        if(judgeResult){
            console.log('勝ち負け')
            setModalIn(3);
            setIsOpen(true)
        }
    },[turn]);

    useEffect(()=>{
        //コンピューター
        if(comF){
            com()
            setTurn(1)
            setTC(tC+1)
            setComF(false)
            judge()
        }

        //リセット
        if(resetF){
           window.location='/'
            
        }
    })

    function MarubatsuTurn(){
        return(
            <div>
                現在のターン{(turn===0)?'○のターン':'×のターン'}
            </div>
        )
    }

    //コンピューター
    function com(){
        console.log(tC);
        let tTurnF=true;
        let fTurnF=true;

        //初手
        if(tC===1){
            inlineArray[2][2]=1;
            setInline(inlineArray);
        }
        //2手目
        else if(tC===3){
            for(let x=1;x<4;x++){
                for(let y=1;y<4;y++){
                    if(inline[x][y]===0 &&tTurnF){
                        inlineArray[x][y]=1;
                        setInline(inlineArray);
                        tTurnF=false;
                    }
                }
            }
        }
        
        //3手目以降
        else{
            for(let x=0;x<5;x++){
                console.log('テスト'+x)
                if(x===0){
                    //左端
                    if(inline[1][1]===1 &&fTurnF){
                        
                        inlineArray[0][0]=1;
                        setInline(inlineArray);
                        fTurnF=false;
                    }
                }else if(x===4){
                    //右上
                    if(inline[3][1]===1 &&fTurnF){
                        inlineArray[4][0]=1;
                        setInline(inlineArray);
                        fTurnF=false;
                    }
                }else{//それ以外
                    if(inline[x][1]===1 &&fTurnF){
                        inlineArray[x][0]=1;
                        setInline(inlineArray);
                        fTurnF=false;
                    }
                }
            }

            for(let y=0;y<5;y++){
                if(inline[1][y]===1 &&fTurnF){//左側
                    inlineArray[0][y]=1;
                    setInline(inlineArray);
                    fTurnF=false;
                }

                if(inline[3][y]===1 &&fTurnF){//右側
                    inlineArray[4][y]=1;
                    setInline(inlineArray);
                    fTurnF=false;
                }
            }
        }
        
    }

    //コマのクリック時の処理
    function tdClick(e){
        let ckArCell=true

        //最初の打コン時に隠れているセルをクリックできないようにする
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

                if(turn===1){//先攻：○の打コン
                    /*
                    inlineArray[e.x][e.y]=1;
                    setInline(inlineArray);
                    */
                    inlineArray[e.x][e.y]=-1;
                    setInline(inlineArray);
                    setTurn(0);
                    setTC(tC+1)
                    judge()
                    setComF(true)
                }else{//後攻：×の打コン
                    
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

    }

    //周辺マスを透明にする。
    function tdCssJudg(e){

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
            <ModalReturn 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalIn={modalIn}
                setModalIn={setModalIn}
                setComF={setComF}
                setResetF={setResetF}/>
            
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

function ModalReturn(props){

    function closeModal(e){
        props.setIsOpen(e);
    }

    function clickNextButton(){

        switch(props.modalIn){
            case 0:
                props.setModalIn(props.modalIn+1)
                break;
            
            case 1:
                setTimeout(function() {
                    console.log("時間経過1秒")
                    props.setModalIn(props.modalIn+1);
                }, 100);
                
                break;
            
            case 2:
                props.setIsOpen(false)
                props.setComF(true)
                break;
            
            case 3:
                props.setResetF(true)
                break;
            
            default:
                break;
        }
        
    }

    switch(props.modalIn){
        case 0:
            return(
                <div>
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={closeModal}
                        className="modal-style"
                        overlayClassName="overay-style"
                        contentLabel="Example Modal">
                        <div>○×ゲームです。縦、横、斜めに自分の記号（○か×）を三つ揃えたらあなたの勝ちです</div>
                        <div className="modal-button" onClick={()=>clickNextButton()}><button>次へ</button></div>
                        
                    </Modal>
                </div>
            )
            break;
        
        case 1:
            return(
                <div>
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={closeModal}
                        className="modal-style"
                        overlayClassName="overay-style"
                        contentLabel="Example Modal">
                        
                        <div>コンピューターと対戦になります。</div>
                        <div className="modal-button" onClick={()=>clickNextButton()}><button>次へ</button></div>
                    </Modal>
                </div>
            )
            break;
        
        case 2:
            return(
                <div>
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={closeModal}
                        className="modal-style"
                        overlayClassName="overay-style"
                        contentLabel="Example Modal">
                        
                        <div>あなたが後攻(×)です</div>
                        <div className="modal-button" onClick={()=>clickNextButton()}><button>START</button></div>
                    </Modal>
                </div>
            )
            break;
        
        case 3:
            return(
                <div>
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={closeModal}
                        className="modal-style-end"
                        overlayClassName="overay-style-end"
                        contentLabel="Example Modal">
                        
                        <div>あなたの負けです</div>
                        <div className="modal-button" onClick={()=>clickNextButton()}><button>次へ</button></div>
                    </Modal>
                </div>
            )
            break;

        default:
            return(
                <div>
                    <Modal
                        isOpen={props.isOpen}
                        onRequestClose={closeModal}
                        className="modal-style"
                        contentLabel="Example Modal">
                </Modal>
            </div>)
        
    }
    
}


export default Marubatsu;