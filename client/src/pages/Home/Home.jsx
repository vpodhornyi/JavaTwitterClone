import React, {lazy, Suspense} from "react";

import {ColumnWrapper, ModalWindow, PrimaryColumn, PrimaryHeader, SitebarColumn, StickyHeader} from '../../components';
import Loading from "../../components/Loader/Loading";
import TwitForma from "./components/twitForm/TwitForma";
import HomeHeader from "./Header";
import {useModal} from "../../hooks/useModal";

const Tweets = lazy(() => import('./Tweets'));

const Home = () => {
  const {modal, toggleModal} = useModal();

  return (
    <ColumnWrapper>
      <PrimaryColumn>
        <PrimaryHeader pageElement={HomeHeader}/>
        <TwitForma/>
        <Suspense fallback={<Loading/>}>
          <Tweets toggleModal={toggleModal}/>
        </Suspense>
      </PrimaryColumn>
      <SitebarColumn>
        <StickyHeader>
          HEADER Home sitebar column
        </StickyHeader>
        BODY Home sitebar column
      </SitebarColumn>
      <ModalWindow
        isShowing={modal.isShowing}
        toggleModal={toggleModal}
        element={modal.element}/>
    </ColumnWrapper>
  );
};

export default Home;
