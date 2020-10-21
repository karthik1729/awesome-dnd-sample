import React from "react";
import {DragDropContext,Draggable,  Droppable} from "react-beautiful-dnd";
import {makeStyles} from "@material-ui/core/styles";
import {StoreProvider, useStoreActions, useStoreState} from "easy-peasy";
import store from "./store";
import Comp from "./component";
import Layout from "./layouts";


const useStyles = makeStyles(()=>{
   return {
       container:{
       },
       componentLib:{
           width:300
       },
       layout:{
           flex:1
       }
   }
});

const Column = ({columnId})=>{

}

const Layout = ({instanceId})=>{
    const instancesData = useStoreState((state)=>{
        return state.layout.data;
    });
    const instance = instancesData[instanceId];
    return <>
        {instance.columns.map((column)=>{
            return (<Droppable
                key={column}
                type={"COLUMNS"}
            >
                {
                    (provided)=>{
                        return <div
                            ref={provided.innerRef}
                            style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                            {...provided.droppableProps}
                        >
                            {
                                instancesData[column].children.map((child)=>{

                                })
                            }
                        </div>
                    }
                }
            </Droppable>)
        })}

    </>

}

const App = ()=>{
    const classes = useStyles();

    const [components, layouts, componentData] = useStoreState((state)=>{
        return [state.components.list, state.components.layouts, state.components.data]
    });

    const [instances, instancesData] = useStoreState((state)=>{
        return [state.layout.list, state.layout.data]
    });
    const {addElement, moveElement} = useStoreActions((actions)=>{
        return actions.layout;
    })
    return (<DragDropContext
        onDragEnd={(event)=>{
            if (event.source.droppableId !=="LAYOUT"){
                const {draggableId, destination:{index}} = event;
                addElement({componentId:draggableId})
            } else {
                moveElement(
                    {
                        oldIndex:event.source.index, newIndex:event.destination.index
                    }
                );
            }
        }}
    >
        <div className={classes.container}>
            {
                components.map((compId)=>{
                    return <Comp componentId={compId} key={compId}></Comp>
                })
            }

            <Layout colCount={4} id={"layout"}/>

            <Droppable
                droppableId={"LAYOUT"}
                type={"COMPONENT"}
            >
                {(provided, snapshot) => (
                    <div
                        className={classes.layout}
                        ref={provided.innerRef}
                        style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
                        {...provided.droppableProps}
                    >
                        {
                            instances.map((instanceId, index)=>{
                                const instance = instancesData[instanceId];
                                return (<Draggable
                                    draggableId={instanceId}
                                    index={index}
                                    key={instanceId}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {
                                                componentData[instance.componentId].type === "layout" &&
                                                <div>
                                                    {
                                                        JSON.stringify(instance)
                                                    }
                                                </div>
                                            }
                                            {
                                                componentData[instance.componentId].type !== "layout" &&
                                                JSON.stringify(instance)
                                            }

                                        </div>
                                    )}
                                </Draggable>);
                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    </DragDropContext>);
}

export default <StoreProvider store={store}><App /></StoreProvider>
