
export type ButtonType = {
    title: string
    onClick?: () => void
    classname?: string
}



const Button = ({title, onClick, classname}: ButtonType) => {

    return (
        <button className={classname} onClick={onClick}>{title}</button>
    );
};

export default Button;