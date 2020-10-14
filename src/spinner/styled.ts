import styled from 'styled-components'
import { ImgSpinnerProps } from '../types'

export const Wrapper = styled.div`
    position:fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    min-height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    display:flex;
    justify-content:center;
    align-items: center;
`;

export const Img = styled.img<ImgSpinnerProps>`
width: ${props => props.width || "16px"};
height: ${props => props.height || "16px"};
`