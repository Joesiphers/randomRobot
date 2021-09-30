
import styled from 'styled-components';

function Backgound({children}) {
  let col=[];
  for (let i=1; i<=5;i++){
    let row=[];
    for (let r=1; r<=5;r++){
        row.push(<Unit id={`${i}${r}`} key={`${i}${r}`}
        ></Unit>)}  
    col.push(<Row key={i} id={`r${i}`}>{row}</Row>)
  }
  return (<Wrapper > <Container>{children}{col}</Container>
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
    width: 160px;
`;
const Unit=styled.div`
  width:28px;
  height:28px;
  border:1px solid lightgray ;
  display:flex;
  justify-content: center;
  align-items: center;
  `;
  const Row=styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  `;