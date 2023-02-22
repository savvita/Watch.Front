

const Error = ({ text, className }) => {
    return (
        <div className={ className ? `text-white ${className}` : "text-white" }><p>{ text }</p></div>
    );
}

export default Error;