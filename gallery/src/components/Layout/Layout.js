import React, {Component} from 'react';
import axios from 'axios';

import Image from '../Image/Image';
import Modal from '../UI/Modal/Modal';


class Layout extends Component{
    state ={
        images: [],
        viewing: false,
        currentImageIndex: 0
    };

    componentDidMount() {
        axios.get(`https://picsum.photos/list`)
          .then(res => {
            const images = res.data.filter(image => image.author === 'Alejandro Escamilla');
            this.setState({ images });
        });
    };

   viewImageHandler = (id) => {
        this.setState({
            viewing:true,
            currentImageIndex: id
        });
        let body = document.getElementsByTagName('BODY')[0];
        body.style.overflow = 'hidden';
    }

    viewImageCancelHandler = () => {
        this.setState({viewing:false});
        let body = document.getElementsByTagName('BODY')[0];
        body.style.overflow = 'initial';
        
    }

    goToNextSlide = () => {
        if(this.state.currentImageIndex < this.state.images.length-1){
            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex + 1
            }));
        }
        
    }

    goToPreviousSlide = () => {
        if(this.state.currentImageIndex > 0){
            this.setState(prevState => ({
                currentImageIndex: prevState.currentImageIndex - 1
            }));
        }
        
    }

    render(){

        let source = '';
        if(this.state.viewing){
            source = this.state.images[this.state.currentImageIndex];
        }

        return (
            <div className="Layout">
                <h1>Gallery</h1>
                <ul>
                    { this.state.images.map((image,index)=> 
                        <Image key={image.id} id={index} 
                            src={image.id} 
                            clicked={this.viewImageHandler} 
                            file={image.filename}
                            author={image.author}
                        />)}
                </ul>

                <Modal show={this.state.viewing} 
                    modalClosed={this.viewImageCancelHandler}    
                    >
                        <img src={`https://picsum.photos/400/500?image=${source.id}`}  alt={source.id}/>
                        <div className="infoAuthor">
                            <p>
                                {source.author}
                            </p>
                            <a href={source.author_url}>
                                Know this author
                            </a>
                        </div>
                       
                        <a className="arrows prev" onClick={this.goToPreviousSlide}>
                            <i className="material-icons">arrow_left</i>
                        </a>
                        <a className="arrows next" onClick={this.goToNextSlide}>
                            <i className="material-icons">arrow_right</i>
                        </a>
                </Modal>
            </div>
        );
    };
};

export default Layout;