import React from "react";
import PropTypes from "prop-types";

const Index = ({page: Page}) => {
  return (
    <main>
      <p>Main</p>
      <Page/>
    </main>
  )
}
Index.propTypes = {
  page: PropTypes.object
}

export default Index;
