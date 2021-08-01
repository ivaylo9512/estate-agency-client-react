import styled, { keyframes } from "styled-components"

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const spinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    width: 4%;
    padding-bottom: 4.5%;
    box-sizing: content-box;
    background: transparent;
    border: 4px solid #03A9F4;
    border-radius: 50%;
    -webkit-animation: 1s spin linear infinite;
    animation: 1s ${spinAnimation} linear infinite;
`
    

const LoadingIndicator = () => {

    return(     
        <Container>
            <Spinner />
        </Container>
    )
}
export default LoadingIndicator