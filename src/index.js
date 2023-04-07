import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
import { ProSidebarProvider,Sidebar ,  Menu ,  MenuItem ,useProSidebar} from  'react-pro-sidebar' ;
import './style.css';

import Marubatsu from './marubatsu.js';
import HOME from './home.js';

function App(){

    return(
        <div>
            <ProSidebarProvider>
                <RouteRend/>
            </ProSidebarProvider>
            
        </div>
    )
}

function RouteRend(){

    const {collapseSidebar}=useProSidebar();
    const {collapsed} = useProSidebar();
    const [flg,setFlg]=useState(false);

    let adress=location.href;

    useEffect(()=>{
        console.log(adress)
    })

    function clickBut(){
        
        if(flg){
            setFlg(false)
        }else{
            setFlg(true)
        }
    }

    return(
        <div　className='direction-main'>
            
            <BrowserRouter>

                <Sidebar>
                    <Menu>

                        <MenuItem component={<Link to='https://daiki1995.github.io/One-site/public/'/>}>
                            ホーム
                        </MenuItem>  

                        <MenuItem component={<Link to='https://daiki1995.github.io/One-site/public/marubatsu'/>}>
                            まるばつ
                        </MenuItem>   
                    
                    </Menu>

                    <Menu>
                        <button onClick={()=>clickBut()}>閉じる</button>
                    </Menu>
                    
                </Sidebar>

                <Switch>
                    <Route path='/' exact>
                        <HOME collapsed={collapsed} flg={flg} setFlg={setFlg} collapseSidebar={collapseSidebar}/>
                    </Route>

                    <Route path='/home'>
                        <HOME collapsed={collapsed} flg={flg} setFlg={setFlg} collapseSidebar={collapseSidebar}/>
                    </Route>
    
                    <Route path='/marubatsu'>
                        <Marubatsu collapsed={collapsed} flg={flg} setFlg={setFlg} collapseSidebar={collapseSidebar}/>
                    </Route>         
                </Switch>
                
            </BrowserRouter>
            
        </div>
    )
}


window.onload=()=>ReactDOM.render(<App />,document.getElementById('index'));