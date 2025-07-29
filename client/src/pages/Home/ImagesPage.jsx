import React from "react";
import Box from "@mui/material/Box";

import {ModalPage} from "@components";
import {styled} from "@mui/material/styles";
import {width} from "@mui/system";

const ImagesPage = () => {

  return <BoxWrapper>
    Images Page
  </BoxWrapper>
}

const BoxWrapper = styled(Box)(({theme}) => ({

}))

// eslint-disable-next-line react/display-name
export default () => <ModalPage styles={{'& .ModalWrapper': {width: '100%', height: '100%', backgroundColor: 'black',}}}
                                element={<ImagesPage/>}/>;