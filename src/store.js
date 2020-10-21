import {action, createStore} from "easy-peasy";
import { v4 as uuidv4 } from 'uuid';

Array.prototype.move = function (old_index, new_index){
    if (new_index >= this.length) {
        let k = new_index - this.length + 1;
        while (k--) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this;
}

export default createStore({
    components:{
        data:{
            "1":{
                compName:"1",
                content:"Component 1",
            },
            "2":{
                compName:"2",
                content:"Component 2",
            },
            "3":{
                compName:"3",
                content:"Component 3",
            },
            "4":{
                compName:"4",
                content:"Component 4",
            },
            "layout":{
                type:"layout",
                compName:"4",
            },
        },
        list:["1", "2", "3", "4"],
        layouts:["layout"],
    },
    layout:{
        data:{
            "component_1":{
                type:"component",
                props:{},
            },
            "layout_1":{
                type:"layout",
                columns:["column1", "column2"],
            },
            "column1":{
                type:"column",
                children:["child1", "child2"]
            },
            "column2":{
                type:"column",
                children:["child3", "child4"]
            },
            "child1":{
                type:"primary",
                props:{}
            },
            "child2":{
                type:"primary",
                props:{}
            },
            "child3":{
                type:"primary",
                props:{}
            },
            "child4":{
                type:"primary",
                props:{}
            }
        },
        list:["component_1", "layout_1"],
        moveElement:action((state, payload) => {
            const {oldIndex, newIndex} = payload;
            return {
                ...state,
                list:state.list.move(oldIndex, newIndex)
            }
        }),
        addElement:action((state, payload)=>{
            const {componentId} = payload;
            const elementId = uuidv4();
            return {
                ...state,
                data:{
                    ...state.data,
                    [elementId]:{
                        componentId,
                        id:elementId
                    }
                },
                list:[...state.list, elementId]
            }
        })
    }
}, {
    disableImmer:true
});
