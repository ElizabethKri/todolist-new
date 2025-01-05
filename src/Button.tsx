
export type ButtonType = {
    title: string
    onClick?: () => void
}



const Button = ({title, onClick}: ButtonType) => {

    return (
        <button onClick={onClick}>{title}</button>
    );
};

export default Button;