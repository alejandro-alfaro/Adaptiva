import React from 'react';

const image = (props) => {
    return (
        <li id={props.id} onClick={() => props.clicked(props.id)}>
            <img src={`https://picsum.photos/400/500?image=${props.src}`} alt={props.file}/>
        </li>
    );
};

export default image;