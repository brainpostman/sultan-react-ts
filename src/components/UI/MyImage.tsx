import { useState } from 'react';

interface IMyImageProps {
    src: string;
    containerClass?: string;
    errorClass?: string;
}

const MyImage = ({ src, containerClass, errorClass }: IMyImageProps) => {
    const [imgIsLoaded, setImgIsLoaded] = useState(true);
    return (
        <div className={containerClass}>
            {imgIsLoaded ? (
                <img
                    src={src}
                    onLoad={() => {
                        setImgIsLoaded(true);
                    }}
                    onError={() => {
                        setImgIsLoaded(false);
                    }}
                />
            ) : (
                <div className={errorClass}>
                    Изображение
                    <br />
                    недоступно
                </div>
            )}
        </div>
    );
};

export default MyImage;
