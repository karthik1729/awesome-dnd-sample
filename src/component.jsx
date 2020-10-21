import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {useStoreState} from "easy-peasy";


const getRenderItem = (component) => (provided) => {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            Item id: {component.content}
        </div>
    )
};


const Comp = ({componentId})=>{
    const component = useStoreState(state=> state.components.data[componentId])
    let renderItem = getRenderItem(component);
    return <>
        <Droppable
            type={"COMPONENT"}
            droppableId={`${componentId}`}
            isDropDisabled={true}
        >
            {
                (provided, snapShot)=>(
                    <>
                        {
                            snapShot.draggingFromThisWith === `${componentId}`
                            &&
                            <>Item id: {component.content}</>
                        }
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable draggableId={`${componentId}`} index={0}>
                                {renderItem}
                            </Draggable>
                        </div>
                    </>
                )
            }

        </Droppable>
    </>
}

export default Comp;
