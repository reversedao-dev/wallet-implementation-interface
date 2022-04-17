import React from 'react';

export const WalletButton = (props) => {
    const {type, className, onClick, text, disabled=false} = props

    switch(type){
        case "wallet":
            break;
        case "connection":
            break;
        default: 
    }

    return <div>
        <button 
        className={className}
        onClick={onClick}
        disabled={disabled}
        >
            <span>
                {text.toUpperCase()}
            </span>
         
            {type === "connection" && 
                <div>
                    <span className="networkButtonStatus">●</span>
                    <img 
                    className="metamaskIcon img-fluid"
                    src="data:image/png;base64,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"
                    alt="metamaskIcon"
                    width={35} height={35}
                    />
                </div>
            }
            
        </button>
    </div>
}
