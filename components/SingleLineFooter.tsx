import React from 'react'

const SingleLineFooter = () => {
    return (
        <div style={{
            fontFamily: "Noto Sans, sans-serif",
            fontWeight: 400,
            fontSize: 'calc(var(--variable) * 1.6)',
            lineHeight: 'calc(var(--variable) * 1.9)',
            textAlign: 'center',
            color: '#615959',
            margin: '10rem 0 0 0',
        }}>
            {`©2024, Hritik All rights Reserved`}
        </div>
    )
}

export default SingleLineFooter