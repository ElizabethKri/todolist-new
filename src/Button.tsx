
export type ButtonType = {
    title: string
}

const Button = ({title}: ButtonType) => {
    return (
        <button>{title}</button>
    );
};

export default Button;