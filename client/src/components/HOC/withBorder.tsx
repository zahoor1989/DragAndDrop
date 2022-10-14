import React from 'react';

const style = {
    border: "2px dashed red"
}

const withBorder = (WrappedComponent:any) => {
    class _WithBorder extends React.Component {
        static displayName: string;
        render() {
            return (
                <div style={style}>
                    <WrappedComponent {...this.props}  />      
                </div>  
            )
        }
    }

    _WithBorder.displayName = "WithBorder";
    return _WithBorder;
}

export default withBorder;