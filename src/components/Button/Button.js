import './Button.css';
import { Button as BButton } from 'reactstrap';

const Button = ({ sm, md, lg, onClick, value, className, disabled }) => {
    return (
        <BButton sm={ sm } md={ md } lg={ lg } outline color="light" className={ className ? `m-3 mb-0 btn-default ${ className }` : `m-3 mb-0 btn-default` } disabled={ disabled } onClick={ onClick }>{ value }</BButton>
    );
}

export default Button;