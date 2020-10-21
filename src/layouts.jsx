import React from "react";
import {Draggable, Droppable} from "react-beautiful-dnd";


const getRenderItem = (colCount) => (provided) => {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            Layout colCount: {colCount}
        </div>
    )
};


const Layout = ({colCount, id})=>{
    let renderItem = getRenderItem(colCount);
    return <>
        <Droppable
            type={"COMPONENT"}
            droppableId={id}
            isDropDisabled={true}
        >
            {
                (provided, snapShot)=>(
                    <>
                        {
                            snapShot.draggingFromThisWith === id
                            &&
                            <>Layout colCount: {colCount}</>
                        }
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable draggableId={id} index={0}>
                                {renderItem}
                            </Draggable>
                        </div>
                    </>
                )
            }

        </Droppable>
    </>
}

export default Layout;
