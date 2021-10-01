
import styled from 'styled-components';

function Backgound({size,children}) {
  let col=[];
  //console.log("size-back",size)
  for (let i=0; i<=size-1;i++){
    let row=[];
    for (let r=0; r<=size-1;r++){
        row.push(<Unit id={`${i}${r}`} key={`${i}${r}`}
        ></Unit>)}  
    col.push(<Row key={i} id={`r${i}`}>{row}</Row>)
  }
  return (<Wrapper > <Container style={{width: `${32*size}px`}} >{children}{col}</Container>
  </Wrapper>
      
  );
}

export default Backgound;
const Wrapper=styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  `;
const Container=styled.div`
    position: relative;
    
`;
const Unit=styled.div`
  width:28px;
  height:28px;
  border:1px solid darkgray ;
  display:flex;
  justify-content: center;
  align-items: center;
  `;
  const Row=styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  `;