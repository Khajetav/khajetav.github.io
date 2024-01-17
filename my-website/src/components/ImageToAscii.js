import React, { useEffect, useRef, useState } from 'react';

// parts of code were taken and improved upon:
// https://github.com/S4NCHOPANZ4/ASCII-converter/blob/main/src/components/ImageToAcsii.jsx
const ImageToAscii = ({ imageUrl, fontSize, resolutionFactor }) => {
    const canvasRef = useRef(null);
    const artRef = useRef(null);
    const [imgStr, setImgStr] = useState('');

    const getAsciiCharacter = (brightness) => {
        // these chars will be used to draw the ascii image
        const asciiChars = ' $#wa*i=;,.';
        // scales the brightness of the image to corresponding ascii chars
        const scaledBrightness = Math.floor((brightness / 255) * (asciiChars.length - 1));
        const asciiChar = asciiChars.charAt(scaledBrightness);
        return asciiChar;
    };

    const createRows = (arr, length) => {
        const row = [];
        for (let i = 0; i < arr.length; i += length) {
            const chunk = arr.slice(i, i + length);
            row.push(chunk);
        }
        const imgStr = createRowsStr(row, 1)

        return imgStr;
    }

    const createRowsStr = (arr, spacing) => {
        const rowsWithSpacing = arr.map(row => row.join(" ".repeat(spacing)));
        const asciiArt = rowsWithSpacing.join("\n");
        return asciiArt;
    }

    // the way this works is that it renders an image onto a canvas
    // checks the pixels on the canvas
    // and then turns them into ascii symbols
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = imageUrl;

        img.onload = () => {
            // size of container element
            const asciiWidth = canvas.parentElement.offsetWidth; 
            const asciiHeight = canvas.parentElement.offsetHeight;

            // scale
            const scale = Math.min(asciiWidth / img.width, asciiHeight / img.height);

            // resolution factor that's passed to the image
            const appliedScale = scale * resolutionFactor;
            canvas.width = img.width * appliedScale;
            canvas.height = img.height * appliedScale;

            // draw img onto canvas and get its info
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            const asciiArray = [];
            for (let i = 0; i < data.length; i += 4) {
                const red = data[i];
                const green = data[i + 1];
                const blue = data[i + 2];
                const brightness = (red + green + blue) / 3;
                const asciiChar = getAsciiCharacter(brightness);
                asciiArray.push(asciiChar);
            }
            setImgStr(createRows(asciiArray, imageData.width))
        };
    }, [imageUrl]);

    return (
        <>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <pre className='ASCII_IMG' ref={artRef} style={{ fontSize: `${fontSize}rem` }}>
                {imgStr}
            </pre>
        </>
    )
}

export default ImageToAscii