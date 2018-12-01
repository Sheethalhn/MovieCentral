import React, { Component } from 'react';
import './paging.css'


class Paging extends Component {
    constructor(props){
        super(props);
    }

    pageItemOnClick = (e)=>{
        let pagenum = parseInt(e.target.innerHTML);
        this.props.onPageChange(pagenum)
    };

    render(){
        let page_item_css = "PagingLI_5";
        let page_item_light = "PagingA_10";
        let page_item_dark = "PagingA_8";
        let page_item_current = "PagingSPAN_6";
        
        let page_items = [];
        let flag = true;
        let css = page_item_dark;
        page_items.push(<li id={page_item_css} key={0}>
            <label id={css}>«</label>
        </li>);
        let i = 1;
        for(i; i<=this.props.size;i++){
            if(this.props.current === i){
                css = page_item_current;
            }else{
                if(flag){
                    flag = false;
                    css = page_item_light;
                }else{
                    flag = true;
                    css = page_item_dark;
                }
            }

            page_items.push(<li id={page_item_css} key = {i}>
                <label id={css} onClick={this.pageItemOnClick}>{i}</label>
            </li>)
        }

        if(flag){
            css = page_item_light;
        }else{
            css = page_item_dark;
        }

        page_items.push(<li id={page_item_css} key={i+1}>
            <label id={css}>»</label>
        </li>);

        return(
            <div id="PagingDIV_1">
                <ul id="PagingUL_2">
                    {page_items}
                </ul>
            </div>
        )
    }
}

export default Paging;