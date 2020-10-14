import React from 'react'
import { Wrapper, Img } from './styled';
import spinner from './i/spinner.gif'

function Spinner() {
    return (
        <Wrapper>
            <Img src={spinner} alt="spinner" width='64px' height='64px' />
        </Wrapper>
    )
}

export default Spinner
