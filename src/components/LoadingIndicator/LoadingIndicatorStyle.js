import styled, { keyframes } from "styled-components"

const spinAnimation1 = keyframes`
    0% {
        transform: scale(0);
    }
    50%{
        transform: scale(1)
    }
    100% {
        transform: scale(0);
    }
`

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;


    div:nth-child(1) {
        left: 10%;
        animation: ${spinAnimation1} 3s linear infinite;
    }

    div:nth-child(2) {
        left: 10%;
        animation: ${spinAnimation1} 3s linear 0.10s infinite;
    }

    div:nth-child(3) {
        left: 40%;
        animation: ${spinAnimation1} 3s linear 0.20s infinite;
    }
`
export const Dot = styled.div`
    width: 17%;
    height: 17%;
    margin: 0 3%;
    border-radius: 50%;
    background: white;
`