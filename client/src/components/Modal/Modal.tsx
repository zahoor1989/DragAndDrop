import React, { ReactChild, ReactChildren, useEffect } from 'react';
import ReactDOM from 'react-dom';

const backdropPosition = {
    position: 'fixed',
 } as React.CSSProperties;


// gray background
const backdropStyle = {
    ...backdropPosition,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 50
}

const modalPostion = {
    position: "relative",
 } as React.CSSProperties;

const modalStyle = {
    backgroundColor: '#fff',
    borderRadius: 5,
    maxWidth: 500,
    minHeight: 300,
    margin: '0 auto',
    padding: 30,
    ...modalPostion,
};

const footerPostion = {
    position: "absolute",
 } as React.CSSProperties;

const footerStyle = {
    ...footerPostion,
    bottom: 20
};

const modalRoot = document.getElementById("modal-root");

interface ModalTypes {
    onClose: Function;
    show: boolean;
    children: ReactChild | ReactChildren;
      
}

const Modal: React.FC<ModalTypes> = ({ onClose, show , children}) =>  {
    const modalElement = document.createElement("div");
    
    const onClosing = (e:any) => {
        console.log("BUTTON CLICKED");
        e.stopPropagation ();
        onClose && onClose(e);
    }

    const onKeyUp = (e:any) => {
        // Lookout for ESC key (27)
        if (e.which === 27 && show) {
            onClosing(e);
        }
    }

    useEffect(() => {
        document.addEventListener("keyup", onKeyUp);
        if(modalRoot){
            modalRoot.appendChild(modalElement);
        }
    },[])

  
    useEffect(() => {
        document.addEventListener("keyup", onKeyUp);
        if(modalRoot){
            modalRoot.appendChild(modalElement);
        }
    },[show]);

        const modalUI = (
            <div style={backdropStyle}>
                <div style={modalStyle}>
                    {children}
                    <div style={footerStyle}>
                        <button onClick={(e) => { onClosing(e)}}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );

           
        if (!show) {
            return null;
        }
        return ReactDOM.createPortal (
            modalUI,
            modalElement,
        );
    
}

export default Modal;